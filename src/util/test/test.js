//  net模块只能够监听一次请求
const result = {
  status: null,
  headers: null,
  body: ''
};
const {net} = require('electron')
const request = net.request('https://baidu.com')

request.on('response', (response) => {
  result.status = response.status;
  result.headers = response.headers;

  response.on('data', (chunk) => {
    // console.log(`正文: ${chunk}`)
    result.body += chunk;
  })

  response.on('end', () => {
    console.log('没有更多的数据响应.');
    result.info = bodyToRequest(result.body );
  })
})

request.end();

// 一次Body请求
function bodyToRequest(data) {
  // const fs = require('fs');
  // const data = fs.readFileSync('./html/test.html', 'utf8');

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
      if(/^\//.test(url) || !/^http/.test(url)) {
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

  return matchRes;
}



