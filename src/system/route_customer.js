import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';
import CustomerHeader from '../container/account/header';

const RouteAccount = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (cookie.load('customer')) ? (
        <div id="page-account">
          <div className="container-fluid mt-5 mb-5">
            <div className="row">
              <div className="col-lg-3 mb-4 mb-lg-0 profile-left-menu">
                <CustomerHeader {...props} />
              </div>
              <div className="col-lg-9 profile-container">
              <Component {...props} />
              </div>  
            </div>
          </div>    
        </div>
      ) : (
        <Redirect to={`/login`} />
      )
    }
  />
);

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(RouteAccount);
