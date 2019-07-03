const CDP = require('chrome-remote-interface');
// node nmask.js https://example.com
var options = process.argv;
var target_url = options[2];
CDP((client) => {
    // extract domains
    const {Network, Page} = client;
    
    // setup handlers
    Network.requestWillBeSent((params) => {
        // console.log(params.request.url);
        // console.log(params.request);
    });
    Network.responseReceived((params) => {
        console.log(params.response);
    })
    Page.loadEventFired(() => {
        client.close();
    });
    
    // enable events then start!
    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        return Page.navigate({url: target_url});//输出请求的url
    }).catch((err) => {
        console.error(err);
        client.close();
    });
}).on('error', (err) => {
    console.error(err);
});
