import React, { Component } from "react";
import SignIn from "./signin";
import Signup from "./signup";
import contractor from "../../images/contractor.jpg";
import cookie from "react-cookie";
import { connect } from "react-redux";
import { validationNull } from "./contractor_action";
class Contractor extends Component {
  
  componentDidMount() {
    this.props.validationNull();
    if (cookie.load("contractor")) {
      this.props.history.push("/contractor_account");
    }
  }

  render() {
    const {errorMessage } = this.props;
    var background_image = {
      background:
        "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" +
        contractor +
        ") center center no-repeat",
      backgroundSize: "cover",
      textAlign: "center",
    };

    return (
      <div id="page" className="customer customer-login-register">
        <div className="top-banner" style={background_image}>
          <div className="col-sm-12 body-banner">
            <h1 className="title">Contractor</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {errorMessage ? (
              <>
                <div className="col-sm-3"></div>
                <div className="col-sm-6 pt-4">
                  <div className="alert alert-warning">{errorMessage}</div>
                </div>
                <div className="col-sm-3"></div>
              </>
            ) : null}
            <div className="col-sm-6">
              <div className="customer-block sign-in">
                <SignIn />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="customer-block sign-up">
                <Signup />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
  };
}
export default connect(mapStateToProps,{validationNull})(Contractor);
