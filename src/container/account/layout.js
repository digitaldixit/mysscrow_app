
import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import AccountTicket from "./recent_ticket";
import AccountLogin from './signin';
import TitLeBox from './titlebox';

class Layout extends Component {

  render() {
    const { account_profile } = this.props;

    if(!cookie.load('customer')){
      return <AccountLogin />;
    }
    
    return (
      <div className="account-layout account-box">
        <TitLeBox {...this.props} />
        <AccountTicket/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account_profile: state.account.profile,
  };
}

export default connect(mapStateToProps)(Layout);
