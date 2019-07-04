var { ipcMain, BrowserWindow } = require('electron');

let win = null;

// 监听开窗口的提示 TODO 渲染进程BrowserWindow
ipcMain.on('openwindow', (e, url) => {
  win = new BrowserWindow({
    width: 400,
    height: 300,
  });

  win.loadURL(url);

  win.on('closed', () => {win = null;});
})