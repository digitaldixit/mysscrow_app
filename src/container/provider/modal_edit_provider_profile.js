import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { IMAGE_URL } from '../../system/config';
import { updateProviderProfile } from '../account/account_action';
import { input } from '../library/elements';
class UpdateProfile extends Component {

  constructor(props) {
    super(props);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.removeModal = this.handleProfileSubmit.bind(this);
    this.state = {
      isLoading:false,
      isPasswordText: false,
      isPasswordConfirmText: false
    };
  }

  handleProfileSubmit(formProps) {
      var _this = this;
    this.state = { isLoading:true };
    this.props.updateProviderProfile(formProps, function(err, result) {

      if(result) {
        _this.props.removeModal();
      }
    });
  }
  closeModal(){
    this.props.removeModal();
  }



  addDefaultSrc(ev){
    return ev.target.src = IMAGE_URL+'/'+'profile/User-default-image-boy.png';
  }

  renderPasswordMask(getState){
    if(this.state[getState] == false){
      this.setState({[getState] : true});
    } else {
      this.setState({[getState] : false});
    }
  }
  renderConfirmPasswordMask(getState){
    if(this.state[getState] == false){
      this.setState({[getState] : true});
    } else {
      this.setState({[getState] : false});
    }
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    var { isLoading, isPasswordText, isPasswordConfirmText  } = this.state;

    if(errorMessage){
      isLoading = false;
    }

    return (
      <div className="profile-modal model-card cm-frm">
        <form onSubmit={handleSubmit(this.handleProfileSubmit.bind(this))} className="df-form">
          {
            errorMessage
            ?
            <fieldset className="form-group">
              <div className="col-sm-12 card-body">
                <div className="alert alert-danger">
                  { errorMessage }
                </div>
              </div>
            </fieldset>
            :
            null
          }

          <div className="cp-1">
            <div className="form-group row">
              <div className="col-sm-6">
                <Field name="firstname" type="text" component={input}  label="First Name" className="form-control"/>
              </div>
              <div className="col-sm-6">
                <Field name="lastname" type="text" component={input}  label="Last Name" className="form-control"/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3">
                <Field name="email" type="text" component={input}  label="Email" className="form-control"/>
              </div>
              <div className="col-sm-6">
                <Field name="phone" type="text" component={input}  label="Mobile or Phone" className="form-control"/>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12">
                  {
                    isPasswordText
                    ?
                    <Field name="password" type="text" component={input} label="* Password" className="form-control"/>
                    :
                    <Field name="password" type="password" component={input} label="* Password" className="form-control"/>
                  }
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary password-mask"
                    onClick={() => this.renderPasswordMask('isPasswordText')}
                  >
                  { isPasswordText ? 'Hide' : 'Show' }
                  </button>
              </div>

            </div>
            <div className="form-group row">
              <div className="col-sm-9">
                <button action="updateprofile" type="submit" disabled={isLoading} className="md-btn btn btn btn-primary btn-block mb-2">
                  <i className="fa fa-pencil-circle"></i> {isLoading ? 'Loading...' : 'Update'}
                </button>
              </div>
              <div className="col-sm-3">
                <button onClick={() => this.closeModal()} type="button" className="md-btn btn btn-danger btn-block">Cancel</button>
              </div>

            </div>

          </div>
        </form>
      </div>
  );
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.firstname) {
    errors.firstname = 'Required First Name';
  }
  if (!formProps.lastname) {
    errors.lastname = 'Required Last Name';
  }
  if (!formProps.email) {
    errors.email = 'Required Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid Email Address'
  }

  if (!formProps.telephone) {
    errors.telephone = 'Required Mobile';
  } else {
    if (isNaN(formProps.telephone)) {
      errors.telephone = 'Mobile number must be numeric only!';
    } else if(formProps.telephone.length > 10){
      errors.telephone = 'Mobile number must be up to 10 digit!';
    }
  }

  if((formProps.password && formProps.confirm_password) && (formProps.password != formProps.confirm_password)) {
      errors.confirm_password = 'Confirm must match to Password'
  }


  return errors;
}

function mapStateToProps(state) {
  var iniCus={};
  if(state.account.provider_profile){
    iniCus = state.account.provider_profile;
  }
  return {
    initialValues: iniCus,
    errorMessage: state.account.error,
  }
}

UpdateProfile = reduxForm({
  form: 'updateprofile',
  validate: validate
})(UpdateProfile);

export default connect(mapStateToProps, {updateProviderProfile })(UpdateProfile);
