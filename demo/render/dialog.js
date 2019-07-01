let showError = document.querySelector('#showError');
let showMsg = document.querySelector('#showMsg');
let showOpenDialog = document.querySelector('#showOpenDialog');
let saveDialog = document.querySelector('#saveDialog');

const { remote: { dialog }} = require('electron');

showError.onclick = function () {
  dialog.showErrorBox('警告', '操作有误');
}

showMsg.onclick = function () {
  dialog.showMessageBox({
    type: 'info',
    title: '提示信息',
    message: '内容',
    buttons: ['确定', '取消'] // 根据下标 回调传入 index
  },function(index){
      console.log(index)
  })
}

showOpenDialog.onclick = function () {
  dialog.showOpenDialog({
    properties: ['openDirectory', 'openFile']
  }, function (data) {
    console.log(data)
  }) 
}

saveDialog.onClick = function () {
  dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: '/Users/shulan/Downloads/',
    // filters 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
      { name: 'Custom File Type', extensions: ['as'] },
      { name: 'All Files', extensions: ['*'] }
    ]  
  }, function (path) {  
    // 并非直接就可以保存, 还需要其他的逻辑
    console.log(path);
  })
}