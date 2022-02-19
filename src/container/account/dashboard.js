
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../library/elements';
import AccountOrder from './recent_ticket';
class AccountDashboard extends Component {

  constructor() {
  	super();
    this.state = { isLoading:false };
  }


  render() {

    const { account_profile } = this.props;
    const isLoading = this.state.isLoading;

    if(!account_profile) {
      return (
        <Loading />
      );
    }

    return (
      <div className="account-box">
          <div className="container">
          <div className="row">
            <div className="col-sm-12">
                <AccountOrder/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account_profile: state.account.profile,
  };
}

export default connect(mapStateToProps)(AccountDashboard);
