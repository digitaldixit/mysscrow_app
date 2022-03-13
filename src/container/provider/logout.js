import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';

import { providerlogout } from '../account/account_action';

class ProviderAccountLogout extends Component {

  componentWillMount() {
    this.props.providerlogout();
  }
  render() {
    return (
      <div id="logout">
          <div className="container mb-3 mt-3">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="card-body">
                    <div className="well text-muted text-center cart-empty sk-heading">
                      <i className="fa fa-shopping-basket fa-5x m-b-1 sk-heading"></i>
                        <h1 className="block-title large">Account Logout</h1>
                        <div className="description">You have been logged off your account. It is now safe to leave the computer.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
  }
}

export default connect(null, { providerlogout })(ProviderAccountLogout)
