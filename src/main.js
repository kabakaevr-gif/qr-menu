const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('node:path');
const Store = require('electron-store');
const fs = require('node:fs');
const { analyzeClip } = require('./pipeline');
const { renderShort } = require('./renderer');

const store = new Store({ defaults: { frameInterval: 1, model: 'gpt-5-mini', director: true, facecam: null } });
let win;
let logPath;
function log(message, details = '') {
  const line = `[${new Date().toISOString()}] ${message}${details ? ` ${details}` : ''}\n`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, line);
}
async function loggedOperation(name, operation) {
  log(`${name} started`);
  try { const result = await operation(); log(`${name} completed`); return result; }
  catch (error) { log(`${name} failed`, error.stack || error.message); console.error(`${name} failed`, error); throw error; }
}
function createWindow() {
  win = new BrowserWindow({ width: 1240, height: 840, minWidth: 980, minHeight: 700, backgroundColor: '#090b10', webPreferences: { preload: path.join(__dirname, 'preload.js') } });
  win.loadFile(path.join(__dirname, '../ui/index.html'));
}
app.whenReady().then(() => { logPath = path.join(app.getPath('userData'), 'logs', 'editor.log'); createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

ipcMain.handle('pick-video', async () => (await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'MP4 video', extensions: ['mp4'] }] })).filePaths[0]);
ipcMain.handle('get-settings', () => store.store);
ipcMain.handle('save-settings', (_e, value) => { store.set(value); return store.store; });
ipcMain.handle('analyze', async (_e, file, options) => loggedOperation('Analysis', async () => {
  const result = await analyzeClip(file, { ...store.store, ...options }, p => { log('Analysis progress', `${p.percent}% ${p.message}`); win.webContents.send('progress', p); });
  result.debug.log_path = logPath; return result;
}));
ipcMain.handle('render', async (_e, analysis) => loggedOperation('Render', () => renderShort(analysis, p => { log('Render progress', `${Math.round(p.percent)}% ${p.message}`); win.webContents.send('progress', p); })));
ipcMain.handle('open-output', (_e, folder) => shell.openPath(folder));
