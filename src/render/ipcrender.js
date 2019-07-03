let sendFeedback = document.querySelector('#sendFeedback');
// 如果 const 造成 openWindow里边的const 就会有冲突, 因为同属于一个 html 的script
var { ipcRenderer } = require('electron');

console.log('sendFeedback', sendFeedback);
// 发了 在配一个 on 搞定
sendFeedback.onclick = function () {
  // ipcRenderer.send('sendFeedback', { name: 'shulan', age: '21'});
  ipcRenderer.send('sendFeedback', document.querySelector('#url').value)
}
ipcRenderer.on('sendFeedbackToRender', (e, data) => {
  // console.log('event\n', e);
  console.log('data\n', data);
})