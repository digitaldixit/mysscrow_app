import React,  { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { modal } from '../library/elements/modal';

import { addCustomService } from '../account/account_action';
import { validationNull, getServiceStatus, addServiceHistory } from './provider_action';
import { input, Loading, textarea ,InputImage } from '../library/elements';


class ModalAddTicketService extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading:false };
    this.handleForm = this.handleForm.bind(this);
  }

  componentWillMount() {

    this.props.getServiceStatus();
  }

  handleForm(formProps) {
    var service =  this.props.services.find((service) => {
      if(service.service_status_id == formProps.service_status_id){
        return service;
      }
    });
    var data = new FormData();
    var images = formProps.image;
    delete formProps.image;
    for(var mi in images){
      if(images[mi]['image'] !== undefined){
        data.append('history_image', images[mi]['image'][0]);
      }
    }
    formProps.service = service;
    formProps.service_id = this.props.service_id;
    formProps.ticket_id = this.props.ticket_id;
    for (var key in formProps) {
      data.append(key, JSON.stringify(formProps[key]));
    }
    this.setState({isLoading: true});
    var _this = this;
    this.props.addServiceHistory(data,this.props.ticket_service_id, function(err, result) {
      if(result) {
        _this.setState({isLoading: false});
        _this.props.removeModal();
      }
    });
  }

  closeModal(){
    this.props.removeModal();
  }

  renderServiceStatus(services){
    if(services) {
      return services.map((status) => {
        return(
          <option value={status.service_status_id} key={"service."+status.service_status_id}>{status.name}</option>
        );
      });
    } else {
      return (
        <option value="0">Loading...</option>
      )
    }
  }



  render() {
    const { handleSubmit, errorMessage, services  } = this.props;
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
    const addMoreImage = ({ fields, meta: { touched, error } }) => (
      <ul className="card-stripe-ul">
        {fields.map((item, index) =>
          <li key={"add_image_"+index} className="card-stripe-ul-li">
            <span className="badge badge-danger remove-image"
              onClick={() => fields.remove(index)}
              >
              <i className="fa fa-close"></i>
            </span>
            <Field name={`${item}.image`} type="text" component={InputImage} label="Image" className="form-control"/>
          </li>
        )}
        <li className="card-stripe-ul-li add_image" onClick={() => fields.push({})}><i className="fa fa-plus-circle fa-5x"></i></li>
      </ul>
    )
    return (
      <div className="cp-1">
        {isLoading ? <Loading /> : null  }
        <form onSubmit={handleSubmit(this.handleForm.bind(this))}>
          <fieldset className="form-group row">
            <div className="col-sm-12">
              <label className="control-label required">Select Status</label>
              <Field name="service_status_id" component={ service_status_id =>
                <div>
                  <select
                    name="service_status_id"
                    className="form-control"
                    value={service_status_id.input.value}
                    onChange={(event) => {
                      service_status_id.input.onChange(event.target.value);
                    }}
                  >
                  <option value="">-- Select --</option>
                  {this.renderServiceStatus(services)}
                  </select>
                  {service_status_id.meta.touched && ((service_status_id.meta.error && <div className="error">{service_status_id.meta.error}</div>) || (service_status_id.meta.warning && <div className="error">{service_status_id.meta.warning}</div>))}
                </div>
              } />
            </div>
          </fieldset>
          <fieldset className="form-group row">
            <div className="col-sm-12">
              <Field name="comment" type="text" component={textarea} isRequired={true} is_label={true} label="Comment"/>
            </div>
          </fieldset>
          <fieldset className="form-group row">
            <div className="cp-1">
              <div className="card-stripe">
                <FieldArray  name="image" component={addMoreImage} />
              </div>
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

  if(!formProps.comment){
    errors.comment = 'Required';
  }

  if (!formProps.service_status_id) {
    errors.service_status_id = 'Required';
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
    errorMessage: state.provider.error,
    services: state.provider.service_status,
  }
}
export default connect(mapStateToProps, { getServiceStatus, addServiceHistory ,addCustomService })(ModalAddTicketService);
