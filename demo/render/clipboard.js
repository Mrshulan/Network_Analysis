let msg = document.querySelector('#msg');
let plat = document.querySelector('#plat');
let text = document.querySelector('#text');

const { clipboard, nativeImage } = require('electron');

// 向剪切版 write数据 否则直接读取你所其他地方复制的
msg.ondblclick = function () {
  clipboard.writeText(msg.innerHTML);
  alert(msg.innerHTML);
}
plat.onclick = function () {
  text.value = clipboard.readText();
}

// 读取图面显示到界面base64
let copyImg = document.querySelector('#copyImg');
copyImg.onclick = function () {
  // let image = nativeImage.createFromPath('.')
  // 复制图片
  // clipboard.writeImage(image)

  // 粘贴图片
  let imgSrc = clipboard.readImage().toDataURL(); // base64图片

  // 显示到页面上
  let _img = new Image();
  _img.src = imgSrc;
  document.body.appendChild(_img);
}

