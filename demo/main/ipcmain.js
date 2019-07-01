const { ipcMain } = require('electron');

// 主进程处理渲染进程发来的数据
ipcMain.on('sendMsg', (event, data) => {
  console.log('data\n', data);
  console.log('event\n ', event);
})

// 主进程处理渲染进程发来的数据, 并反馈给渲染进程
ipcMain.on('sendFeedback', (event, data) => {

  event.sender.send('sendFeedbackToRender', data);

  // TODO data 一顿数据操作
  // TODO
  // let res = `小伙子才${data.age}岁挺年轻的嘛`;
  // 反馈回去
  // event.sender.send('sendFeedbackToRender', res + '   来自主进程的处理反馈');
})

// 主进程和渲染进程同步通信
ipcMain.on('sendsync', (event, data) => {

  // TODO 同步数据data 一顿操作
  // TODO
  // 反馈回去
  event.returnValue = '同步通信结果， 来自主进程';
})
