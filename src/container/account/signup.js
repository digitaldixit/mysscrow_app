import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { input, LoadingLarge } from "../library/elements";
import { register } from "./account_action";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isPasswordText: false,
      isPasswordConfirmText: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push("/otp");
    }
  }

  componentWillReceiveProps() {
    this.state = { isLoading: false };
  }

  handleFormSubmit(formProps) {
    this.setState({ isLoading: true });
    var _this = this;
    this.props.register(formProps, function (err, result) {
      _this.props.history.push("/otp");
    });
  }

  renderPasswordMask(getState) {
    if (this.state[getState] === false) {
      this.setState({ [getState]: true });
    } else {
      this.setState({ [getState]: false });
    }
  }
  renderConfirmPasswordMask(getState) {
    if (this.state[getState] === false) {
      this.setState({ [getState]: true });
    } else {
      this.setState({ [getState]: false });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    var { isLoading, isPasswordText, isPasswordConfirmText } = this.state;

    return (
      <div id="content-container" className="cm-frm signup pt-5 pb-5">
        {isLoading ? <LoadingLarge /> : ""}
        <div className="card">
          <div className="card-header bg-white">
            <h5 className="m-0"> Sign up</h5>
          </div>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
            className="signup-form df-form"
          >
            <div className="card-body">
              <div className="row form-group">
                <div className="col-sm-6">
                  <Field
                    name="firstname"
                    type="text"
                    component={input}
                    label="* First Name"
                    isBorderError={true}
                    className="form-control"
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastname"
                    type="text"
                    component={input}
                    label="* Last Name"
                    isBorderError={true}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-6 mb-3">
                  <Field
                    name="email"
                    type="text"
                    component={input}
                    label="* Email"
                    isBorderError={true}
                    className="form-control"
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="phone"
                    type="text"
                    component={input}
                    label="* Mobile or Phone"
                    isBorderError={true}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-12">
                  <Field
                    name="address"
                    type="text"
                    component={input}
                    label="* Address"
                    isBorderError={true}
                    className="form-control"
                  />
                </div>
              </div>
              <div className=" row mb-3">
                <div className="col-sm-6 form-group">
                  <div className="input-group">
                    {isPasswordText ? (
                      <Field
                        name="password"
                        type="text"
                        component={input}
                        label="* Password"
                        className="form-control"
                      />
                    ) : (
                      <Field
                        name="password"
                        type="password"
                        component={input}
                        label="* Password"
                        className="form-control"
                      />
                    )}
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={() => this.renderPasswordMask("isPasswordText")}
                    >
                      {isPasswordText ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="input-group">
                    {isPasswordConfirmText ? (
                      <Field
                        name="confirm_password"
                        type="text"
                        component={input}
                        label="* Confirm Password"
                        className="form-control"
                      />
                    ) : (
                      <Field
                        name="confirm_password"
                        type="password"
                        component={input}
                        label="* Confirm Password"
                        className="form-control"
                      />
                    )}
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={() =>
                        this.renderConfirmPasswordMask("isPasswordConfirmText")
                      }
                    >
                      {isPasswordConfirmText ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12">
                  <button
                    action="signup"
                    type="submit"
                    className="btn btn-outline-primary"
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.firstname) {
    errors.firstname = "Required  First Name";
  }
  if (!formProps.lastname) {
    errors.lastname = "Required  Last Name";
  }
  if (!formProps.address) {
    errors.address = "Required  Address";
  }
  if (!formProps.email) {
    errors.email = "Required Email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
  ) {
    errors.email = "Invalid Email Address";
  }
  if (!formProps.phone) {
    errors.phone = "Required Mobile";
  } else {
    var phoneno = /^\d{10}$/;
    if (isNaN(formProps.phone)) {
      errors.phone = "Mobile number must be numeric only!";
    } else if (formProps.phone.length < 10) {
      errors.phone = "Mobile number must be in 10 digit!";
    } else if (!formProps.phone.match(phoneno)) {
      errors.phone = "Mobile number must be numeric only!";
    }
  }
  if (!formProps.password) {
    errors.password = "Required Password";
  } else if (formProps.password.length < 6) {
    errors.password = "Password must more than 6 characters";
  }
  if (!formProps.confirm_password) {
    errors.confirm_password = "Required Confirm Password";
  }
  if (formProps.password != formProps.confirm_password) {
    errors.confirm_password = "Confirm must match to Password";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    errorMessage: state.account.error,
  };
}

Signup = reduxForm({
  form: "signup",
  validate: validate,
})(Signup);

export default withRouter(connect(mapStateToProps, { register })(Signup));
