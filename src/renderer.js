const fs=require('node:fs'); const path=require('node:path'); const ffmpeg=require('ffmpeg-static'); const {run}=require('./process');
function assTime(sec){ const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=(sec%60).toFixed(2).padStart(5,'0'); return `${h}:${String(m).padStart(2,'0')}:${s}`; }
function assEscape(text){ return text.replace(/[{}]/g,'').replace(/\n/g,' ').replace(/\\/g,'\\\\'); }
function emphasize(text, words) {
  let escaped = assEscape(text);
  for (const item of words || []) {
    const literal = item.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    escaped = escaped.replace(new RegExp(`\\b(${literal})\\b`, 'gi'), '{\\c&H00D8FF&\\b1}$1{\\r}');
  }
  return escaped;
}
function createAss(analysis,file){
  const segs=analysis.plan.segments; const map=t=>{let out=0; for(const s of segs){if(t>s.end)out+=(s.end-s.start)/s.speed;else if(t>=s.start&&t<=s.end)return out+(t-s.start)/s.speed;else if(t<s.start)return null;} return null;};
  const lines=(analysis.transcript.segments||[]).filter(x=>x.end>=analysis.plan.source_start&&x.start<=analysis.plan.source_end).map(x=>{const a=map(Math.max(x.start,analysis.plan.source_start)),b=map(Math.min(x.end,analysis.plan.source_end)); if(a===null||b===null)return ''; return `Dialogue: 0,${assTime(a)},${assTime(Math.max(a+.2,b))},Default,,0,0,0,,${emphasize(x.text,analysis.plan.subtitle_emphasis)}`;}).filter(Boolean);
  const header=`[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,52,&H00FFFFFF,&H0000D8FF,&H00101010,&H90000000,-1,0,0,0,100,100,0,0,1,4,1,2,70,70,240,1\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`; fs.writeFileSync(file,header+lines.join('\n'),'utf8');
}
async function renderShort(analysis,progress=()=>{}){
  const outDir=path.join(path.dirname(analysis.source),'Dota AI Shorts'); fs.mkdirSync(outDir,{recursive:true}); const base=path.basename(analysis.source,path.extname(analysis.source)); const output=path.join(outDir,`${base}-short.mp4`),ass=path.join(analysis.workDir,'captions.ass'); createAss(analysis,ass); progress({percent:10,message:'Building edit timeline'});
  const parts=[],inputs=[]; analysis.plan.segments.forEach((s,i)=>{parts.push(`[0:v]trim=start=${s.start}:end=${s.end},setpts=(PTS-STARTPTS)/${s.speed}[v${i}]`);parts.push(`[0:a]atrim=start=${s.start}:end=${s.end},asetpts=PTS-STARTPTS,atempo=${s.speed}[a${i}]`);inputs.push(`[v${i}][a${i}]`);});
  const mapTime=t=>{let out=0;for(const s of analysis.plan.segments){if(t>s.end)out+=(s.end-s.start)/s.speed;else if(t>=s.start&&t<=s.end)return out+(t-s.start)/s.speed;else if(t<s.start)return null;}return null;};
  const zooms=analysis.plan.effects.filter(e=>e.type==='zoom').map(e=>({start:mapTime(e.time),end:mapTime(e.time+e.duration),intensity:e.intensity})).filter(e=>e.start!==null&&e.end!==null);
  const zoomExpression=zooms.reduce((expr,e)=>`max(${expr}\\,if(between(on\\,${Math.round(e.start*30)}\\,${Math.round(e.end*30)})\\,${e.intensity}\\,1))`,'1');
  const assSafe=ass.replace(/\\/g,'/').replace(/:/g,'\\:').replace(/'/g,"\\'"); const filter=`${parts.join(';')};${inputs.join('')}concat=n=${analysis.plan.segments.length}:v=1:a=1[vcat][acat];[vcat]split[bg0][fg0];[bg0]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=28:8,eq=brightness=-0.32[bg];[fg0]scale=1080:1920:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,zoompan=z='${zoomExpression}':d=1:s=1080x1920:fps=30,subtitles='${assSafe}'[outv]`;
  progress({percent:20,message:'Rendering vertical short locally'}); await run(ffmpeg,['-y','-i',analysis.source,'-filter_complex',filter,'-map','[outv]','-map','[acat]','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','192k','-movflags','+faststart',output],text=>{const m=text.match(/time=(\d+):(\d+):(\d+[.]\d+)/); if(m){const t=Number(m[1])*3600+Number(m[2])*60+Number(m[3]); progress({percent:Math.min(95,20+75*t/(analysis.plan.source_end-analysis.plan.source_start)),message:'Rendering vertical short locally'});}}); progress({percent:100,message:'Render complete'}); return {output,folder:outDir};
}
module.exports={renderShort,createAss,emphasize};
