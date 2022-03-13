import React, { Component } from "react";

import { connect } from "react-redux";
import { Link,withRouter  } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import AccountFrogotPassword from "../account/model_forgotten";
import { input, LoadingLarge } from "../library/elements";
import { modal } from "../library/elements/modal";
import { login } from "./account_action";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, isError: "" };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit(formProps) {
    this.setState({ isError: "" });
    this.setState({ isLoading: true });
    var _this = this;
    this.props.login(formProps, function (err, result) {
      if (!result) {
        _this.setState({ isLoading: false });
      }else if (result === "OTP") {
        _this.props.history.push("/otp");
        _this.setState({ isLoading: false });
      } else {
        _this.props.history.push("/account");
        _this.setState({ isLoading: false });
      }
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      this.setState({ isButtonLoading: false });
      return (
        <div className="alert alert-danger m-b-1">
          <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  addForpgotPasswordModal() {
    //console.log("======");
    modal.add(AccountFrogotPassword, {
      title: "Forgot Password",
      size: "large",
      closeOnOutsideClick: false,
      hideCloseButton: false,
      modalId: "forgot-password",
    });
  }
  render() {
    const { handleSubmit, authenticated, errorMessage } = this.props;
    let isLoading = this.state.isLoading;
    let isError = this.state.isError;

    if (errorMessage) {
      isLoading = false;
    }
    return (
      <div id="content-container" className="cm-frm signup pt-5 pb-5">
        {isLoading ? <LoadingLarge /> : null}
        <div className="card">
          <div className="card-header bg-white">
            <h5 className="m-0"> Sign In</h5>
          </div>
          <div className="card-body">
      
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="form-group">
                <div className="col-sm-12 p-0 position-relative has-icon-left">
                  <Field
                    name="email"
                    type="text"
                    component={input}
                    label="Email/Phone"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12 p-0 position-relative has-icon-left">
                  <Field
                    name="password"
                    type="password"
                    component={input}
                    label="Password"
                  />
                </div>
              </div>
              <div className="form-group row text-right">
                <div className="col-sm-12">
                  <Link
                    className="form-link"
                    onClick={() => this.addForpgotPasswordModal()}
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12 p-0">
                  <button
                    type="submit"
                    action="signin"
                    disabled={isLoading}
                    className="btn  btn-primary btn-submit"
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                  </button>
                </div>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Required Email/Phone";
  }
  if (!formProps.password) {
    errors.password = "Required Password";
  }
  return errors;
}

SignIn = reduxForm({
  form: "signin",
  validate: validate,
})(SignIn);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
    authenticated: state.account.authenticated,
  };
}


export default withRouter(connect(mapStateToProps, { login })(
(SignIn)
));