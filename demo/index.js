// 引入eletron 创建一个BrowserWindow对象
const { app, BrowserWindow } = require('electron');
const path = require('path');
// const url = require('url');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收了，造成窗口关闭
let mainWindow;

function createWindow () {
  // 自定义窗口巴拉的
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // .html 开启require
      nodeIntergration: true
    }
  });

  mainWindow.loadURL(path.join('file:', __dirname, './index.js'))

  // 打开开发者工具，默认不打开
  mainWindow.webContents.openDevTools();
  // 关闭window时触发
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

// 当Electron完成初始化的时候 准备创建 浏览器窗口
app.on('ready', createWindow)
// 所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})


// macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
app.on('activate', function() {
  if(mainWindow === null) {
    createWindow()
  }
})

// 可以在这里引入其他的 js脚本