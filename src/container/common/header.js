import React, { Component } from "react";
import cookie from "react-cookie";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, getProviderProfile } from "../account/account_action";
import { lib } from "../library/elements";
class CommonHeader extends Component {
  customerProfile() {
    if (cookie.load("customer") && !this.props.account_profile) {
      this.props.getProfile();
    }
  }
  ProviderProfile() {
    if (cookie.load("provider") && !this.props.provider_profile) {
      this.props.getProviderProfile();
    }
  }

  renderAccountLinks() {
    if (cookie.load("customer") && this.props.account_profile) {
      return [
        <li className="dropdown haccount-dropdown" key="header.customer.li">
          <Link
            title="My Account"
            className="dropdown-toggle btn btn-outline-secondary"
            data-toggle="dropdown"
          >
            <i className="fa fa-user fa-account"></i>{" "}
            <span className="hidden-lg-down">
              {lib.ucwords(this.props.account_profile.name)}{" "}
            </span>
            <span className="caret"></span>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/account">
                <i className="fa fa-user"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/account/ticket/add">
                <i className="fa fa-plus"></i> Create Ticket
              </Link>
            </li>
            <li>
              <Link to="/account/ticket">
                <i className="fa fa-life-ring"></i> Active Tickets
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <i className="fa fa-power-off"></i> Logout
              </Link>
            </li>
          </ul>
        </li>,
      ];
    } else if (cookie.load("provider") && this.props.provider_profile) {
      return [
        <li className="dropdown haccount-dropdown" key="header.customer.li">
          <Link
            title="My Account"
            className="dropdown-toggle btn btn-outline-secondary"
            data-toggle="dropdown"
          >
            <i className="fa fa-wrench"></i>{" "}
            <span className="hidden-lg-down">
              {lib.ucwords(this.props.provider_profile.name)}{" "}
            </span>
            <span className="caret"></span>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/provider">
                <i className="fa fa-user"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/provider/ticket">
                <i className="fa fa-life-ring"></i> Active Tickets
              </Link>
            </li>
            <li>
              <Link to="/provider_logout">
                <i className="fa fa-power-off"></i> Logout
              </Link>
            </li>
          </ul>
        </li>,
      ];
    } else {
      return (
        <li className="dropdown haccount-dropdown" key="header.customer.lil">
          <Link
            title="My Account"
            className="dropdown-toggle btn btn-outline-secondary"
            data-toggle="dropdown"
          >
            <i className="fa fa-user fa-account"></i>{" "}
            <span className=" hidden-lg-down"> Registration </span>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/customer">Customer</Link>
            </li>
            <li>
              <Link to="/contractor">Contractor</Link>
            </li>
          </ul>
        </li>
      );
    }
  }

  render() {
    const {
      authenticated,
      authenticate_provider,
      account_profile,
      provider_profile,
    } = this.props;

    return (
      <header className="header">
        <alertTop />
        {this.customerProfile()}
        {this.ProviderProfile()}
        <div className="header-top hidden-md-down">
          <nav>
            <div className="container">
              <div className="nav pull-left" id="header-top-left">
                <Link to="/" className="logo">
                  Mysscrow
                </Link>

                <div className="justify-content-start" id="mobile-navigation">
                  <ul className="ml-4 navbar-nav">
                    {/* <li className="nav-item">
                      <Link aria-current="page" className="nav-link" to="/">
                        Home
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link
                        aria-current="page"
                        className="nav-link"
                        to="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        aria-current="page"
                        className="nav-link"
                        to="/contact"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="main-menu nav pull-right">
                <ul className="list-inline mb-0">
                  {this.renderAccountLinks()}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    authenticate_provider: state.account.authenticate_provider,
    account_profile: state.account.profile,
    provider_profile: state.account.provider_profile,
  };
}
export default connect(mapStateToProps, { getProfile, getProviderProfile })(
  CommonHeader
);
