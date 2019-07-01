const { ipcMain } = require('electron');

// 主进程处理渲染进程发来的数据
ipcMain.on('sendMsg', (event, data) => {
  console.log('data\n', data);
  console.log('event\n ', event);
})

// 主进程处理渲染进程发来的数据, 并反馈给渲染进程
ipcMain.on('sendFeedback', (event, data) => {
  const result = {
    status: null,
    headers: null,
    body: ''
  };
  const {net} = require('electron')
  const request = net.request(data || 'https://baidu.com')
  request.on('response', (response) => {
    result.status = response.status;
    result.headers = response.headers;

    response.on('data', (chunk) => {
      // console.log(`正文: ${chunk}`)
      result.body += chunk;
    })

    response.on('end', () => {
      console.log('没有更多的数据响应.')
      event.sender.send('sendFeedbackToRender', result);
    })
  })
  request.end()

})

// 主进程和渲染进程同步通信
ipcMain.on('sendsync', (event, data) => {

  // TODO 同步数据data 一顿操作
  // TODO
  // 反馈回去
  event.returnValue = '同步通信结果， 来自主进程';
})
