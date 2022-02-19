import React,  { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from './account_action';
import { modal } from '../library/elements/modal';
import { input, LoadingLarge } from '../library/elements';
import AccountFrogotPassword from '../account/model_forgotten';
import cookie from 'react-cookie';
class AccountLogin extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading:false, isError: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

    componentDidMount(){
      if(cookie.load('customer') ||  this.props.account_profile != undefined){
        this.props.history.push('/account');
      }
      
    }
    handleFormSubmit(formProps) {
      this.setState({ isError: '' });
      this.setState({ isLoading: true });
      var _this = this;
      this.props.login(formProps, function(err, result) {
        if(!result) {
          _this.setState({ isLoading: false });
        } else {
          _this.props.history.push('/account');
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
  //console.log("======");
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

                      <div className="card-header"><h5 className="m-0"> Customer Sign In</h5></div>
                      <div className="card-block">
                        {
                          errorMessage
                          ?
                          <div className="form-group">
                            <div className="col-sm-12">
                              <div className="alert alert-warning">{errorMessage}</div>
                            </div>
                          </div>
                          :
                          null
                        }
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                          <div className="form-group">
                            <div className="col-sm-12 p-0 position-relative has-icon-left">
                                <Field name="email" type="text"  component={input} label="Email/Phone"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-12 p-0 position-relative has-icon-left">
                              <Field name="password" type="password"  component={input} label="Password"/>
                            </div>
                          </div>
                          <div className="form-group row text-right">
                            <div className="col-sm-12">
                               <Link  className="form-link"  onClick={() => this.addForpgotPasswordModal()}>Forgot Password</Link>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-12 p-0">
                              <button
                                type="submit"
                                action="signin"
                                disabled={isLoading}
                                className="btn  btn-block  btn-primary btn-submit">
                                  { isLoading ? 'Loading...' : 'Sign In'}
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
  if (!formProps.email) {
    errors.email = 'Required Email/Phone'
  }
  if (!formProps.password) {
    errors.password = 'Required Password'
  }
  return errors
}

AccountLogin = reduxForm({
  form: 'signin',
  validate: validate
})(AccountLogin);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
    authenticated: state.account.authenticated
  }
}

export default connect(mapStateToProps, { login })(AccountLogin);
