import React from 'react';
import Footer from '../src/container/common/footer';
import Header from '../src/container/common/header';
import rootRoute from '../src/system/route';
import ReduxModal from '../src/container/library/elements/modal';

function CommonApp() {      

  return (
    <div className="app">
       <div id="pageMessages"></div>
      <Header/>
      { rootRoute}
      <Footer/>
      <ReduxModal />
    </div>
  );
}
export default CommonApp;

