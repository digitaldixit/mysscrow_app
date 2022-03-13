import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../container/common/home";
import CatalogPageInformation from "../container/catalog/page_info";
// Customer
import AccountOTPLogin from "../container/account/otp_signin";
import AccountLogout from "../container/account/logout";
// 

import RouteCustomer from './route_customer';
import Customer from "../container/account/customer";
import AccountOtp from "../container/account/otp";
import AccountDashboard from "../container/account/dashboard";
import AccountLayout from "../container/account/layout";
import AccountTicket from "../container/account/ticket";
import AccountPastTicket from "../container/account/past_ticket";
import AccountTicketAdd from "../container/account/ticket_add";
import AccountTicketInfo from "../container/account/ticket_info";

import ProviderOtp from "../container/account/provider_otp";
import ProviderSignup from "../container/account/provider_signup";
import ProviderSignIn from "../container/account/provider_signin";
import ProviderAccountLogout from "../container/provider/logout";
import ProviderAccountLayout from "../container/account/provider_layout";
import ProviderAccountDashboard from "../container/provider/dashboard";
import ProviderAccountTicket from "../container/provider/ticket";
import ProviderAccountPastTicket from "../container/provider/past_ticket";
import ProviderAccountTicketInfo from "../container/provider/ticket_info";
const rootRoute = (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/page/:keyword" component={CatalogPageInformation} />
    <Route exact path="/page/info/:page_id" component={CatalogPageInformation} />

    {/* customer route */}
    <Route exact path="/customer" component={Customer} />
    <Route exact path="/otp_signin" component={AccountOTPLogin} />>
    <Route exact path="/logout" component={AccountLogout} />
    <Route exact path="/otp" component={AccountOtp} />
 
    {/* customer account route  */}
    <RouteCustomer exact path="/account" component={AccountDashboard} />
    <RouteCustomer exact path="/account/ticket" component={AccountTicket} />
    <RouteCustomer exact path="/account/past/ticket" component={AccountPastTicket} />
    <RouteCustomer exact path="/account/ticket/add" component={AccountTicketAdd} />
    <RouteCustomer exact path="/account/ticket/info/:ticket_id" component={AccountTicketInfo} />
  
    <Route exact path="/provider" component={ProviderAccountLayout} />
    <Route exact path="/provider_otp" component={ProviderOtp} />
    <Route exact path="/provider_signup" component={ProviderSignup} />
    <Route exact path="/provider_signin" component={ProviderSignIn} />
    <Route exact path="/provider_logout" component={ProviderAccountLogout} />
    <Route exact path="/provider_dashboard" component={ProviderAccountDashboard} />
    <Route exact path="/provider/ticket" component={ProviderAccountTicket} />
    <Route exact path="/provider/past/ticket" component={ProviderAccountPastTicket} />
    <Route
      exact path="/provider/ticket_service/info/:ticket_service_id"
      component={ProviderAccountTicketInfo}
    />
  </Switch>
);
export default rootRoute;
