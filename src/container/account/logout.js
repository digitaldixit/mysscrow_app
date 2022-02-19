import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { signoutCustomer } from './account_action';

class AccountLogout extends Component {

  componentWillMount() {
    this.props.signoutCustomer();
  }

  render() {
    return (
      <div id="logout">
          <div className="container mb-3 mt-3">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="card-block">
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

function mapStateToProps(state) {
  return { errorMessage: state.account.error}
}

export default connect(null, { signoutCustomer })(AccountLogout)
