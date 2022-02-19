import React,  { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field,reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { modal } from '../library/elements/modal';


import { validationNull, getServices, addCustomService } from './account_action';
import { input, Loading, textarea  } from '../library/elements';


class ModalAddTicketService extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading:false };
  }

  componentWillMount() {

    this.props.getServices();
  }

  handleForm(formProps) {
    var service =  this.props.services.find((service) => {
      if(service.service_id == formProps.service_id){
        return service;
      }
    });
    formProps.service = service;
    //console.log("formProps>>>>>>", formProps);return false;
    this.setState({isLoading: true});
    var _this = this;
    this.props.addCustomService(formProps, function(err, result) {
      if(result) {
        _this.setState({isLoading: false});
        _this.props.removeModal();
      }
    });
  }

  closeModal(){
    this.props.removeModal();
  }

  renderServices(services){
    if(services) {
      return services.map((service) => {
        return(
          <option value={service.service_id} key={"service."+service.service_id}>{service.name}</option>
        );
      });
    } else {
      return (
        <option value="0">Loading...</option>
      )
    }
  }

  render() {
    const { handleSubmit, errorMessage, services } = this.props;
    var isLoading = this.state.isLoading;

    if(errorMessage){
      isLoading = false;
    }
    if(!services){
      return (
        <div className="p-1">
          <Loading />
        </div>
      )
    }
    return (
      <div className="cp-1">
        {isLoading ? <Loading /> : null  }
        <form onSubmit={handleSubmit(this.handleForm.bind(this))}>
          <fieldset className="form-group row">
            <div className="col-sm-12">
              <Field name="title" type="text" component={input} isRequired={true}  label="Title"/>
            </div>
          </fieldset>
          <fieldset className="form-group row">
            <div className="col-sm-12">
              <Field name="description" type="text" component={textarea} isRequired={true} label="Description"/>
            </div>
          </fieldset>
          <fieldset className="form-group row">
            <div className="col-sm-12">
              <label className="control-label required">Select Service</label>
              <Field name="service_id" component={ service_id =>
                <div>
                  <select
                    name="service_id"
                    className="form-control"
                    value={service_id.input.value}
                    onChange={(event) => {
                      service_id.input.onChange(event.target.value);
                    }}
                  >
                  <option value="">-- Select --</option>
                  {this.renderServices(services)}
                  </select>
                  {service_id.meta.touched && ((service_id.meta.error && <div className="error">{service_id.meta.error}</div>) || (service_id.meta.warning && <div className="error">{service_id.meta.warning}</div>))}
                </div>
              } />
            </div>
          </fieldset>
          <div className="form-group row">
            <div className="col-sm-8">
              <button
                type="submit"
                action="formaddticketservice"
                disabled={isLoading}
                className="btn btn-primary btn-block mb-2">
                  { isLoading ? 'Loading...' : 'Save'}
              </button>
            </div>
            <div className="col-sm-4">
              <button className="btn btn-danger btn-block" onClick={() => this.closeModal()}>Cancel</button>
            </div>

          </div>
        </form>
      </div>
   );
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.title) {
    errors.title = 'Required';
  }

  if(!formProps.description){
    errors.description = 'Required';
  }

  if (!formProps.service_id) {
    errors.service_id = 'Required';
  }

  return errors;
}

ModalAddTicketService = reduxForm({
  form: 'formaddticketservice',
  enableReinitialize: true,
  validate: validate
})(ModalAddTicketService);

function mapStateToProps(state, ownProps) {

  return {
    errorMessage: state.catalog.error,
    services: state.account.services,
  }
}
export default connect(mapStateToProps, { getServices, addCustomService })(ModalAddTicketService);
