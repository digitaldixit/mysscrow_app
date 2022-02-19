import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../library/elements';
import { getRecentProviderTickets } from './provider_action';
const dateFormat = require('dateformat');
class ProviderTicket extends Component {

  constructor() {
  	super();
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = { isLoading:false };
  }

  componentWillMount() {
    var _this = this;
    var filterdata = {
     startlimit: 0,
     endlimit: 10,
    };
    this.setState({isLoading: true});
    this.props.getRecentProviderTickets(filterdata, function(err,result) {
      if(result) {
        _this.setState({isLoading: false});
      }
    });
  }
  handlePageChange(pageNumber) {
    this.setState({isLoading: true});
    var _this = this;
    var filterdata = {
     startlimit: ((pageNumber - 1) * 10 ),
     endlimit: 10
    };

    //console.log(filterdata);
    this.props.getRecentProviderTickets(filterdata, function(err, result) {
      if(result) {
        _this.setState({activePage: pageNumber});
        _this.setState({isLoading: false});
      }
    });
  }
  renderTicketService(services){
    if(services){
      return services.map((service) => {
        return (
              <button type="button" className="btn-outine mr-1" key={"ticket.service."+service.service_id} >{(service.name)}</button>

        );
      });
    }
  }

  renderRecentMobileTickets(tickets) {
    return tickets.map((ticket)=> {
        var ticket_link = "/provider/ticket_service/info/"+ticket.ticket_service_id;
      return(
          <div className="col-sm-6" key={'ticket_'+ticket.ticket_service_id}>
          <Link className="ticket-link" to = {ticket_link}>
            <div className="card-ticket">
              <div className="row">
                <div className="col-sm-12 col-12">
                  <div className=" row product-row-1 ticket-from">
                          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9 text-left name">

                            {
                            ticket.service_name
                            ?
                            <p className="m-0">
                                <span className="m-ticket-id">{ticket.ticket_id}</span>
                                <small className="m-ticket-date"> / <i className="fa fa-calendar"></i> {dateFormat(ticket.date_added, "dd-mm-yyyy")} </small>
                                <span className="btn-outine"> {ticket.service_name}</span></p>
                            :
                            <p className="m-0">
                              <span className="m-ticket-id">{ticket.ticket_id}</span>
                              <small className="m-ticket-date"> / <i className="fa fa-calendar"></i> {dateFormat(ticket.date_added, "dd-mm-yyyy")} </small>
                              <span className="btn-outine"> no service </span></p>
                          }

                          </div>

                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 price  text-right diate pull-right">
                            <div className="pull-right btn-status ">
                              {
                                ticket.priority_name
                                ?
                                <span className="btn-Status btn btn-success btn-sm pull-right mr-1" style={{"backgroundColor":ticket.priority_color}}>{ticket.priority_name}</span>

                                :

                                null
                              }
                              <span className="btn-Status btn btn-success btn-sm pull-right " style={{"backgroundColor":ticket.service_status_color}}>{ticket.service_status_name}</span>
                            </div>
                          </div>
                  </div>
                  <hr/>
                    <div className=" row product-row-1 ticket-from">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 text-left ticket-service">
                              {
                              ticket.project_name
                              ?
                              <p className="m-0"><span className="btn-outine">{ticket.project_name}</span></p>
                              :
                              <p className="m-0"><span className="btn-outine">no project </span></p>
                            }
                            {
                            ticket.project_location

                              ?
                              <p className="m-0"><i className="fa fa-map-marker fa-lg mr-1"></i><span className="ticket-title">{ticket.project_location}</span></p>
                              :
                              <p className="m-0"><span className="ticket-title">no location available</span></p>
                            }
                            </div>

                    </div>
                </div>
              </div>
            </div>
        </Link>
      </div>
      );
    });
  }
  renderRecentTickets(tickets){
    if(tickets.length){
      return tickets.map((ticket) => {
        var ticket_link = "/provider/ticket_service/info/"+ticket.ticket_service_id;

        return (
            <div className="col-sm-6" key={'ticket_'+ticket.ticket_service_id}>
              <Link className="ticket-link" to = {ticket_link}>
                <div className="card-ticket">
                  <div className="row">
                    <div className="col-sm-3 col-3">
                    <div className="colored-side" style={{"backgroundColor":ticket.service_status_color}}></div>
                      <h3 className="ticket-id">{ticket.ticket_id}</h3>
                      <div className="ticket-divider hidden-md-down"></div>
                          <div className="ticket-date">
                          {dateFormat(ticket.date_added, "dd-mm-yyyy")}
                          <p className="m-0"> {dateFormat(ticket.date_added, "h:MM TT")}</p>
                        </div>
                    </div>
                    <div className="col-sm-9 col-9">
                      <div className=" row product-row-1 ticket-from">
                              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9 text-left name">
                                {
                                ticket.service_name
                                ?
                                <p className="m-0"><span className="btn-outine">{ticket.service_name}</span></p>
                                :
                                <p className="m-0"><span className="btn-outine">no Service </span></p>
                              }


                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 price  text-right diate pull-right">
                                <Link className="btn-Status btn btn-success btn-sm pull-right " style={{"backgroundColor":ticket.service_status_color}}>{ticket.service_status_name}</Link>
                              </div>
                      </div>
                      <hr/>
                        <div className=" row product-row-1 ticket-from">
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-12 text-left ticket-service">
                                  {
                                  ticket.project_name
                                  ?
                                  <p className="m-0"><span className="btn-outine"><i className="fa fa-building-o fa-lg mr-1"></i>{ticket.project_name}</span></p>
                                  :
                                  <p className="m-0"><span className="btn-outine">no project </span></p>
                                }
                                  {
                                  ticket.project_location

                                    ?
                                    <p className="m-0"><i className="fa fa-map-marker fa-lg mr-1"></i><span className="ticket-title">{ticket.project_location}</span></p>
                                    :
                                    <p className="m-0"><span className="ticket-title">no location available</span></p>
                                  }
                                </div>

                        </div>
                    </div>
                  </div>
                </div>
            </Link>
          </div>
        );
      });
    }else{
      return(
        <div className="text-center col-sm-12">
            <div id="content">
              <div className="card">
                  <div className="card-body p-2">
                    <div className="no-result"><h5>No Recent Tickets found!</h5></div>
                  </div>
              </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { provider_ticket_list ,settings} = this.props;
    var isLoading = this.state.isLoading;

    if(provider_ticket_list == undefined){
      return(
        <div className="provider-ticket-undefined"><Loading /></div>
      );
    }


    return (
        <div className="ticket-list">
        {isLoading ? <Loading /> : null  }
          <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <div className="row data-list hidden-md-down">
                  {this.renderRecentTickets(provider_ticket_list)}
                </div>
                <div className="row data-list hidden-md-up">
                  {this.renderRecentMobileTickets(provider_ticket_list)}
                </div>
              </div>
          </div>
        </div>
   );
  }
}

function mapStateToProps(state) {

  return {
    authenticate_provider: state.account.authenticate_provider,
    provider_ticket_list: state.provider.provider_ticket_list
}
}

export default connect(mapStateToProps, { getRecentProviderTickets })(ProviderTicket);
