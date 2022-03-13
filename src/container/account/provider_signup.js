import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { input,LoadingLarge } from '../library/elements';
import { contractorRegister } from './account_action';
var ReactRotatingText = require("react-rotating-text");
class ProviderSignup extends Component {
  constructor(props) {
  	super(props);
    this.state = { 
      isLoading:false,
      isPasswordText: false,
      isPasswordConfirmText: false,
     };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.authenticated){
      this.props.history.push('/provider_otp');
    }
  }

  componentWillReceiveProps(){
    this.state = { isLoading:false };
  }

  handleFormSubmit(formProps) {
    this.setState({isLoading: true});
    var _this = this;
    this.props.contractorRegister(formProps, function(err, result) {
      if(result) {
        _this.setState({ isLoading: false });
        _this.props.history.push('/provider_otp');
      }
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
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger p-3">
        <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }


  render() {
    const { handleSubmit} = this.props;
    var { isLoading, isPasswordText, isPasswordConfirmText } = this.state;

    return (
      <div id="content-container" className="signup">
      {isLoading ? <LoadingLarge /> : null}
      <div id="page-login">
        <div className="alc-bg-login cm-frm">
          <div className="row">
            <div className="col-sm-6 hidden-md-down d-none d-md-block">
              <div className="headings">
                <h1 className="alc-heading-xxl mt-3-minus alc-c-white">
                  Register Now <br />{" "}
                  <ReactRotatingText
                    items={["Contractor"]}
                    pause={1500}
                    emptyPause={1000}
                    typingInterval={100}
                    deletingInterval={100}
                  />
                </h1>
                <ul className="list-unstyled mt-4 alc-c-white ">
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
                  to="/provider_signin"
                  className={
                    "btn alc-btn  btn-primary alc-btn-shadow alc-btn-large"
                  }
                >
                  Login Now
                </Link>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card alc-card-form">
                <div className=" p-3 bg-transparent">
                  {" "}
                  <h3 className="alc-card-form-title m-0">Contractor Sign Up</h3>
                </div>
                <div className="card-body">
                 
                <form className="cm-frm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="signup-form df-form">
                        {this.renderAlert()}
                        <div className="card-body">
                          <div className="row form-group">
                            <div className="col-sm-6">
                              <Field name="firstname" type="text" component={input} label="* First Name" isBorderError={true} className="form-control"/>
                            </div>
                            <div className="col-sm-6">
                              <Field name="lastname" type="text" component={input} label="* Last Name" isBorderError={true} className="form-control"/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-sm-6 mb-3">
                              <Field name="email" type="text" component={input} label="* Email" isBorderError={true} className="form-control"/>
                            </div>
                              <div className="col-sm-6">
                                <Field name="phone" type="text" component={input} label="* Mobile or Phone" isBorderError={true} className="form-control"/>
                              </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-sm-12">
                              <Field name="address" type="text" component={input} label="* Address" isBorderError={true} className="form-control"/>
                            </div>
                          </div>
                          <div className=" row mb-3">
                          <div className="col-sm-6 form-group">
                            <div className="input-group">
                              {
                                isPasswordText
                                  ?
                                  <Field name="password" type="password"  component={input} label="* Password" className="form-control" />
                                  :
                                  <Field name="password" type="password" component={input} label="* Password" className="form-control" />
                              }
                              <button
                                type="button"
                                className="btn btn-sm btn-light password-mask shadow-none"
                                onClick={() => this.renderPasswordMask('isPasswordText')}
                              >
                                {isPasswordText ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}

                              </button>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="input-group">
                              {
                                isPasswordConfirmText
                                  ?
                                  <Field name="confirm_password"  type="text" component={input} label="* Confirm Password" className="form-control" />
                                  :
                                  <Field name="confirm_password"  type="password" component={input} label="* Confirm Password" className="form-control" />
                              }
                              <button
                                type="button"
                                className="btn btn-sm btn-light password-mask shadow-none"
                                onClick={() => this.renderConfirmPasswordMask('isPasswordConfirmText')}
                              >
                                {isPasswordText ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                              </button>
                            </div>
                          </div>
                        </div>
                          <div className="form-group">
                            <div className="col-sm-12 hidden-md-down">
                              <button action="signup" type="submit" className="btn btn-primary pull-right">SignUp</button>
                            </div>
                            <div className="col-sm-12 hidden-md-up p-0">
                              <button action="signup" type="submit" className="btn btn-primary pull-right btn-block">SignUp</button>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-12 text-center">

                            </div>
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
  const errors = {}
  if (!formProps.firstname) {
    errors.firstname = 'Required  First Name';
  }
  if (!formProps.lastname) {
    errors.lastname = 'Required  Last Name';
  }
  if (!formProps.address) {
    errors.address = 'Required  Address';
  }
  if (!formProps.email) {
    errors.email = 'Required Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid Email Address'
  }
  if (!formProps.phone) {
    errors.phone = 'Required Mobile';
  } else {
    var phoneno = /^\d{10}$/;
    if (isNaN(formProps.phone)) {
      errors.phone = 'Mobile number must be numeric only!';
    } else if(formProps.phone.length < 10){
      errors.phone = 'Mobile number must be in 10 digit!';
    } else if(!formProps.phone.match(phoneno)){
      errors.phone = 'Mobile number must be numeric only!';
    }
  }
  if (!formProps.password) {
    errors.password = 'Required Password'
  } else if (formProps.password.length < 6) {
    errors.password = 'Password must more than 6 characters'
  }
  if (!formProps.confirm_password) {
    errors.confirm_password = 'Required Confirm Password'
  }
  if(formProps.password != formProps.confirm_password) {
      errors.confirm_password = 'Confirm must match to Password'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    errorMessage: state.account.error,

  }
}

ProviderSignup = reduxForm({
  form: 'provider_signup',
  validate: validate
})(ProviderSignup);

export default connect(mapStateToProps, { contractorRegister})(ProviderSignup);
