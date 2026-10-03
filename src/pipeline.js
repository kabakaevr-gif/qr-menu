const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const ffmpeg = require('ffmpeg-static');
const ffprobe = require('ffprobe-static').path;
const Ajv = require('ajv');
const { spawn } = require('node:child_process');
const { run } = require('./process');
const { OpenAIDirectorProvider } = require('./ai/openai-provider');
const { DotaContextProvider } = require('./dota-context');
const schema = require('./edit-plan.schema.json');

async function capture(binary, args) {
  return new Promise((resolve, reject) => { const child = spawn(binary, args, { windowsHide: true }); const chunks=[]; let err=''; child.stdout.on('data', c=>chunks.push(c)); child.stderr.on('data',c=>err+=c); child.on('error',reject); child.on('close',code=>code===0?resolve(Buffer.concat(chunks)):reject(new Error(err))); });
}
async function metadata(file) { return JSON.parse((await capture(ffprobe, ['-v','quiet','-print_format','json','-show_format','-show_streams',file])).toString()); }
function analyzePcm(buffer, sampleRate=16000) {
  const values = new Int16Array(buffer.buffer, buffer.byteOffset, Math.floor(buffer.length/2)); const result=[];
  for(let start=0; start<values.length; start+=sampleRate){ let sum=0, peak=0; const end=Math.min(start+sampleRate,values.length); for(let i=start;i<end;i++){ const v=values[i]/32768; sum+=v*v; peak=Math.max(peak,Math.abs(v)); } result.push({ time:start/sampleRate, rms:Math.sqrt(sum/(end-start)), peak }); }
  return result;
}
function chooseFrames(all, activity, max=36) {
  if(all.length<=max) return all; const regular=all.filter((_,i)=>i%Math.ceil(all.length/(max/2))===0); const hot=[...activity].sort((a,b)=>b.score-a.score).slice(0,max-regular.length);
  const times=new Set([...regular.map(x=>Math.round(x.time)),...hot.map(x=>Math.round(x.time))]); return all.filter(x=>times.has(Math.round(x.time))).slice(0,max);
}
function fallbackPlan(duration, audio) {
  const loud=[...audio].sort((a,b)=>b.rms-a.rms)[0]||{time:duration/2}; const climax=Math.max(4,Math.min(duration-4,loud.time)); const start=Math.max(0,climax-18), end=Math.min(duration,climax+12);
  return { summary:'Locally selected around the strongest sustained audio reaction (AI Director disabled).', highlight_type:'other', confidence:.35, source_start:start, source_end:end, climax_start:climax-2, climax_end:climax+2, segments:[{start,end,role:'climax',action:'keep',speed:1,reason:'Continuous context around local audio peak'}], effects:[], subtitle_emphasis:[], ending_reason:'Retains reaction tail', director_explanation:'Offline fallback uses audio intensity only; enable AI Director for multimodal understanding.' };
}
function validatePlan(plan, duration) {
  const validate=new Ajv().compile(schema); if(!validate(plan)) throw new Error(`AI plan schema invalid: ${JSON.stringify(validate.errors)}`);
  if(plan.source_end>duration+.1 || plan.source_start>=plan.source_end) throw new Error('AI plan range is outside source');
  let last=plan.source_start; for(const s of plan.segments){ if(s.start<last-.01 || s.end<=s.start || s.end>plan.source_end+.01) throw new Error('AI segment chronology is invalid'); last=s.end; }
}
async function transcribe(audioPath) {
  if(!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not set. Set it before launching the app.');
  const OpenAI=require('openai'); const client=new OpenAI(); const result=await client.audio.transcriptions.create({ file:fs.createReadStream(audioPath), model:'whisper-1', response_format:'verbose_json', timestamp_granularities:['segment'] });
  return { text:result.text, segments:(result.segments||[]).map(s=>({start:s.start,end:s.end,text:s.text.trim()})) };
}
async function analyzeClip(file, options={}, progress=()=>{}) {
  if(path.extname(file).toLowerCase()!=='.mp4') throw new Error('V1 accepts MP4 files only.');
  const work=fs.mkdtempSync(path.join(os.tmpdir(),'dota-short-')); progress({percent:4,message:'Reading video metadata'}); const meta=await metadata(file); const duration=Number(meta.format.duration);
  if(!duration) throw new Error('Could not determine clip duration.');
  const audioPath=path.join(work,'audio.mp3'); progress({percent:10,message:'Extracting compact audio'}); await run(ffmpeg,['-y','-i',file,'-vn','-ac', '1','-ar','16000','-b:a','48k',audioPath]);
  progress({percent:20,message:'Analyzing local loudness'}); const pcm=await capture(ffmpeg,['-v','error','-i',file,'-vn','-ac','1','-ar','16000','-f','s16le','pipe:1']); const audio=analyzePcm(pcm);
  progress({percent:30,message:'Transcribing speech with timestamps'});
  const transcript = process.env.OPENAI_API_KEY
    ? await transcribe(audioPath)
    : options.director === false
      ? { text: '', segments: [], warning: 'Transcription skipped because OPENAI_API_KEY is not set.' }
      : await transcribe(audioPath);
  const interval=Math.max(.5,Number(options.frameInterval)||1), pattern=path.join(work,'frame-%05d.jpg'); progress({percent:45,message:'Sampling representative frames'});
  await run(ffmpeg,['-y','-i',file,'-vf',`fps=1/${interval},scale=640:-2`,'-q:v','5',pattern]);
  const files=fs.readdirSync(work).filter(x=>x.startsWith('frame-')).sort(); const all=files.map((name,i)=>({time:i*interval,path:path.join(work,name)}));
  progress({percent:55,message:'Measuring gameplay motion'}); let activityLog=''; await run(ffmpeg,['-v','info','-i',file,'-vf','fps=2,signalstats,metadata=print:key=lavfi.signalstats.YDIF','-an','-f','null','-'],x=>activityLog+=x);
  const nums=[...activityLog.matchAll(/YDIF=([\d.]+)/g)].map((m,i)=>({time:i/2,score:Number(m[1])})); const frames=chooseFrames(all,nums);
  const signals={ duration, metadata:meta, facecam_rectangle:options.facecam||null, transcript, audio_timeline:audio.map(x=>({...x,rms:Number(x.rms.toFixed(4)),peak:Number(x.peak.toFixed(4))})), video_activity:nums.filter((_,i)=>i%2===0).map(x=>({...x,score:Number(x.score.toFixed(2))})), sampled_frame_count:frames.length };
  progress({percent:68,message: options.director===false?'Creating local edit plan':'AI Director is reasoning about the story'});
  let plan,debug={provider:'local',model:'none',duration_ms:0,estimated_cost_usd:0};
  if(options.director===false) plan=fallbackPlan(duration,audio); else {
    const provider=new OpenAIDirectorProvider({model:options.model});
    const directorInput={frames,signals,dotaContext:new DotaContextProvider().getContext()};
    let result=await provider.direct(directorInput); plan=result.plan; debug=result.debug;
    try { validatePlan(plan,duration); } catch(firstError) {
      progress({percent:82,message:'AI Director is repairing its edit plan'});
      try { result=await provider.direct(directorInput,{plan,error:firstError.message}); plan=result.plan; validatePlan(plan,duration); debug={...result.debug,repaired:true}; }
      catch(secondError) { plan=fallbackPlan(duration,audio); debug={...debug,validation_warning:secondError.message,fallback:true}; }
    }
  }
  validatePlan(plan,duration);
  const analysis={source:file,workDir:work,metadata:meta,duration,transcript,audioTimeline:audio,videoActivity:nums,plan,debug}; fs.writeFileSync(path.join(work,'analysis.json'),JSON.stringify(analysis,null,2)); progress({percent:100,message:'Analysis complete'}); return analysis;
}
module.exports={analyzeClip,analyzePcm,validatePlan,chooseFrames};
