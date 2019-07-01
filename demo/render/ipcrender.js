let send = document.querySelector('#send');
let sendFeedback = document.querySelector('#sendFeedback');
let sendSync = document.querySelector('#sendSync');
// 如果 const 造成 openWindow里边的const 就会有冲突, 因为同属于一个 html 的script
var { ipcRenderer } = require('electron');

// 一系列触发渲染进程通信的方法监听 这里边的console会输出到console控制台
// 直接发
send.onclick = function () {
  ipcRenderer.send('sendMsg', { name: 'shulan', age: '21'});
}

// 发了 在配一个 on 搞定
sendFeedback.onclick = function () {
  // ipcRenderer.send('sendFeedback', { name: 'shulan', age: '21'});
  ipcRenderer.send('sendFeedback', document.querySelector('#url').value)
}
ipcRenderer.on('sendFeedbackToRender', (e, data) => {
  // console.log('event\n', e);
  console.log('data\n', data);
})

// 同步通信  以render值的方式
sendSync.onclick = function () {
  let msg = ipcRenderer.sendSync('sendsync', { name: 'shulan', age: '21'});

  console.log('同步返回msg\n', msg);
}