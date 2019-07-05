module.exports = {
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
        headers,
      } = item;
      // 区别protocol是‘h2'
      let contentLength = 0;
      if(headers["Content-Length"]) {
        contentLength = headers['Content-Length'];
      } else if (headers["content-length"]) {
        contentLength = headers['content-length']
      }

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
