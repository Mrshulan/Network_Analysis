import React from 'react';
import './index.scss'

// const { ipcRenderer } = window.require('electron');

const SearchView = function ({requestToRes}) {
  let searchInput = null;

  const urlSubmit = () => {
    let url = searchInput.value || 'http://baidu.com';
    // http://.../foo.html(可行[主机名匹配规则简单]) 要在正则匹配的复杂性和完整性取得平衡
    let patternURL = /^https?:\/\/([^/:]+)(:(\d+))?(\/.*)?$/
    if(patternURL.test(url)) {
      requestToRes(url);
    } else {
      // 检测正确性
      new window.Notification('请检查URL', { body: 'URL输入有问题'});
    }
  }

  return (
    <div className='search-wrapper'>
      <div className='search'>
        <div className="search-method">
          <span className="method-checked">GET</span>
        </div>
        
        <div className='search-input'>
          <input placeholder="Enter request URL(default https://baidu.com)" type="text" ref={(input) => { searchInput = input }}/>
        </div>

        <button className="search-button" onClick={urlSubmit}>Send</button>
      </div>
    </div>
  )
}

export default SearchView;
