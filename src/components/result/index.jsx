import React from 'react';

const ResultView = ({ requestRes, performanceRes }) => {

  return (
    <div className="result">
      <div className='request'>
        { requestRes[0].mimeType }
      </div>
      <div className="preformance">
        { performanceRes.domReady }
      </div>
    </div>
  )
}

export default ResultView;