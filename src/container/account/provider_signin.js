import React, { Component } from "react";
import cookie from 'react-cookie';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { input, LoadingLarge } from "../library/elements";
import { provider_login } from "./account_action";
var ReactRotatingText = require("react-rotating-text");

class ProviderAccountLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, isError: "" };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentWillMount() {
    if (
      cookie.load('provider')  ||
      this.props.provider_profile != undefined
    ) {
      this.props.history.push("/provider");
    }
  }

  handleFormSubmit(formProps) {
    //console.log("formProps>>>>>>>", formProps);return false;
    this.setState({ isError: "" });
    this.setState({ isLoading: true });
    var _this = this;
    this.props.provider_login(formProps, function (err, result) {
      if (!result) {
        _this.setState({ isLoading: false });
      } else {
        _this.props.history.push("/provider");
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

  render() {
    const { handleSubmit, authenticate_provider, errorMessage } = this.props;
    let isLoading = this.state.isLoading;
    let isError = this.state.isError;

    if (errorMessage) {
      isLoading = false;
    }
    return (
      <div id="content-container" className="signup">
        {isLoading ? <LoadingLarge /> : null}
        <div id="page-login">
          <div className="alc-bg-login cm-frm">
            <div className="row">
              <div className="col-sm-8 hidden-md-down d-none d-md-block">
                <div className="headings">
                  <h1 className="alc-heading-xxl mt-3-minus alc-c-white">
                    Login Now <br />{" "}
                    <ReactRotatingText
                      items={["Contractor"]}
                      pause={1500}
                      emptyPause={1000}
                      typingInterval={100}
                      deletingInterval={100}
                    />
                  </h1>
                  <ul className="list-unstyled mt-4 alc-c-white">
                    <li className="mb-4">
                      <i className="alc-fa alc-icon-box fa fa-check alc-bg-primary mr-2"></i>
                      <span className="alc-font-1-3 ms-2">
                        Next Generation Service Provider System
                      </span>
                    </li>
                    <li className="mb-4">
                      <i className="alc-fa alc-icon-box fa fa-check alc-bg-primary mr-2"></i>
                      <span className="alc-font-1-3 ms-2">
                        Smart Service Provider Management System
                      </span>
                    </li>
                    <li className="mb-4">
                      <i className="alc-fa alc-icon-box fa fa-check alc-bg-primary mr-2"></i>
                      <span className="alc-font-1-3 ms-2">Ready to Change</span>
                    </li>
                    <li className="mb-4">
                      <i className="alc-fa alc-icon-box fa fa-check alc-bg-primary mr-2"></i>
                      <span className="alc-font-1-3 ms-2">
                        FREE Sign Up, Get Service
                      </span>
                    </li>
                  </ul>
                  <Link
                    to="/provider_signup"
                    className={
                      "btn alc-btn  btn-primary alc-btn-shadow alc-btn-large"
                    }
                  >
                    Register Now
                  </Link>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card alc-card-form">
                  <div className=" p-3 bg-transparent">
                    {" "}
                    <h3 className="alc-card-form-title m-0">
                      Contractor Signin
                    </h3>
                  </div>
                  <div className="card-body">
                    {errorMessage ? (
                      <div className="form-group">
                        <div className="col-sm-12">
                          <div className="alert alert-warning p-3">
                            {errorMessage}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <form className="cm-frm"
                      onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    >
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
                      <div className="form-group">
                        <div className="col-sm-12 p-0">
                          <button
                            type="submit"
                            action="signin"
                            disabled={isLoading}
                            className="btn  btn-block  btn-primary btn-submit"
                          >
                            {isLoading ? "Loading..." : "Sign In"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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

ProviderAccountLogin = reduxForm({
  form: "provider_signin",
  validate: validate,
})(ProviderAccountLogin);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
    authenticate_provider: state.account.authenticate_provider,
  };
}

export default connect(mapStateToProps, { provider_login })(
  ProviderAccountLogin
);
