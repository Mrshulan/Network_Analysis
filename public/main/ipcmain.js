const { ipcMain, BrowserWindow } = require('electron');
let win = null;
const CDP = require('chrome-remote-interface');

// 监听开窗口
ipcMain.on('openwindow', (e, url) => {
  win = new BrowserWindow({
    width: 500,
    height: 300,
  });
  win.loadURL(url);
  win.on('closed', () => {win = null;});
})

// 主进程处理渲染进程发来的数据, 并反馈给渲染进程
ipcMain.on('sendFeedback', (event, target_url) => {
  let result = {
    success: [],
    faild: [],
    performanceInfo: {}
  };

  CDP((client) => {
    // extract domains
    const { Network, Page, Runtime } = client;
    
    // Network.requestWillBeSent(每个http请求发送前回调)
    // Network.responseReceived(每次接到http响应的回调)
    // Network.loadingFailed(请求加载失败的回调)
    // Network.loadingFinished(请求加载完成的回调) 
    Network.requestWillBeSent((data) => {
        // console.log(params.request.url);
        // console.log(params.request);
    });
    Network.responseReceived((data) => {
        result.success.push(data.response)
    })
    Network.loadingFailed((data) => {
        result.faild.push(data)
    })

    Page.loadEventFired(() => {
        // performanceParser
        Runtime.evaluate({
          expression:'window.performance.timing.toJSON()',
          returnByValue:true  // 不加这个参数，一个对象的meta信息,还需要getProperties
        }).then((wrapper) => {
            let {result:data, exceptionDetails} = wrapper;
            if(!exceptionDetails){
              result.performanceInfo = data.value;
            } else {
              console.error(exceptionDetails);
            }

            // 如果你在外边close了 那么这个then也就gg了
            client.close();
            // 反馈的数据还需放在异步的最终逻辑里边
            event.sender.send('sendFeedbackToRender', result);
          });
     
      });
    
    // enable events then start...
    Promise.all([
          Network.enable(),
          Page.enable()
      ]).then(() => {
          return Page.navigate({url: target_url || 'http://baidu.com'});//输出请求的url
      }).catch((err) => {
          console.error(err);
          client.close();
      });

  }).on('error', (err) => {
      // headless 未开启9222端口时候
      console.error(err);
      event.sender.send('sendFeedbackToRender', "Error: connect ECONNREFUSED 127.0.0.1:9222");
  });
})

