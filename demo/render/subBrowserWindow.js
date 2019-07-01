const btn = document.querySelector('#btn');
var path = require('path');
const { remote: { BrowserWindow } } = require('electron');
let win = null;

btn.onclick = () => {
    win = new BrowserWindow({ 
        width: 300,
        height: 200, 
    }) 

    win.loadURL(path.join('file:',__dirname,'news.html'));

    win.on('close',()=>{win = null});
}