import React, { Component } from "react";
import cookie from "react-cookie";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile  } from "../account/account_action";
import { getContractorProfile } from "../contractor/contractor_action";
import { lib } from "../library/elements";
class CommonHeader extends Component {
  customerProfile() {
    if (cookie.load("customer") && !this.props.account_profile) {
      this.props.getProfile();
    }
  }
  ContractorProfile() {
    if (cookie.load("contractor") && !this.props.contractor_profile) {
      this.props.getContractorProfile();
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
            <i className="fa fa-user fa-account m-1"></i>{" "}
              {lib.ucwords(this.props.account_profile.firstname + " " + this.props.account_profile.lastname)}{" "}
            <span className="caret"></span>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/account">
                <i className="fa fa-user"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/account/job">
                <i className="fa fa-list"></i> Jobs
              </Link>
            </li>
            <li>
              <Link to="/account/job/add">
                <i className="fa fa-plus"></i> Ceate Job
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
    } else if (cookie.load("contractor") && this.props.contractor_profile) {
      return [
        <li className="dropdown haccount-dropdown" key="header.contractor.li">
          <Link
            title="My Account"
            className="dropdown-toggle btn btn-outline-secondary"
            data-toggle="dropdown"
          >
            <i className="fa fa-user fa-account m-1"></i>{" "}
              {lib.ucwords(this.props.contractor_profile.firstname + " " + this.props.contractor_profile.lastname)}{" "}
            <span className="caret"></span>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/contractor_account">
                <i className="fa fa-user"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/contractor/job">
                <i className="fa fa-list"></i> Jobs
              </Link>
            </li>
            <li>
              <Link to="/contractor_logout">
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
      authenticated_contractor,
      account_profile,
      contractor_profile,
    } = this.props;


    return (
      <header className="header">
        <alertTop />
        {this.customerProfile()}
        {this.ContractorProfile()}
        <div className="header-top hidden-md-down">
          <nav>
            <div className="container">
              <div className="nav pull-left" id="header-top-left">
                <Link to="/" className="logo">
                  Mysscrow
                </Link>

                <div className="justify-content-start" id="mobile-navigation">
                  <ul className="ml-4 navbar-nav">
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
    authenticated_contractor: state.contractor.authenticated,
    account_profile: state.account.profile,
    contractor_profile: state.contractor.contractor_profile,
  };
}
export default connect(mapStateToProps, { getProfile, getContractorProfile })(
  CommonHeader
);
