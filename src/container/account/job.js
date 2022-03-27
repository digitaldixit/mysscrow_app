import $ from "jquery";
import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFilters } from "../common/common_action";
import { Loading } from "../library/elements";
import { getJobStatus, getJobs, getTotalJobs } from "./account_action";

const dateFormat = require("dateformat");

class AccountJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading: false,
      sizePerPage: 10,
      currentjobstatus: "",
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.refresh = this.refresh.bind(this);
    this.renderJobs = this.renderJobs.bind(this);
  }

  componentDidMount() {
    
    this.setState({
      isLoading: true,
      currentPage: 1,
      currentjobstatus: this.props?.location?.job_status_id,
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    };
    filter_data["filter_job_status"] = this.props?.location?.job_status_id;

   
    
    this.props.setFilters("job", filter_data);
    var _this = this;

    this.props.getJobStatus();
    this.props.getTotalJobs();
    this.props.getJobs(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  refresh() {
    this.setState({
      isLoading: true,
      currentPage: 1,
    });
    var _this = this;
    var page = 1;

    this.props.setFilters("job", {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    });

    this.props.getJobStatus();
    this.props.getTotalJobs();
    this.props.getJobs(function (err, result) {
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

    this.props.setFilters("job", {
      filter_job_status: this.state.currentjobstatus,
      start: startLimit,
      limit: this.state.sizePerPage,
    });

    this.props.getJobs(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }
  renderJobStatus(services) {
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
  renderJobs(jobs) {
    return jobs.map((job) => {
    
      var job_link = "/account/job/info/" + job.job_id;
      return (
        <div className="col-sm-4" key={"job_" + job.job_id}>
          <Link className="job-link" to={job_link}>
            {job &&
            job.total_contractor_requests &&
            job.total_contractor_requests != undefined ? (
              <span className="tag-offer success right">
                {job.total_contractor_requests}{" "}
              </span>
            ) : null}

            <div className={"single-services job-card no-shadow border"}>
              {job && job.job_title && <h3>{job.job_title}</h3>}
              {job && job.job_description && (
                <p className="hidden-lg-down">{job.job_description}</p>
              )}
              <div className="d-flex align-items-center mt-3">
                <div className="flex-grow-1"></div>
                <Link className="btn btn-outline-primary btn-sm" to={job_link}>
                  Read More
                </Link>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }
  renderClickStatusFilter(name, value) {
    this.setState({
      isLoading: true,
      currentPage: 1,
      currentjobstatus: value,
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    };
    filter_data[name] = value;
    this.props.setFilters("job", filter_data);
    var _this = this;

    this.props.getJobStatus();
    this.props.getTotalJobs();
    this.props.getJobs(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }
  renderStatuswisejobs(statues, currentjobstatus) {
    if (statues !== undefined) {
      return statues.map((status) => {
    
        if (status?.job_status_id == currentjobstatus) {
          return (
            <button
              key={"jobs.all.status?." + status?.job_status_id}
              className={"btn btn-sm ml-2  mb-2 mx-2 btn-" + status?.color}
              onClick={() =>
                this.renderClickStatusFilter(
                  "filter_job_status",
                  status?.job_status_id
                )
              }
            >
              {status?.name}: {status?.total}
            </button>
          );
        } else {
          return (
            <button
              key={"jobs.all.status?." + status?.job_status_id}
              className={"btn btn-sm ml-2  mb-2 mx-2 btn-" + status?.color}
              onClick={() =>
                this.renderClickStatusFilter(
                  "filter_job_status",
                  status?.job_status_id
                )
              }
            >
              {status?.name}: {status?.total}
            </button>
          );
        }
      });
    }
  }
  render() {
    const { job_list, job_total, filter_job_status } = this.props;
    const { state } = this.props.location;
    const { isLoading, currentjobstatus, currentPage, sizePerPage } =
      this.state;

    if (
      job_list == undefined ||
      job_total == undefined ||
      filter_job_status == undefined
    ) {
      return (
        <div className="job-undefined">
          <Loading />
        </div>
      );
    }

    return (
      <div className="job-list">
        {isLoading ? <Loading /> : null}
        <div className="container">
          <div className="row">
            {filter_job_status != undefined && filter_job_status?.length > 0 ? (
              <div
                className={"filter-status-jobs pull-right mt-3 mb-3 text-right"}
              >
                <button
                  className="btn btn-secondary btn-sm  mb-2 mx-2 btn-back"
                  onClick={() => this.refresh()}
                >
                  <i className="fa fa-refresh"></i>
                  <span> Refresh</span>
                </button>
                {this.renderStatuswisejobs(filter_job_status, currentjobstatus)}
              </div>
            ) : null}
          </div>
          {job_list != undefined && job_list.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="row data-list">{this.renderJobs(job_list)}</div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-12">
                <div className="mt-2 mb-2">
                  <div className="card">
                  <div class="card-header d-sm-flex align-items-center justify-content-between mb-3">
                    <h5 class="mb-0 text-center text-sm-start">
                      Create Your Job
                    </h5>
                    <Link className="btn btn-outline-primary btn-sm btn-add-action" to="/account/job/add"><i className="fa fa-plus me-2 align-middle mt-n1"></i>Create Job</Link>
                  </div>
                    <div className=" text-center card-body p-2">
                      <div className="no-result">
                        <h5>No jobs found!</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row ">
            <div className="col-sm-12">
              {job_total > sizePerPage ? (
                <div className="card-pagination">
                  <div className="row">
                    <div className="col-sm-12 text-right">
                      <Pagination
                        pageRangeDisplayed={5}
                        activePage={currentPage}
                        itemsCountPerPage={sizePerPage}
                        totalItemsCount={job_total}
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
    job_list: state.account.job_list,
    job_total: state.account.job_total,
    filter_job_status: state.account.filter_job_status,
  };
}
export default connect(mapStateToProps, {
  getJobs,
  getTotalJobs,
  setFilters,
  getJobStatus,
})(AccountJob);
