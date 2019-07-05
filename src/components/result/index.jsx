import React, { useState  }from 'react';
import './index.scss';

// TODO Tab组件
const ResultView = ({ requestRes, performanceRes, urlToloadNewWindow }) => {
  const [ activeIndex, setActiveIndex ] = useState("request");

  const urlToload = (url) => {
    urlToloadNewWindow(url);
  }

  const showRequestRes = (requestRes) => {
    if(!requestRes || requestRes.length === 0) {
      return (
        <div className='result-error'>
          Could not get any response
          <ul className='result-error-reason'>
            <li>- Why this might have happened:  </li>
            <li>- The server couldn't send a response: </li>
            <li>- Ensure that the backend is working properly</li>
            <li>- Self-signed SSL certificates are being blocked:</li>
            <li>- Fix this by turning off 'SSL certificate verification' in Settings > General</li>
            <li>- Proxy configured incorrectly</li>
            <li>- Ensure that proxy is configured correctly in Settings > Proxy</li>
          </ul>
        </div>
      )
    }
    // 数据分类处理
    let colname = [ 
      {
        type: 'name',
        typename: 'Name'
      }, {
        type: 'status',
        typename: 'Status'
      }, {
        type: 'mimeType',
        typename: 'Mime'
      }, {
        type: 'protocol',
        typename: 'Protocol'
      }, {
        type: 'receiveHeadersEnd',
        typename: 'Time/ms'
      }, {
        type: 'contentLength',
        typename: 'Size/b'
      }
    ]
    let data = {
      urlArr: [],
      nameArr: [],
      statusArr: [],
      mimeTypeArr: [],
      protocolArr: [],
      receiveHeadersEndArr: [],
      contentLengthArr: []
    }
    requestRes.forEach((item) => {
      const { 
        contentLength,
        mimeType,
        name,
        protocol,
        receiveHeadersEnd,
        status,
        url  
      } = item;
      data.contentLengthArr.push(contentLength);
      data.mimeTypeArr.push(mimeType);
      data.nameArr.push(name);
      data.protocolArr.push(protocol);
      data.receiveHeadersEndArr.push(receiveHeadersEnd);
      data.statusArr.push(status);
      data.urlArr.push(url);
    });

    return colname.map((c) => {
      return (
        <li className='request-col' key={c.type}>
          <dl className='col-item'>
            <dt className='col-header'>{c.typename}</dt>
            {
              data[c.type+'Arr'].map((item, index) => {
                let _inner = null;
                if(c.type === 'name') {
                  _inner = <a className='urllink'  onClick={urlToload.bind(null, data.urlArr[index])} href="javascrip:void(0)" alt={data.urlArr[index]}>{item}</a>
                } else {
                  _inner = item
                }
                return (
                  <dd className='col-content' key={`${item}${index}`}>
                    {_inner}
                  </dd>
                )
              })
            }
          </dl>
        </li>
      )
    })
  }

  const showPerformanceRes = (performanceRes) => {
    if(!performanceRes) {
      return (
        <div className='result-error'>
          Could not get any response
          <ul className='result-error-reason'>
            <li>- Why this might have happened:  </li>
            <li>- The server couldn't send a response: </li>
            <li>- Ensure that the backend is working properly</li>
            <li>- Self-signed SSL certificates are being blocked:</li>
            <li>- Fix this by turning off 'SSL certificate verification' in Settings > General</li>
            <li>- Proxy configured incorrectly</li>
            <li>- Ensure that proxy is configured correctly in Settings > Proxy</li>
          </ul>
        </div>
      )
    }
    const {
      dns,
      domReady,
      load,
      redirect,
      request,
      response,
      tcp,
    } = performanceRes;

    return (
      <div className='preformance-inner'>
        <ul className="performance-res">
          <li className='performance-row'>页面重定向耗时: {redirect} ms</li>
          <li className='performance-row'>DNS查找耗时: {dns} ms</li>
          <li className='performance-row'>TCP连接耗时: {tcp} ms</li>
          <li className='performance-row'>请求发送耗时: {request} ms</li>
          <li className='performance-row'>响应接收耗时: {response} ms</li>
          <li className='performance-row'>process(包含DOMContentLoaded的dom交互加载时间)耗时(部分): {domReady} ms</li>
          <li className='performance-row'>Load(总时间)加载耗时: {load} ms</li>
        </ul>       
      </div>
    )
  }

  return (
    <div className="result-wrapper">
      <div className="result-tab">
        <span 
          className={activeIndex === "request" ? "active-tabItem" : "tabItem"}
          onClick={() => setActiveIndex("request")}>
          Request analysis
        </span>
        <span 
          className={activeIndex === "performance" ? "active-tabItem" : "tabItem"}
          onClick={() => setActiveIndex("performance")}>
          Performance analysis
        </span>
      </div>

      <div style={{ display: activeIndex === "request" ? "block" : "none" }} className='request-wrapper'>
        <div className="request-inner">
          <ul className='request'>
            { showRequestRes(requestRes) } 
          </ul>
        </div>
      </div>
      <div style={{ display: activeIndex === "performance" ? "block" : "none" }} className="preformance-wrapper">
        { showPerformanceRes(performanceRes) }
      </div>
    </div>
  )
}

export default ResultView;