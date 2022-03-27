import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../container/common/home";

// Customer

import RouteCustomer from './route_customer';
import Customer from "../container/account/customer";
import AccountOTPLogin from "../container/account/otp_signin";
import AccountLogout from "../container/account/logout";
import AccountOtp from "../container/account/otp";
import AccountDashboard from "../container/account/dashboard";
import AccountJobAdd from "../container/account/job_add";
import AccountJob from "../container/account/job";
import AccountJobInfo from "../container/account/job_info";

import RouteContractor from './route_contractor';
import ContractorLogout from "../container/contractor/logout";
import Contractor from "../container/contractor/contractor";
import ContractorOTPLogin from "../container/contractor/otp_signin";
import ContractorOtp from "../container/contractor/otp";
import ContractorDashboard from "../container/contractor/dashboard";
import ContractorJobs from "../container/contractor/jobs";
import ContractorJobInfo from "../container/contractor/job_info";
const rootRoute = (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* customer route */}
    <Route exact path="/customer" component={Customer} />
    <Route exact path="/otp_signin" component={AccountOTPLogin} />
    <Route exact path="/logout" component={AccountLogout} />
    <Route exact path="/otp" component={AccountOtp} />
    <RouteCustomer exact path="/account" component={AccountDashboard} />
    <RouteCustomer exact path="/account/job/add" component={AccountJobAdd} />
    <RouteCustomer exact path="/account/job" component={AccountJob} />
    <RouteCustomer exact path="/account/job" component={AccountJob} />
    <RouteCustomer exact path="/account/job/info/:job_id" component={AccountJobInfo} />
   
   
    <Route exact path="/contractor_logout" component={ContractorLogout} />
    <Route exact path="/contractor" component={Contractor} />
    <Route exact path="/contractor_otp_signin" component={ContractorOTPLogin} />
    <Route exact path="/contractor_otp" component={ContractorOtp} />
    <RouteContractor exact path="/contractor_account" component={ContractorDashboard} />
    <RouteContractor exact path="/contractor/job" component={ContractorJobs} />
    <RouteContractor exact path="/contractor/job/info/:job_id"component={ContractorJobInfo}/>
  </Switch>
);
export default rootRoute;
