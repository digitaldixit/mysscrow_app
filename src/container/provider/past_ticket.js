import $ from 'jquery';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilters } from '../common/common_action';
import { Loading } from '../library/elements';
import { getTicketPriorityStatus, getTickets, getTicketStatus, getTotalTickets } from './provider_action';
const dateFormat = require('dateformat');

class AccountTicket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading:false,
      sizePerPage: 10,
      currentTicketStatus:''

    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.refresh = this.refresh.bind(this);
    this.renderTickets = this.renderTickets.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});
    var _this = this;
    var page  = this.state.currentPage;

    this.props.setFilters(
      'ticket',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
        filter_ticket_status:4,
      }
    );

    this.props.getTicketStatus();
    this.props.getTicketPriorityStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  refresh() {
    this.setState({isLoading: true, currentPage: 1 });
    var _this = this;
    var page  = 1;

    $('#search-text').val('');

    this.props.setFilters(
      'ticket',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
        filter_ticket_status:4,
      }
    );

    this.props.getTicketStatus();
    this.props.getTicketPriorityStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  handlePageChange(pageNumber) {
    var _this = this;
    var startLimit = (pageNumber - 1) * this.state.sizePerPage;

    if(pageNumber == 1) {
      startLimit = 0;
    }

    this.setState({ isLoading: true, currentPage: pageNumber });

    this.props.setFilters(
      'ticket',
      {
        filter_ticket_status:4,
        start: startLimit,
        limit: this.state.sizePerPage,
      }
    );

    this.props.getTickets(function(err, result) {
      _this.setState({ isLoading: false });
    });
  }


  filterData() {
    var _this = this;
    this.setState({ isLoading: true, currentPage: 1 });
    var page  = 1;
    this.props.setFilters(
      'ticket',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
          filter_ticket_status:4,
      }
    );

    this.props.getTicketStatus();
    this.props.getTicketPriorityStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }




  renderTickets(tickets) {
    return tickets.map((ticket)=> {
        var ticket_link = "/provider/ticket_service/info/"+ticket.ticket_service_id;
      return(
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

                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 price">
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

  renderMobileTickets(tickets) {
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

  renderClickTicketPriorityFilter(name, value) {
    this.setState({
      isLoading: true,
      currentPage: 1,
      currentTicketStatus: ''
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: ((page - 1) * this.state.sizePerPage),
      limit: this.state.sizePerPage,
        filter_ticket_status:4,
    };
    filter_data[name] = value;
    this.props.setFilters('ticket', filter_data);
    var _this = this;
    this.props.getTicketStatus();
    this.props.getTicketPriorityStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }



  applyCategorySortBy(name, value) {
    this.setState({
      isLoading: true,
      currentPage: 1,
      currentTicketStatus: value
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: ((page - 1) * this.state.sizePerPage),
      limit: this.state.sizePerPage,
        filter_ticket_status:4,
    };
    filter_data[name] = value;
    this.props.setFilters('ticket', filter_data);
    var _this = this;

    this.props.getTicketStatus();
    this.props.getTicketPriorityStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

     renderPriorityStatus(statues, currentTicketStatus) {
          if(statues !== undefined) {
            return statues.map((status)=>{
                return(
                    <option   key={"tickets.priority.status."+status.priority_id} value={status.priority_id}>{status.name}</option>
                );
            });
          }
        }
     renderSortbyPriorityStatus(statues, currentTicketStatus){
             return (
               <div className="category-sortby">
                 <div className="select-style">
                 <select onChange={ (e) => this.applyCategorySortBy('ticket_priority_status', e.target.value)}>
                      <option value="">--Select Priority Status--</option>
                   {this.renderPriorityStatus(statues, currentTicketStatus)}
                   </select>
                 </div>
               </div>
             )
       }
  render() {

    const { ticket_list, ticket_total, filter_ticket_status ,ticket_priority_status } = this.props;

    const { isLoading, currentTicketPriorityFilterStatus,currentTicketStatus, currentPage, sizePerPage } = this.state;

    if(ticket_list == undefined || ticket_total == undefined || filter_ticket_status == undefined ) {
      return(
        <div className="ticket-undefined"><Loading /></div>
      );
    }
    var topclassName ='col-sm-12';
    var btnfull ='btn btn-primary btn-block btn-add-ticket mt-3 mb-3 hidden-md-down';
    if(filter_ticket_status != undefined && filter_ticket_status.length > 0) {
      topclassName ='col-sm-6';
      btnfull ='btn btn-primary pull-left btn-add-ticket mt-3 mb-3 hidden-md-down';
    }


    return(
        <div className="ticket-list m-common">
        { isLoading ? <Loading /> : null }

          <div className="container">
                <div className="card-header bg-white col-sm-12 pl-0 pr-0">
                <strong>Past Ticket List</strong>
                    <button className="btn btn-info btn-sm pull-right" onClick={() => this.refresh()}>
                             <i className="fa fa-refresh"></i><span> Refresh</span>
                     </button>
                </div>
            <div className="row pt-2 pb-0">
            <div className="col-sm-12 col-sm-12  text-right pull-right">
                    {
              ticket_priority_status != undefined && ticket_priority_status.length > 0
              ?
                <div>
                  {this.renderSortbyPriorityStatus(ticket_priority_status, currentTicketStatus)}
                </div>
              :
                null
            }
            </div>
            </div>




        {
          ticket_list != undefined && ticket_list.length > 0
          ?
          <div>
            <div className="row data-list hidden-md-down">
              {this.renderTickets(ticket_list)}
            </div>
            <div className="row data-list hidden-md-up">
              {this.renderMobileTickets(ticket_list)}
            </div>
          </div>
          :
            <div className="row">
                <div className="col-sm-12">
                  <div className="text-center mt-2 mb-2">
                        <div className="card">
                            <div className="card-body p-2">
                              <div className="no-result"><h5>No Past Ticket found!</h5></div>
                            </div>
                        </div>
                  </div>
                </div>
              </div>
        }

          <div className="row ">
              <div className="col-sm-12">
                {
                  ticket_total > sizePerPage
                  ?
                      <div className="card-pagination">
                        <div className="row">
                          <div className="col-sm-12 text-right">
                            <Pagination
                              pageRangeDisplayed={5}
                              activePage={currentPage}
                              itemsCountPerPage={sizePerPage}
                              totalItemsCount={ticket_total}
                              onChange={this.handlePageChange}
                            />
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
    );
  }

}
function mapStateToProps(state) {
  return {
    ticket_list: state.provider.provider_ticket_list,
    ticket_total: state.provider.provider_ticket_total,
    filter_ticket_status: state.provider.filter_ticket_status,
    ticket_priority_status: state.provider.ticket_priority_status,
  }
}
export default connect(mapStateToProps, { getTickets, getTotalTickets, setFilters, getTicketStatus ,getTicketPriorityStatus })(AccountTicket);
