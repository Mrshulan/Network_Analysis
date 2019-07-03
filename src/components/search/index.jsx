import React from 'react';
import { networkToRequest, performanceParser } from '../../util/help';


// const { ipcRenderer } = window.require('electron');

const SearchView = function ({requestToRes}) {

  let searchInput = null;
  const urlSubmit = () => {
    var patternHostname =/^([a-z0-9]\.|[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.)(com|edu|gov|int|mil|net|org|biz|info|name|museum|coop|aero|[a-z][a-z])$/i
    // TODO 检测正确性
    requestToRes(searchInput.value);
  }

  return (
    <div>
      <label htmlFor="url">
        GET
          <input id='url' placeholder="请输入合法请求Url" type="text" ref={(input) => { searchInput = input }}/>
        </label>
      <button id='sendFeedback' onClick={urlSubmit}>Send</button>
    </div>
  )
}

export default SearchView;
