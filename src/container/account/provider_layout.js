import { connect } from "react-redux";
import React, { Component } from "react";
import ProviderTitleBox from "../provider/titlebox";
import ProviderAccountLogin from "./provider_signin";
import ProviderTicket from "../provider/recent_ticket";

import cookie from "react-cookie";
import { Loading } from "../library/elements";

class ProviderLayout extends Component {
  render() {
    const { provider_profile } = this.props;
    console.log("---cookie.load",cookie.load("provider"))
    if (!cookie.load("provider")) {
      return <ProviderAccountLogin />;
    }

    if (cookie.load("provider") && this.props.provider_profile == undefined) {
      return (
        <div className="account-layout-loading">
          <div className="row">
            <div className="col-sm-12">
              <Loading />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="account-layout account-box provider-ui">
        <ProviderTitleBox {...this.props} />
        <div class="container">
          {" "}
          <ProviderTicket />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    provider_profile: state.account.provider_profile,
  };
}

export default connect(mapStateToProps)(ProviderLayout);
