// Shell既属于主进程模块又是渲染进程模块,集成其他桌面客户端的关联功能
const { shell } = require('electron');
let shellDom = document.querySelector('#shellDom');

shellDom.onclick = function (e) {
  shell.openExternal('https://github.com/mrshulan')
};