const  { ipcRenderer } = require('electron');
const { remote: { BrowserWindow }} = require('electron');

ipcRenderer.on('toNews', (e, userInfo, winId) => {
  let username = localStorage.getItem('username')
  console.log('从localStorage里边获取的', username)

  // 通过 BrowserWindow 和 webContents 模块实现渲染进程和渲染进程的通信
  // webContents 是一个事件发出者.它负责渲染并控制网页，也是 BrowserWindow 对象的属性
  
  // 新窗口 通过拿到的发过来的窗口Id 从而拿到窗口
  let firstWin = BrowserWindow.fromId(winId);
  // 变成渲染进程之间的反馈,  本质上就是通过窗口id来拿到权力，
  firstWin.webContents.send('toIndex', '来自news进程反馈的信息');
  // 新的窗口 console输出
  console.log('toNews: 监听到',userInfo);
})