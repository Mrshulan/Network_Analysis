const fs = require('fs');
const data = fs.readFileSync('../html/index.html', 'utf-8').trim()
let matchRes = {
  js: [],
  image: [],
  css: []
}
const jsReg = /<script.*?src="(.+)"><\/script>/g
const cssReg = /<link.*?href="(.+?)".*?\/>/g
const imgReg = /<img.*?src="(.+?)".*?\/?>/g
// const cssimgReg = /url\((.+?)\)/g
data.replace(jsReg, (...arg) => {
  matchRes.js.push({url: arg[1]})
})
data.replace(cssReg, (...arg) => {
  matchRes.css.push({url: arg[1]})
})
data.replace(imgReg, (...arg) => {
  matchRes.image.push({url: arg[1]})
})
// data.replace(cssimgReg, (...arg) => {
//   matchRes.image.push(arg[1])
// })

Object.keys(matchRes).map(key => {
  matchRes[key] = matchRes[key].filter((item) => /.(js|xml|ico|png|gif|jp(e?)g)$/.test(item.url))
  .map(item => {
    // 信息过滤处理
    let url = item.url
    if(/^\/\//.test(url)) {
      url = 'http:' + url
    }
    if(/^\//.test(url) || /^http/.test(url)) {
      url = 'http://www.baidu.com' + url
    }

    // 信息修改
    let info = url.slice(url.lastIndexOf('/') + 1, url.length).split(".")
    item.url = url;
    item.filetype = info.splice(info.length - 1)[0];
    item.filename = info.join('.');

    return item;
  })
  return void 0;
})

console.log(matchRes);



// const helper = {

// }

// export default helper
