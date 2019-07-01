// var path  = require('path');

// h5api实现通知
var options = {
  title: 'electron 通知API',
  body: 'content',
  // icon: 
}


document.querySelector("#showNotification").onclick = function () {
  var newNotification = new window.Notification(options.title, options);

  newNotification.onclick = function () {
    console.log('you clicked newNotification')
  }
}


// 监听网络的变化
window.addEventListener('online', function () {
  console.log('online');
})
window.addEventListener('offline', function () {
  var options = {
    title: 'foxmail',
    body: '网络异常, 请检查你的网络',
    // icon:
  }
  var newNotification  = new window.Notification(options.title, options)
  newNotification.onclick = function () {
      console.log('you clicked newNotification')
  }
})


