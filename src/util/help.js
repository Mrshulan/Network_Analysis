// const fs = require('fs');
// const data = fs.readFileSync('../html/index.html', 'utf-8').trim()

module.exports = {
  bodyToRequest: (data) => {
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
  },
  networkToRequest: (data) => {
    // 这里只处理了成功的状态
    if(data.length === 0) {
      return [];
    }

    return data.map((item) => {
      const { 
        url,
        status,
        mimeType,
        protocol,
        timing: { receiveHeadersEnd=0 }={},
        headers: { "Content-Length": contentLength=0 },
      } = item;

      let name = '';
      // 如果是真实请求路径
      if(/^http/.test(url)) {
        let flag = url.lastIndexOf('/') === url.length-1 ? -1 : url.lastIndexOf('/');
        name = url.slice(flag + 1, url.length);
      } else {
        name = url;
      }

      return {
        name,
        url,
        status,
        mimeType,
        protocol,
        receiveHeadersEnd,
        contentLength
      }
    })
  },
  performanceParser: (perforceTiming) => {
    let timingGather = {};
    perforceTiming = perforceTiming || {};
    // 页面重定向耗时
    timingGather.redirect = perforceTiming.redirectEnd - perforceTiming.redirectStart;
    // DNS查找耗时
    timingGather.dns = perforceTiming.domainLookupEnd - perforceTiming.domainLookupStart;
    // TCP连接耗时 
    timingGather.tcp = perforceTiming.connectEnd - perforceTiming.connectStart;
    // 请求发送耗时
    timingGather.request = perforceTiming.responseStart - perforceTiming.requestStart;
    // 响应接收耗时
    timingGather.response = perforceTiming.responseEnd - perforceTiming.responseStart;
    // process(包含DOMContentLoaded的dom交互加载时间)耗时(部分)
    timingGather.domReady = perforceTiming.domComplete - perforceTiming.domInteractive;
    // Load(总时间)加载耗时
    timingGather.load = perforceTiming.loadEventEnd - perforceTiming.navigationStart;
    return timingGather;
  },
}
