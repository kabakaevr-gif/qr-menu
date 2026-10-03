const { contextBridge, ipcRenderer, webUtils } = require('electron');
contextBridge.exposeInMainWorld('dotaEditor', {
  pickVideo: () => ipcRenderer.invoke('pick-video'),
  pathForFile: file => webUtils.getPathForFile(file),
  settings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: value => ipcRenderer.invoke('save-settings', value),
  analyze: (file, options) => ipcRenderer.invoke('analyze', file, options),
  render: analysis => ipcRenderer.invoke('render', analysis),
  openOutput: folder => ipcRenderer.invoke('open-output', folder),
  onProgress: callback => ipcRenderer.on('progress', (_event, value) => callback(value))
});
