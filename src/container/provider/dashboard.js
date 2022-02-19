
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../library/elements';
import ProviderTicket from './recent_ticket';
class ProviderAccountDashboard extends Component {

  constructor() {
  	super();
    this.state = { isLoading:false };
  }

  componentWillMount() {
  }
  render() {

    const { provider_profile } = this.props;
    const isLoading = this.state.isLoading;

    if(!provider_profile) {
      return (
        <Loading />
      );
    }

    return (
      <div id="provider-content">
        <div className="container dashboard-page">
          <div className="account-box">
              <div className="container">
              <div className="row">
                <div className="col-sm-12 p-0">
                    <ProviderTicket/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    provider_profile: state.account.provider_profile,
  };
}

export default connect(mapStateToProps)(ProviderAccountDashboard);
