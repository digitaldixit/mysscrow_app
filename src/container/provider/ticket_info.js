import React, { Component } from 'react';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import { modal } from '../library/elements/modal';
import { Link } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { IMAGE_URL } from '../../system/config';
import { nullCustomService, removeCustomService } from '../account/account_action';
import { InputImage, lib, Loading } from '../library/elements';
import ModalAddTicketService from './modal_add_ticket_service';
import ModalAddTicketTime from './modal_add_ticket_timing';
import ModalViewTicketHistory from './modal_view_ticket_history';
import { getTicket } from './provider_action';



const dateFormat = require('dateformat');
class AccountTicketAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      photoLightboxIndex: 0,
      isLightboxOpen: false,
    };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.renderCustomService = this.renderCustomService.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});
    var filter = {}
    filter.ticket_service_id = this.props.match.params.ticket_service_id;
    var self = this;
    this.props.getTicket(filter, function(err, result) {
      if(result) {
        self.setState({isLoading: false});
       }
    });
  }

  handleFormSubmit(formProps){
    var _this = this;
    var custom_services = this.props.custom_services;
    var data = new FormData();
    var images = formProps['custom_service'];
    for(var mi in images){
      for(var i in images[mi]['image']){
        if(images[mi]['image'][i][['image']] !== undefined){
          data.append('custom_service['+mi+']', images[mi]['image'][i]['image'][0]);
        }
      }
    }
    data.append('custom_service', JSON.stringify(custom_services));

    // this.props.addTicketHistory(data, function(err, result) {
    //   if(result) {
    //     _this.props.nullCustomService();
    //     _this.setState({ isLoading: false });
    //     // browserHistory.push("/account/ticket");
    //   }
    // });
  }

  renderCustomerImages(customerimages, photoLightboxIndex, isLightboxOpen){
        const images = [];

        var images_data = customerimages.map((image, index) => {
          var thumb = "";
          if(image.image){
            thumb =IMAGE_URL+image.image;
          }
          images.push(thumb);
          return(

              <li className="card-stripe-ul-li" key={image.ticket_service_image_id+"."+index}>
                  <Link className="icon zoom" title="Click to view" onClick={() => this.setState({ isLightboxOpen: true, photoLightboxIndex: index })} >
                    <div className="fileUpload btn btn-outline-default p-0">
                      <img src={thumb} className="" width='100' height='100' />
                    </div>
                  </Link>
            </li>
          );
        });
        return (
            <div className="panel-body">

              { isLightboxOpen && (

                <Lightbox
                images={[{ src: images[photoLightboxIndex] }]}
                isOpen={this.state.isLightboxOpen}
                onClose={() => this.setState({ isLightboxOpen: false })}
                />
              )}
              <ul className="thumbnails unstyled p-0" id="main-image">
                    {images_data}
              </ul>
          </div>
        );

    }

  renderRemoveCustomService(index){
    this.props.removeCustomService(index, function(err, result) {
      if(result) {
        this.setState({isLoading: false});
      }
    });
  }
  renderCustomService(addMoreImage){
    if(this.props.custom_service && this.props.custom_services.length > 0){
      return this.props.custom_services.map((custom_service, index) => {
        return (
          <div className="card" key={"service.card."+index}>
            <div className="card-header">
              Service #{index+1}
            </div>
            <div className="card-block">
              <h5 className="card-title mb-3">{custom_service.service.name} : {custom_service.comment}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {custom_service.comment}
              </h6>
            </div>
            <div className="image-block p-3 bg-light">
              Images
            </div>
            <div className="card-block">
              <div className="card-stripe">
                <FieldArray name={"custom_service["+index+"][image]"} component={addMoreImage} />
              </div>
            </div>
          </div>
        )
      });
    } else {
      return (
        <div className="m-t-2">

        </div>
      )
    }
  }
  renderHistories(histories){
    if(histories && histories.length > 0){
      return histories.map((history)=>{
        return(
          <tr key={'order_history_'+history.ticket_service_history_id}>

            <td  className="text-center">{lib.dateFormat(history.date_added ,"dd-mm-yyyy :h:MM TT")}</td>
              <td className="text-center"> {lib.toHtml(history.comment)}</td>
            <td  className="text-center">{history.status}</td>
              <td>
                  <button type="button" className="btn btn-outline-primary btn-sm pull-right" onClick={() => this.renderModalViewTicketHistory('View History',history)} >View History</button>
              </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td className="text-center" colSpan='4'>No result found.</td>
        </tr>
      )
    }
  }

  renderMaterials(materials){
    if(materials && materials.length > 0){
      return materials.map((material)=>{
        return(
          <tr key={'material_'+material.ticket_service_material_id}>
            <td  className="text-left">{material.material_name}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td className="text-center" colSpan='4'>No Material found.</td>
        </tr>
      )
    }
  }

  renderModalViewTicketHistory(title,history){
      modal.add(ModalViewTicketHistory, {
        title: title,
        size: 'large',
        closeOnOutsideClick: false,
        hideCloseButton: false,
        history:history
      });
    }
  renderModalAddService(title,ticket_id,service_id ,ticket_service_id){
      modal.add(ModalAddTicketService, {
        title: title,
        size: 'large',
        closeOnOutsideClick: false,
        hideCloseButton: false,
        ticket_id:ticket_id,
        service_id:service_id,
        ticket_service_id:ticket_service_id,
      });
    }
    // Time
    renderModalAddTime(title,ticket_id,service_id ,ticket_service_id){
        modal.add(ModalAddTicketTime, {
          title: title,
          size: 'large',
          closeOnOutsideClick: false,
          hideCloseButton: false,
          ticket_id:ticket_id,
          service_id:service_id,
          ticket_service_id:ticket_service_id,
        });
  }
  render() {
        const { handleSubmit, ticket, custom_services } = this.props;
    var { isLoading ,photoLightboxIndex, isLightboxOpen } = this.state;

    if(!ticket){
      return(
      <Loading />
      );
    }
    var service_class = "col-sm-12";
    if(ticket?.info?.customer_image != undefined){
      var service_class = "col-sm-6";
    }
    const addMoreImage = ({ fields, meta: { touched, error } }) => (
      <ul className="appointment_date-stripe-ul">
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
      <div id="ticket-info-card" className=" mb-3 mt-3">
        { isLoading ? <Loading /> : null  }
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-ticket-info mb-3">
              <div className="card-header"><i className="fa fa-life-ring mr-1"></i><strong>Ticket Information</strong> </div>
                <div className="p-2">
                <div className="row">

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <ul className="list-unstyled">
                      <li className="list-item"><h6><span>Service ID</span><p className="card-text">{ticket?.info?.ticket_service_id}</p></h6></li>
                      <li className="list-item"><h6><span>Ticket ID</span><p className="card-text">{ticket?.info?.ticket_id}</p></h6></li>
                        <li className="list-item"><h6><span>Project</span><p className="card-text">{ticket?.info?.project_name}</p></h6></li>
                        <li className="list-item"><h6><span>Location</span></h6><p className="card-text location-card">{ticket?.info?.location}</p></li>
                        <li className="list-item"><h6><span>Address</span><p className="card-text">{ticket?.info?.address}</p></h6></li>
                        <li className="list-item"><h6><span>Status</span><p className="card-text">  <Link className="btn-Status btn btn-success btn-sm" style={{"backgroundColor":ticket?.info?.ticket_status_color}}>{ticket?.info?.ticket_status}</Link></p></h6></li>
                        <li className="list-item"><h6><span>Date Added</span><p className="card-text">{lib.dateFormat(ticket?.info?.date_added ,"dd-mm-yyyy :h:MM TT")}</p></h6></li>
                      </ul>

                  </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-side-border">
                      <ul className="list-unstyled">
                        <li className="list-item"><h6><span>Customer Name</span><p className="card-text">{ticket?.info?.customer_name}</p></h6></li>
                          <li className="list-item"><h6><span>Email</span><p className="card-text">{ticket?.info?.customer_email}</p></h6></li>
                          <li className="list-item"><h6><span>Phone</span><p className="card-text">{ticket?.info?.customer_phone}</p></h6></li>
                        </ul>
                    </div>
                </div>
                </div>
              </div>
          </div>
      </div>
    {/* <div className="card mb-3">
          <div className="card-header">
          <i className="fa fa-cogs mr-1"></i> <strong>Service Detail</strong>
            {
              ticket?.info?.ticket_status !='Finished'

            ?
              <button type="button" className="btn btn-primary btn-sm pull-right" onClick={() => this.renderModalAddTime('Ticket Timing',ticket?.info?.ticket_id,ticket?.info?.service_id ,ticket?.info?.ticket_service_id)} ><i className="fa fa-plus"></i>Update Timing</button>
            :
              null
            }

          </div>
              <div className="row">
                  <div className="col-sm-12 mb-2">
                    {
                      ticket?.info?.date_time !="0000-00-00 00:00:00"
                      ?
                      <div className="card-ticket-time text-center mt-2">
                      <b>Approx Date & Time for Solve Ticket : </b>{dateFormat(ticket?.info?.date_time,  "dd-mm-yyyy :h:MM TT")}<i className="ml-1 fa fa-clock-o fa-lg hidden-md-down"></i>
                      </div>
                      :
                      <div className="card-ticket-time text-center mt-2">
                        <b>Please Update Ticket Timing by using above link</b>
                      </div>
                    }
                </div>
              <div className={service_class}>
                      {
                        ticket?.info?.description
                        ?
                        <div className="card-comment">
                        <p className="card-subtitle  text-muted">
                          {ticket?.info?.description}
                        </p>
                      </div>
                        :
                        null
                      }
                </div>
                <div className={service_class}>
                  {
                    ticket?.info?.customer_image
                    ?
                    <div>
                      <div className="image-block p-3">
                        Customer  Images
                      </div>
                      <div className="row">
                        <div className="card-stripe">
                          <ul className="card-stripe-ul">
                            {this.renderCustomerImages(ticket?.info?.customer_image,photoLightboxIndex, isLightboxOpen)}
                          </ul>
                        </div>
                      </div>
                    </div>
                    :
                    null
                  }
                </div>
            </div>
        </div> */}

        {/* <div className="row">
          <div className="col-sm-12">
            <div className="card df-table mb-3">
              <div className="card-header">
                <strong>Service Materials</strong>
              </div>
              <div className="fcard-body fcard-padding">
                <table className="table table-hover table-bordered table-striped df-table ticket-history mb-0">
                  <thead>
                    <tr>
                      <th  className="text-left">Material Name</th>
                    </tr>
                  </thead>
                  <tbody>
                      { this.renderMaterials(ticket?.info?.materials) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-12">
            <div className="card df-table mb-3">
              <div className="card-header">
                <strong>Service History</strong>
                      <button type="button" className="btn btn-outline-primary btn-sm pull-right" onClick={() => this.renderModalAddService('Add History',ticket?.info?.ticket_id,ticket?.info?.service_id ,ticket?.info?.ticket_service_id)} ><i className="fa fa-plus"></i>Add History</button>
              </div>
              <div className="fcard-body fcard-padding">
                <table className="table table-hover table-bordered table-striped df-table ticket-history hidden-md-down">
                  <thead>
                    <tr>
                      <th  className="text-center">Date Added</th>
                      <th  className="text-center">Comment</th>
                      <th className="text-center">Status</th>
                      <th  className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      { this.renderHistories(ticket?.info?.histories) }
                  </tbody>
                </table>
                <table className="table table-hover table-bordered table-striped df-table ticket-history hidden-md-up table-responsive">
                  <thead>
                    <tr>
                      <th  className="text-center">Date Added</th>
                      <th  className="text-center">Comment</th>
                      <th className="text-center">Status</th>
                      <th  className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      { this.renderHistories(ticket?.info?.histories) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        </div>
    </div>
    );
  }
}
AccountTicketAdd = reduxForm({
  form: 'addTask',
  enableReinitialize: true,
})(AccountTicketAdd);

function mapStateToProps(state) {
  console.log("----ticket",state.provider.ticket_info);
  return {
    ticket: state.provider.ticket_info,
    custom_services: state.account.custom_service,
  }
}
export default connect(mapStateToProps, { getTicket ,nullCustomService, removeCustomService })(AccountTicketAdd);
