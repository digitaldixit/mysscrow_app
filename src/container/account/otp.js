import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { input, Loading } from '../library/elements';
import { loginOTP, resendOTP } from './account_action';

class AccountOtp extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading:false, isError: '', currentPage:"1" };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount(){
    if(!this.props.login_phone){
    //  browserHistory.push('/otp_signin');
    }
  }

  handleFormSubmit(formProps) {
    this.setState({ isLoading: true });
    this.setState({ isError: '' });
    var _this = this;
  formProps.phone = this.props.login_phone;
    this.props.loginOTP(formProps, function(err, result) {
      if(result.error) {
        _this.setState({ isLoading: false });
        _this.setState({ isError: result.error });
      } else {
        _this.props.history.push('/');
      }
    });
  }

  resendOTP(){
    this.setState({ isLoading: true });
    this.setState({ isError: '' });
    var _this = this;
    var phone = this.props.login_phone;
    this.props.resendOTP(phone, function(err, result) {
      if(result) {
        _this.props.reset('accountotp');
        _this.setState({ isLoading: false });
      }
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      this.setState({ isButtonLoading: false });
      return (
        <div className="alert alert-danger m-b-1">
        <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  changeCurrentPage(page){
    this.setState({currentPage : page});
  }

  render() {

    const { handleSubmit, authenticated, alert, login_phone } = this.props;
    let isLoading = this.state.isLoading;
    let isError = this.state.isError;
    let currentPage = this.state.currentPage;

    return (
      <div id="content-container" className="cm-frm signup pt-5 pb-5">
        { isLoading ? <Loading /> : null }
        <div className="account-banner">
          <div className="container">
            <div className="row">
              <div className="col-sm-3 hidden-lg-down"></div>
              <div className="col-sm-6">
                <div className="card">

                  <div className="card-header text-center">
                    <h5 className="pseudo_border m-0">Login with OTP</h5>
                  </div>
                  <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="card-block">
                      {
                        isError
                        ?
                        <div className="form-group">
                          <div className="col-sm-12">
                            <div className="alert alert-warning">{isError}</div>
                          </div>
                        </div>
                        :
                        null
                      }
                      {this.renderAlert()}
                      <p className="card-text">
                        One Time Passcode (OTP) is a numeric code that is only valid for a one time activation when you signup.
                        The OTP will be sent via SMS to your mobile  phone number as registered with Mysscrow.
                        It will expire in 2 minutes.
                        Please enter the OTP below to verify your mobile
                      </p>
                        <label><strong>Enter OTP</strong></label>
                      <div className="form-group row">
                        <div className="col-sm-12 position-relative has-icon-left">
                          <Field name="otp" type="text" icon="fa fa-phone" component={input} label="OTP"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12 position-relative has-icon-left">
                          <Link className="form-link" onClick={() => this.resendOTP()} ><h6>Resend OTP</h6></Link>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-12">
                          <button
                            type="submit"
                            action="accountotp"
                            disabled={isLoading}
                            className="btn btn-outline-zoom btn-block">
                              <i className="fa fa-check-square-o"></i>  { isLoading ? 'Loading...' : 'Validate OTP'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
                <div className="col-sm-3 hidden-lg-down"></div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.otp) {
    errors.otp = 'Required OTP';
  } else {
    if (isNaN(formProps.otp)) {
      errors.otp = 'OTP  must be numeric only!';
    } else if(formProps.otp.length > 6){
      errors.otp = 'OTP  must be up to 6 digit!';
    }
  }

  return errors
}

AccountOtp = reduxForm({
  form: 'accountotp',
  validate: validate
})(AccountOtp);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
    authenticated: state.account.authenticated,
    login_phone: state.account.login_phone,
  }
}

export default connect(mapStateToProps, { loginOTP, resendOTP })(AccountOtp);
