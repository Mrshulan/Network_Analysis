import React, { useState } from 'react';
import SearchView from './components/search';
import Layout from './components/layout';
import ResultView from './components/result';
import { networkToRequest, performanceParser } from './util/help';

const { ipcRenderer } = window.require('electron');
function App() {
  const [ requestRes, setRequestRes ] = useState([
    {
      contentLength: 0,
      mimeType: "text/html",
      name: "https://www.baidu.com/",
      protocol: "http/1.1",
      receiveHeadersEnd: 107.011,
      status: 200,
      url: "https://www.baidu.com/",
    }
  ]);
  const [ performanceRes, setPerformanceRes ] = useState({
    dns: 18,
    domReady: 47,
    load: 339,
    redirect: 0,
    request: 54,
    response: 22,
    tcp: 34,
  });
  
  const requestToRes = (target_url) => {
    console.log(`正在查询${target_url}`);
    ipcRenderer.send('sendFeedback', target_url);
    ipcRenderer.on('sendFeedbackToRender', (e, data) => {
      let requestRes = networkToRequest(data.success);
      let performanceRes = performanceParser(data.performanceInfo);
      setRequestRes(requestRes);
      setPerformanceRes(performanceRes);
      // console.log('requestRes\n', requestRes);
      // console.log('performanceRes\n', performanceRes);
    }) 
  }
  const urlToload = (url) => {
    ipcRenderer.send('openwindow', url);
  }

  return (
    <div className="App">
      <Layout>
        <SearchView requestToRes={requestToRes}></SearchView>
        <ResultView urlToloadNewWindow={urlToload} requestRes={requestRes} performanceRes={performanceRes}></ResultView>
      </Layout>
    </div>
  );
}

export default App;
