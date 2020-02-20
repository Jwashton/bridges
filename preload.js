const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('MainAPI', {
  getPlatform() {
    return new Promise((resolve, _reject) => {
      ipcRenderer.once('platform delivered',
                       (_event, platform) => resolve(platform));

      ipcRenderer.send('get platform', {});
    });
  }
});

