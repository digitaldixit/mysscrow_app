import React from 'react';
import cookie from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';
import CustomerHeader from '../container/account/header';
import customer from "../images/customer.jpg";
var background_image = {
  background:
    "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" +
    customer +
    ") center center no-repeat",
  backgroundSize: "cover",
  textAlign: "center",
};
const RouteAccount = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (cookie.load('customer')) ? (
        <div id="page-account">
          <div className="top-banner" style={background_image}>
              <div className="col-sm-12 body-banner">
                <h1 className="title">Customer Dashboard</h1>
              </div>
            </div>
          <div className="container-fluid mt-4 mb-5">
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
        <Redirect to={`/customer`} />
      )
    }
  />
);


export default RouteAccount;
