const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

app.allowRendererProcessReuse = true;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,

      preload: path.join(app.getAppPath(), 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('get platform', (event, _data) => {
  console.log('platform requested');
  event.reply('platform delivered', os.platform());
});
