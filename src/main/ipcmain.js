const { ipcMain } = require('electron');
const CDP = require('chrome-remote-interface');
const { bodyToRequest } = require('../util/help');

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
    
    // setup handlers
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
    
    // enable events then start!
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
      console.error(err);
  });

  // net模块只能够监听一次请求
  // const result = {
  //   status: null,
  //   headers: null,
  //   body: ''
  // };
  // const {net} = require('electron')
  
  // const request = net.request(data || 'https://baidu.com')
  // request.on('response', (response) => {
  //   result.status = response.status;
  //   result.headers = response.headers;

  //   response.on('data', (chunk) => {
  //     // console.log(`正文: ${chunk}`)
  //     result.body += chunk;
  //   })

  //   response.on('end', () => {
  //     console.log('没有更多的数据响应.')
  //     var info = bodyToRequest(result.body)
  //     result.info = info;
  //     event.sender.send('sendFeedbackToRender', result);
  //   })
  // })
  // request.end()
})

// 主进程和渲染进程同步通信
ipcMain.on('sendsync', (event, data) => {

  // TODO 同步数据data 一顿操作
  // TODO
  // 反馈回去
  event.returnValue = '同步通信结果， 来自主进程';
})
