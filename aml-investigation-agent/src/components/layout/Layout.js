import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/layout.css';

const Layout = ({ children, title }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        {children}
      </div>
    </div>
  );
};

export default Layout;