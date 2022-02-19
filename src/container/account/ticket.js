import $ from "jquery";
import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFilters } from "../common/common_action";
import { Loading } from "../library/elements";
import TitLeBox from "./titlebox";
import {
  getFilterTicketStatus,
  getTickets,
  getTotalTickets
} from "./account_action";

const dateFormat = require("dateformat");

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading: false,
      sizePerPage: 10,
      search_text: "",
      currentTicketPriorityFilterStatus: "",
      currentTicketStatus: "",
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refresh = this.refresh.bind(this);
    this.renderTickets = this.renderTickets.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    var _this = this;
    var page = this.state.currentPage;

    this.props.setFilters("ticket", {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    });

    this.props.getFilterTicketStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  refresh() {
    this.setState({
      isLoading: true,
      currentTicketPriorityFilterStatus: "",
      currentPage: 1,
      search_text: "",
    });
    var _this = this;
    var page = 1;

    $("#search-text").val("");

    this.props.setFilters("ticket", {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    });

    this.props.getFilterTicketStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  handlePageChange(pageNumber) {
    var _this = this;
    var startLimit = (pageNumber - 1) * this.state.sizePerPage;

    if (pageNumber == 1) {
      startLimit = 0;
    }

    this.setState({ isLoading: true, currentPage: pageNumber });

    this.props.setFilters("ticket", {
      filter_text: this.state.search_text,
      filter_priority_name: this.state.currentTicketPriorityFilterStatus,
      filter_ticket_status: this.state.currentTicketStatus,
      start: startLimit,
      limit: this.state.sizePerPage,
    });

    this.props.getTickets(function (err, result) {
      _this.setState({ isLoading: false });
    });
  }

  handleChange(e) {
    this.setState({ search_text: e.target.value });
  }

  filterData() {
    var _this = this;
    this.setState({ isLoading: true, currentPage: 1 });
    var page = 1;
    this.props.setFilters("ticket", {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
      filter_text: this.state.search_text,
      filter_priority_name: this.state.currentTicketPriorityFilterStatus,
    });

    this.props.getFilterTicketStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  renderTicketService(services) {
    if (services) {
      return services.map((service, index) => {
        return (
          <button
            type="button"
            className="btn-outine btn-outine mr-1 mt-1"
            key={"service-list-" + index}
          >
            {service.name}
          </button>
        );
      });
    }
  }

  renderTickets(tickets) {
    return tickets.map((ticket) => {
      var ticket_link = "/account/ticket/info/" + ticket.ticket_id;
      return (
        <div className="col-sm-6" key={"ticket_" + ticket.ticket_id}>
          <Link className="ticket-link" to={ticket_link}>
            <div className="card-ticket">
              <div className="row">
                <div className="col-sm-3 col-3">
                  <div
                    className="colored-side"
                    style={{ backgroundColor: ticket.color }}
                  ></div>
                  <h3 className="ticket-id">{ticket.ticket_id}</h3>
                  <div className="ticket-divider hidden-md-down"></div>
                  <div className="ticket-date">
                    {dateFormat(ticket.date_added, "dd-mm-yyyy")}
                    <p className="m-0">
                      {" "}
                      {dateFormat(ticket.date_added, "h:MM TT")}
                    </p>
                  </div>
                </div>
                <div className="col-sm-9 col-9">
                  <div className=" row product-row-1 ticket-from">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9 text-left name"></div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 price  text-right diate pull-right">
                      <Link
                        className="btn-Status btn btn-success btn-sm pull-right "
                        style={{ backgroundColor: ticket.color }}
                      >
                        {ticket.ticket_status}
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className=" row product-row-1 ticket-from">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-12 text-left ticket-service">
                      {ticket.location ? (
                        <p className="m-0">
                          <span className="ticket-title">
                            {ticket.location}
                          </span>
                        </p>
                      ) : (
                        <p className="m-0">
                          <span className="ticket-title">
                            no location available
                          </span>
                        </p>
                      )}
                      {ticket.services != undefined &&
                      ticket.services.length > 0 ? (
                        <div className="service-list">
                          {this.renderTicketService(ticket.services)}
                        </div>
                      ) : null}
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
    return tickets.map((ticket) => {
      var ticket_link = "/account/ticket/info/" + ticket.ticket_id;
      return (
        <div className="col-sm-6" key={"ticket_" + ticket.ticket_id}>
          <Link className="ticket-link" to={ticket_link}>
            <div className="card-ticket">
              <div className="row">
                <div className="col-sm-12 col-12">
                  <div className=" row product-row-1 ticket-from">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9 text-left name"></div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 price  text-right diate pull-right">
                      <Link
                        className="btn-Status btn btn-success btn-sm pull-right "
                        style={{ backgroundColor: ticket.color }}
                      >
                        {ticket.ticket_status}
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className=" row product-row-1 ticket-from">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-12 text-left ticket-service">
                      {ticket.location ? (
                        <p className="mt-1 mb-0 m-ticket-location">
                          <span className="ticket-title">{ticket.address}</span>
                        </p>
                      ) : (
                        <p className="mt-1 mb-0">
                          <span className="ticket-title">
                            no location available
                          </span>
                        </p>
                      )}
                      <hr />

                      {ticket.services != undefined &&
                      ticket.services.length > 0 ? (
                        <div className="service-list">
                          {this.renderTicketService(ticket.services)}
                        </div>
                      ) : (
                        <p className="mt-1 mb-0">
                          <span className="ticket-title btn-outine">
                            no service available
                          </span>
                        </p>
                      )}
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
      currentTicketPriorityFilterStatus: value,
      currentTicketStatus: "",
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    };
    filter_data[name] = value;
    this.props.setFilters("ticket", filter_data);
    var _this = this;
    this.props.getFilterTicketStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  renderPrioritywiseTickets(priorities, currentTicketPriorityFilterStatus) {
    if (priorities !== undefined) {
      return priorities.map((priority) => {
        return (
          <button
            key={"priorities.all.priority." + priority.priority_id}
            className="btn btn-sm ml-2"
            style={{ "background-color": priority.color, color: "#fff" }}
            onClick={() =>
              this.renderClickTicketPriorityFilter(
                "filter_priority_name",
                priority.priority_id
              )
            }
          >
            {priority.name}: {priority.total}
          </button>
        );
      });
    }
  }

  renderClickStatusFilter(name, value) {
    this.setState({
      isLoading: true,
      currentPage: 1,
      currentTicketPriorityFilterStatus: "",
      currentTicketStatus: value,
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    };
    filter_data[name] = value;
    this.props.setFilters("ticket", filter_data);
    var _this = this;

    this.props.getFilterTicketStatus();
    this.props.getTotalTickets();
    this.props.getTickets(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  renderStatuswiseTickets(statues, currentTicketStatus) {
    if (statues !== undefined) {
      return statues.map((status) => {
        if (status.ticket_status_id == currentTicketStatus) {
          return (
            <button
              key={"tickets.all.status." + status.ticket_status_id}
              className="btn btn-sm ml-2 mb-2 btn-primary"
              style={{ "background-color": status.color, color: "#fff" }}
              onClick={() =>
                this.renderClickStatusFilter(
                  "filter_ticket_status",
                  status.ticket_status_id
                )
              }
            >
              {status.name}: {status.total}
            </button>
          );
        } else {
          return (
            <button
              key={"tickets.all.status." + status.ticket_status_id}
              className="btn btn-sm ml-2  mb-2 btn-primary"
              style={{ "background-color": status.color, color: "#fff" }}
              onClick={() =>
                this.renderClickStatusFilter(
                  "filter_ticket_status",
                  status.ticket_status_id
                )
              }
            >
              {status.name}: {status.total}
            </button>
          );
        }
      });
    }
  }

  render() {
    const { ticket_list, ticket_total, filter_ticket_status } = this.props;

    const {
      isLoading,
      currentTicketPriorityFilterStatus,
      currentTicketStatus,
      search_text,
      currentPage,
      sizePerPage,
    } = this.state;

    if (
      ticket_list == undefined ||
      ticket_total == undefined ||
      filter_ticket_status == undefined
    ) {
      return (
        <div className="ticket-undefined">
          <Loading />
        </div>
      );
    }
    var topclassName = "col-sm-12";
    var btnfull =
      "btn btn-primary btn-block btn-add-ticket mt-3 mb-3 hidden-md-down";
    if (filter_ticket_status != undefined && filter_ticket_status.length > 0) {
      topclassName = "col-sm-6";
      btnfull =
        "btn btn-primary pull-left btn-add-ticket mt-3 mb-3 hidden-md-down";
    }

    return (
      <div className="ticket-list">
        {isLoading ? <Loading /> : null}
        <div className="account-layout account-box">
          <TitLeBox {...this.props} />
        </div>
        <div className="container">
          <div className="row">
            <div className={topclassName}>
              <Link className={btnfull} to={"/account/ticket/add"}>
                <i className="fa fa-plus"></i> <span>Request a Support</span>
              </Link>
              <Link
                className="btn btn-primary btn-block btn-add-ticket mt-3 hidden-md-up"
                to={"/account/ticket/add"}
              >
                <i className="fa fa-plus"></i> <span>Request a Support</span>
              </Link>
            </div>

            {filter_ticket_status != undefined &&
            filter_ticket_status.length > 0 ? (
              <div
                className={
                  "filter-status-tickets pull-right mt-3 text-right   " +
                  topclassName
                }
              >
                <button
                  className="btn btn-info btn-sm  mb-2 btn-back"
                  onClick={() => this.refresh()}
                >
                  <i className="fa fa-refresh"></i>
                  <span> Refresh</span>
                </button>
                {this.renderStatuswiseTickets(
                  filter_ticket_status,
                  currentTicketStatus
                )}
              </div>
            ) : null}
          </div>
          {ticket_list != undefined && ticket_list.length > 0 ? (
            <div>
              <div className="row data-list hidden-md-down">
                {this.renderTickets(ticket_list)}
              </div>
              <div className="row data-list hidden-md-up">
                {this.renderMobileTickets(ticket_list)}
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-12">
                <div className="text-center mt-2 mb-2">
                  <div className="card">
                    <div className="card-body p-2">
                      <div className="no-result">
                        <h5>No Active Ticket found!</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row ">
            <div className="col-sm-12">
              {ticket_total > sizePerPage ? (
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
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ticket_list: state.account.ticket_list,
    ticket_total: state.account.ticket_total,
    filter_ticket_status: state.account.filter_ticket_status,
  };
}
export default connect(mapStateToProps, {
  getTickets,
  getTotalTickets,
  setFilters,
  getFilterTicketStatus,
})(Ticket);
