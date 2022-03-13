import React, { Component } from 'react';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../system/config';
import { lib, Loading } from '../library/elements';
import { getTicket } from './account_action';
import TitLeBox from "./titlebox";
import cookie from 'react-cookie';
import AccountLogin from './signin';
class AccountTicketAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      photoLightboxIndex: 0,
      isLightboxOpen: false,
    };
  }

  componentWillMount() {

    if(!cookie.load('customer')){
      return <AccountLogin />;
    }

    this.setState({isLoading: true});
    var filter = {}
    filter.ticket_id = this.props.match.params.ticket_id;
    var self = this;
    this.props.getTicket(filter, function(err, result) {
      if(result) {
        self.setState({isLoading: false});
       }
    });
    
  }



  renderServices(services ,photoLightboxIndex, isLightboxOpen){
    if(services && services.length > 0){
      return services.map((service, index) => {
        var service_class = "col-sm-12";
        if(service.images && service.images.length){
          var service_class = "col-sm-6";
        }
        return (
          <div className="card child-box mt-3 mb-3" key={"service.card."+service.service_id+"."+index}>
            <div className="card-header">
                <strong><span className="badge badge-dark">{service.name}</span></strong>
              <stong><span className="index-name">{index+1}</span></stong>
            <span className="pull-right btn-sm btn" style={{"backgroundColor":service.sevice_status_color}}>
                {service.status}
              </span>
            </div>
            <div className="card-body p-1">
                      <div className="row">
                          <div className="col-sm-12">
                            <h5 className="card-title">
                               <span className="btn-outine">{service.title}</span>
                              </h5>
                        </div>
                      <div className={service_class}>

                        {
                          service.description
                          ?
                          <div className="card-comment mt-2">
                          <p className="card-subtitle  text-muted">
                            {service.description}
                          </p>
                        </div>
                          :
                          null
                        }
                        </div>
                          <div className={service_class}>
                          {
                            service.images
                            ?
                            <div>
                              <div className="image-block mt-2">
                                Images
                              </div>
                              <div className="card-body p-0">
                                <div className="card-stripe">
                                  <ul className="card-stripe-ul">
                                    {this.renderServiceImages(service.service_id, service.images,photoLightboxIndex, isLightboxOpen)}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            :
                            null
                          }
                        </div>
                    </div>
                </div>
          </div>
        )
      });
    } else {
      return (
        <div className="m-t-2">
          <div className="row">
            <div className="col-sm-12 m-b-1">
              No result found.
            </div>
          </div>
        </div>
      )
    }
  }

  renderServiceImages(service_id, customerimages ,photoLightboxIndex, isLightboxOpen){
        const images = [];

        var images_data = customerimages.map((image, index) => {
          var thumb = "";
          if(image.image){
            thumb =IMAGE_URL+image.image;
          }
          images.push(thumb);
          return(

              <li className="card-stripe-ul-li" key={"service.card."+service_id+"."+image.ticket_service_image_id+"."+index}>
                  <Link className="icon zoom" title="Click to view" onClick={() => window.open(thumb, "_blank") } >
                    <div className="service-image fileUpload" >
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

  renderHistories(histories){
    if(histories && histories.length > 0){
      return histories.map((history, index)=>{
        return(
          <tr key={"order_history."+history.order_history_id+"."+index}>
            <td className="text-left">{lib.dateFormat(history.date_added,"dd-mm-yyyy :h:MM TT")}</td>
            <td className="text-left">{history.status}</td>
            <td className="text-left"> {lib.toHtml(history.comment)}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td className="text-center" colSpan='3'>No result found.</td>
        </tr>
      )
    }
  }

  render() {
    const { ticket } = this.props;
      var { isLoading ,photoLightboxIndex, isLightboxOpen } = this.state;
      
    if(!ticket){
      return(
      <Loading />
      );
    }


    return (
      <div id="ticket-info-card" className="mb-3 mt-3">
        { isLoading ? <Loading /> : null  }
        <div className="account-layout account-box">
          <TitLeBox {...this.props} />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-ticket-info mb-3">
                <div className="card-header"><i className="fa fa-life-ring mr-1"></i><strong>Ticket Information</strong> </div>
                  <div className="p-2">
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <ul className="list-unstyled">
                        <li className="list-item"><h6><span>Ticket ID</span><p className="card-text">{ticket.info.ticket_id}</p></h6></li>
                          <li className="list-item"><h6><span>Project</span><p className="card-text">{ticket.info.project}</p></h6></li>
                          <li className="list-item"><h6><span>Location</span></h6><p className="card-text location-card">{ticket.info.location}</p></li>
                          <li className="list-item"><h6><span>Address</span><p className="card-text">{ticket.info.address}</p></h6></li>
                          <li className="list-item"><h6><span>Status</span><p className="card-text">  <Link className="btn-Status btn btn-success btn-sm" style={{"backgroundColor":ticket.info.ticket_status_color}}>{ticket.info.ticket_status}</Link></p></h6></li>
                          <li className="list-item"><h6><span>Date Added</span><p className="card-text">{lib.dateFormat(ticket.info.date_added ,"dd-mm-yyyy :h:MM TT")}</p></h6></li>
                        </ul>

                    </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-side-border">
                        <ul className="list-unstyled">
                          <li className="list-item"><h6><span>Customer Name</span><p className="card-text">{ticket.info.name}</p></h6></li>
                            <li className="list-item"><h6><span>Email</span><p className="card-text">{ticket.info.email}</p></h6></li>
                            <li className="list-item"><h6><span>Phone</span><p className="card-text">{ticket.info.phone}</p></h6></li>
                          </ul>
                      </div>
                  </div>
                  </div>
                </div>
            </div>
        </div>
        <div className="card mb-3">
              <div className="card-header">
              <i className="fa fa-cogs mr-1"></i> <strong>Service Detail</strong>
              </div>
                  <div className="row">
                  <div className="col-sm-12">
                          {this.renderServices(ticket.services ,photoLightboxIndex, isLightboxOpen)}
                    </div>
                </div>
        </div>

    <div className="row">
      <div className="col-sm-12">
        <div className="card df-table mb-3">
          <div className="card-header">
            <strong>Ticket History</strong>
          </div>
          <div className="fcard-body fcard-padding">
            <table className="table table-hover table-bordered table-striped df-table ticket-history mb-0 hidden-md-down">
              <thead>
                <tr>
                  <th  className="text-center">Date Added</th>
                  <th className="text-center">Status</th>
                    <th  className="text-center">Comment</th>
                </tr>
              </thead>
              <tbody>
                  { this.renderHistories(ticket.histories) }
              </tbody>
            </table>
            <table className="table table-hover table-bordered table-striped df-table ticket-history mb-0 hidden-md-up table-responsive">
              <thead>
                <tr>
                  <th  className="text-center">Date Added</th>
                  <th className="text-center">Status</th>
                    <th  className="text-center">Comment</th>
                </tr>
              </thead>
              <tbody>
                  { this.renderHistories(ticket.histories) }
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

function mapStateToProps(state) {
console.log("state.account.ticket_info>>>>>>", state.account.ticket_info);
  return {
    ticket: state.account.ticket_info,
  }
}
export default connect(mapStateToProps, { getTicket })(AccountTicketAdd);
