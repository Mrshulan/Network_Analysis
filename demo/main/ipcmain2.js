const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');

let win = null;

ipcMain.on('openwindow', (e, userInfo) => {
  // 获取当前窗口的Id
  let winId = BrowserWindow.getFocusedWindow().id;

  win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // 基于main路径所以 ../
  win.loadURL(path.join('file:',__dirname, '../news.html'));

  // 新窗口开启调试模式
  win.webContents.openDevTools();

  // 等窗口加载完成
  win.webContents.on('did-finish-load', () => {
    // BrowserWindow直接导出的 主进程send
    // 把渲染进程传递过来的数据再次传递给渲染进程news
    win.webContents.send('toNews', userInfo, winId);
  })


  win.on('closed', () => {win = null;});
})