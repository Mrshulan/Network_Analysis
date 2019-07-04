import React from 'react';
import './index.scss';

const Layout = (props) => {

  return (
    <div className="wrapper">
      <h1 className="view_title">
        Debug deeper with
        <span className="view_disc">Network</span>
      </h1>
      { props.children }
    </div>
  )
}

export default Layout;