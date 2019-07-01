let openWindow = document.querySelector('#openWindow');

var { ipcRenderer } = require('electron');

// 渲染进程通知主进程打开窗口 [直接操作通信]
openWindow.onclick = function () {
  ipcRenderer.send('openwindow', { name: 'shulan', age: '21'});

  // 通过localStorage介质 存储在当下
  // 传递给打开的窗口 渲染进程和渲染进程[直接]的通信 (可以看到打开的窗口数据已经存入进去了)
  localStorage.setItem('username', 'shulan')
}

// 该渲染进程的监听 自己的窗口id被 新窗口拿到send 渲染进程之间的通信 
ipcRenderer.on('toIndex', (e, data)=>{
  console.log('渲染进程之间的通信', data)
})