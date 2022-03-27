import React from "react";
import cookie from "react-cookie";
import { Route, Redirect } from "react-router-dom";
import ContractorHeader from "../container/contractor/header";
import contractor from "../images/contractor.jpg";
var background_image = {
  background:
    "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" +
    contractor +
    ") center center no-repeat",
  backgroundSize: "cover",
  textAlign: "center",
};
const RouteContractor = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>

      
      cookie.load("contractor") ? (

        
        <div id="page-account">
           <div className="top-banner" style={background_image}>
              <div className="col-sm-12 body-banner">
                <h1 className="title">Contractor Dashboard</h1>
              </div>
            </div>
          <div className="container-fluid mt-4 mb-5">
           
            <div className="row">
              <div className="col-lg-3 mb-4 mb-lg-0 profile-left-menu">
                <ContractorHeader {...props} />
              </div>
              <div className="col-lg-9 profile-container">
                <Component {...props} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={`/contractor`} />
      )
    }
  />
);

export default RouteContractor;
