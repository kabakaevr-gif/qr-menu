const fs = require('node:fs');
const path = require('node:path');
const OpenAI = require('openai');
const schema = require('../edit-plan.schema.json');
const prompt = fs.readFileSync(path.join(__dirname, '../../prompts/director.md'), 'utf8');

class OpenAIDirectorProvider {
  constructor({ model = 'gpt-5-mini' } = {}) { this.model = model; this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); }
  async direct(input, repair = null) {
    const started = Date.now();
    const content = [{ type: 'input_text', text: `${prompt}\n\nDOTA CONTEXT:\n${input.dotaContext}\n\nSIGNALS:\n${JSON.stringify(input.signals)}` }];
    if (repair) content.push({ type: 'input_text', text: `Your previous plan failed semantic validation: ${repair.error}. Repair it while preserving good decisions. Previous plan: ${JSON.stringify(repair.plan)}` });
    for (const frame of input.frames) {
      content.push({ type: 'input_text', text: `Frame at ${frame.time.toFixed(1)}s` });
      content.push({ type: 'input_image', image_url: `data:image/jpeg;base64,${fs.readFileSync(frame.path).toString('base64')}`, detail: 'low' });
    }
    const response = await this.client.responses.create({ model: this.model, input: [{ role: 'user', content }], text: { format: { type: 'json_schema', name: 'edit_plan', strict: true, schema } } });
    return { plan: JSON.parse(response.output_text), debug: { provider: 'openai', model: this.model, duration_ms: Date.now() - started, usage: response.usage || {}, estimated_cost_usd: null, response_id: response.id } };
  }
}
module.exports = { OpenAIDirectorProvider };
