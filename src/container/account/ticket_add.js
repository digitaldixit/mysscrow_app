import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { modal } from '../library/elements/modal';

import { validationNull, getServices, addTicket, nullCustomService, removeCustomService } from './account_action';
import { Loading, lib, InputImage } from '../library/elements';


import ModalAddTicketService from './modal_add_ticket_service';

class AccountTicketAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderCustomService = this.renderCustomService.bind(this);
  }

  componentWillMount() {
    console.log("-------AccountTicketAdd")
    this.props.getServices();
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

  handleFormSubmit(formProps){
    //console.log("formProps>>>>>>>", formProps);
    this.setState({ isLoading: true });
    var _this = this;
    var custom_services = this.props.custom_services;
    /*for(var i in custom_services){
      if(formProps['custom_service'][i] != undefined && formProps['custom_service'][i]['image']){
        custom_services[i]['image'] = formProps['custom_service'][i]['image'];
      }
    }*/
    //console.log("custom_services>>>>>>>", custom_services);return false;

    //console.log("formProps>>>>>>", formProps);return false;
    var data = new FormData();
    var images = formProps['custom_service'];
    //console.log("images>>>>>>",images);
    for(var mi in images){
      //console.log("images[mi]['image']>>>>>>>", images[mi]['image']);
      for(var i in images[mi]['image']){
        //console.log("images[mi]['image'][i][['image']]>>>>>>>", images[mi]['image'][i][['image']]);
        //data.append('ticket', images[mi]['image'][i]['image'][0], 'test');
        if(images[mi]['image'][i][['image']] !== undefined){
          data.append('custom_service['+mi+']', images[mi]['image'][i]['image'][0]);
        }
      }
    }
    data.append('custom_service', JSON.stringify(custom_services));
    this.props.addTicket(data, function(err, result) {
      if(result) {
        _this.props.nullCustomService();
        _this.setState({ isLoading: false });
        // browserHistory.push("/account/ticket");
      }
    });
  }

  renderRemoveCustomService(index){
    this.props.removeCustomService(index, function(err, result) {
      if(result) {
        this.setState({isLoading: false});
      }
    });
  }

  renderCustomService(addMoreImage){
    if(this.props.custom_services.length > 0){
      return this.props.custom_services.map((custom_service, index) => {
        return (
          <div className="card card-add-service mt-2 mb-2" key={"service.card."+index}>
            <div className="card-header">
              <strong>Service #{index+1}</strong>
              <button
                type="button"
                className="btn btn-sm btn-danger pull-right"
                onClick={()=>this.renderRemoveCustomService(index) }
              >
                Remove
              </button>
            </div>

            <div className="cp-1 mt-3">
                <strong><span className="badge badge-dark">{custom_service.service.name}</span> :  <span className="btn-outine">{custom_service.title}</span></strong>
                  <h5 className="card-title">

                  </h5>
                  <div className="card-comment mt-2">
                      <p className="card-subtitle  text-muted">
                        {custom_service.description}
                      </p>
                 </div>
            </div>
              <div className="cp-1">
                  <div className="card-header bg-wihte mb-1">
                      <strong> Images  </strong>
                  </div>
                  <div className="cp-1">
                    <div className="card-stripe">
                      <FieldArray name={"custom_service["+index+"][image]"} component={addMoreImage} />
                    </div>
                  </div>
                </div>
            </div>
        )
      });
    } else {
      return (
        <div className="mt-3 mb-3 card-step">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 mobile-center">
              <h4>Step 1 : Add Your Multiple Services</h4>
              <h4>Step 2 : Add Related Images</h4>
              <h4>Step 3 : Create Ticket</h4>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      )
    }
  }

  renderModalAddService(){
    modal.add(ModalAddTicketService, {
      title: 'Add Your Service',
      size: 'large',
      closeOnOutsideClick: false,
      hideCloseButton: false,
    });
  }

  render() {
    const { handleSubmit, services, custom_services  } = this.props;
    var { isLoading } = this.state;

    if(!services){
      return(
        <div className="task-add-undefined"><Loading /></div>
      );
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
      <div id="task-box" className="container mb-3 mt-3">
        <div className="card">
        {isLoading ? <Loading /> : null  }
        <div className="card-header bg-wihte">
          <strong>All Services</strong>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          { this.renderCustomService(addMoreImage)}
          <div className="row ">
              <div className="col-sm-3"></div>
            <div className="col-sm-3">
              <button type="button" className="custom-merchant-strip btn btn-primary btn-block mb-2" onClick={() => this.renderModalAddService()} >Add Service </button>
            </div>
            {
              (custom_services.length > 0)
              ?
              <div className="col-sm-3">
                <button
                  type="submit"
                  action="addTask"
                  disabled={isLoading}
                  className="btn btn-block btn-success">
                    { isLoading ? 'Loading...' : 'Add Ticket'}
                </button>
              </div>
              :
              null
            }
              <div className="col-sm-3"></div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.question) {
    errors.question = 'Required Question';
  }
  if (formProps.status === undefined ) {
    errors.status = 'Required';
  }
  if (!formProps.service_id) {
    errors.service_id = 'Service Required';
  }
  return errors;
}

AccountTicketAdd = reduxForm({
  form: 'addTask',
  enableReinitialize: true,
  validate: validate,
})(AccountTicketAdd);

function mapStateToProps(state) {
  //console.log("state>>>>>>", state.account);
  return {
    services: state.account.services,
    custom_services: state.account.custom_service,
    services: state.account.services,
  }
}
export default connect(mapStateToProps, { validationNull, getServices, addTicket, nullCustomService, removeCustomService })(AccountTicketAdd);
