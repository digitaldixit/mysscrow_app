import React,  { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { otplogin } from './account_action';
import { modal } from '../library/elements/modal';
import { input, LoadingLarge } from '../library/elements';
import AccountFrogotPassword from '../account/model_forgotten';

class AccountOTPLogin extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading:false, isError: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

    componentWillMount(){
      if(this.props.authenticated == true && this.props.account_profile != undefined){
        // browserHistory.push('/account');
      }
    }
    handleFormSubmit(formProps) {
      this.setState({ isError: '' });
      this.setState({ isLoading: true });
      var _this = this;
      this.props.otplogin(formProps, function(err, result) {
        if(!result) {
          _this.setState({ isLoading: false });
        } else {
        //  browserHistory.push('/account');
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

  addForpgotPasswordModal() {
  modal.add(AccountFrogotPassword, {
    title: "Forgot Password",
    size: 'large',
    closeOnOutsideClick: false,
    hideCloseButton: false,
    modalId: 'forgot-password',
  });
  }
  render() {

    const { handleSubmit, authenticated,errorMessage } = this.props;
    let isLoading = this.state.isLoading;
    let isError = this.state.isError;

    if(errorMessage){
      isLoading = false;
    }
    return (
    <div id="content-container" className="cm-frm signup pt-5 pb-5">
        { isLoading ? <LoadingLarge /> : null }
        <div className="account-banner">

          <div className="container">
            <div className="row">
              <div className="col-sm-3 hidden-lg-down"></div>
              <div className="col-sm-6">
                <div className="card">

                      <div className="card-header"><h5 className="m-0"> Resident Sign In</h5></div>
                      <div className="card-block">
                        {
                          errorMessage
                          ?
                          <div className="form-group">
                            <div className="col-sm-12 p-0">
                              <div className="alert alert-warning">{errorMessage}</div>
                            </div>
                          </div>
                          :
                          null
                        }
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                          <div className="form-group">
                            <div className="col-sm-12 p-0 position-relative has-icon-left">
                              <label><strong>Mobile phone number</strong></label>
                                <Field name="phone" type="text" icon="fa fa-phone"  component={input}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-12 p-0">
                              <button
                                type="submit"
                                action="signin"
                                disabled={isLoading}
                                className="btn  btn-block  btn-primary btn-submit">
                                  { isLoading ? 'Loading...' : 'Continue'}
                              </button>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-12 text-center">
                                  <Link className="form-link" to="/signup"><h6>Signup Now</h6></Link>
                            </div>
                          </div>
                        </form>

                  </div>
                </div>
                <p className="line-on-side text-muted text-center font-small-3 sk-headin mt-4"><span>or</span></p>
                <div className="form-group row mb-0">
                  <div className="col-sm-12 text-center">
                        <Link className="form-link" to="/signin"><h6>Signin with Password</h6></Link>
                  </div>
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
  if (!formProps.phone) {
    errors.phone = 'Enter your mobile number'
  }
  return errors
}

AccountOTPLogin = reduxForm({
  form: 'signin',
  validate: validate
})(AccountOTPLogin);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
    authenticated: state.account.authenticated
  }
}

export default connect(mapStateToProps, { otplogin })(AccountOTPLogin);
