const { spawn } = require('node:child_process');
function run(binary, args, onLine) {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, { windowsHide: true }); let stderr = '';
    child.stderr.on('data', chunk => { const text = chunk.toString(); stderr += text; if (onLine) onLine(text); });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve(stderr) : reject(new Error(`${binary} exited ${code}\n${stderr.slice(-5000)}`)));
  });
}
module.exports = { run };
