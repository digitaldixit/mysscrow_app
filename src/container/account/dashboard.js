import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cookie from "react-cookie";
import {  PillsBox } from "../library/elements";
import { getJobStatus } from "./account_action";
import { setFilters } from "../common/common_action";
class AccountDashboard extends Component {
  constructor() {
    super();
  }

  
  componentDidMount() {
    this.props.setFilters("job", {});
    this.props.getJobStatus();
    if (cookie.load("customer")) {
      this.props.history.push("/account");
    }
  }
  render() {
    const { account_profile, filter_job_status } = this.props;
 
    let sumallRequest = 0;
    let Requesting = {};
    let Completed = {};
    let Processing = {};
    let approve = {};
    if (filter_job_status && filter_job_status?.length > 0) {
      sumallRequest = filter_job_status
        .map((item) => item.total)
        .reduce((prev, curr) => prev + curr, 0);
    }
    for (let i in filter_job_status) {
      if (filter_job_status[i].name === "Requesting") {
        Requesting = filter_job_status[i];
      }
      if (filter_job_status[i].name === "Completed") {
        Completed = filter_job_status[i];
      }
      if (filter_job_status[i].name === "Processing") {
        Processing = filter_job_status[i];
      }
      if (filter_job_status[i].name === "Approve") {
        approve = filter_job_status[i];
      }
    }

    return (
      <div className="profile-content d-flex flex-column h-100 rounded-3  card">
        <div className="d-sm-flex align-items-center justify-content-between  text-center text-sm-start card-header">
          <h4 className=" text-nowrap">Customer Dashboard</h4>
          <Link
            className="btn btn-outline-primary btn-sm btn-add-action"
            to="/account/job/add"
          >
            <i className="fa fa-plus me-2 align-middle mt-n1"></i>Create Job
          </Link>
        </div>
        <div className="dashboard-top-counter card-body">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="card alca-card-shadow card-counter-block">
                <div className="card-header border-0 bg-danger py-5 pl-4  rounded">
                  <h3 className="card-title  font-weight-bolder text-center text-white mb-5">
                    Jobs
                  </h3>
                </div>
                <div className="card-body card-connter-inner-body position-relative overflow-hidden">
                  <div className="card-connter-inner">
              
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6  mb-4">
                        <PillsBox
                          icon={Requesting?.icon || "money"}
                          title={Requesting?.display_title || "Request for Jobs"}
                          value={Requesting?.total || 0}
                          color={Requesting?.color || "danger"}
                          link={{
                            pathname: "/account/job",
                            job_status_id: Requesting?.job_status_id || 3,
                          }}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-6 mb-4">
                      <PillsBox
                          icon={"money"}
                          space={"mb-4"}
                          title={approve?.display_title || "Approve Job"}
                          value={approve?.total || 0}
                          color={"success"}
                          link={{
                            pathname: "/account/job",
                            job_status_id: approve?.job_status_id || 1,
                          }}
                        />

                       
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-6  mb-4">
                      <PillsBox
                          icon={Completed?.icon || "money"}
                          title={Completed?.display_title || "On Going Jobs"}
                          value={Completed?.total || 0}
                          color={Completed?.color || "primary"}
                          link={{
                            pathname: "/account/job",
                            job_status_id: Completed?.job_status_id || 5,
                          }}
                        />

                       
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <PillsBox
                          icon={Processing?.icon || "money"}
                          title={Processing?.display_title || "Completed Jobs"}
                          value={Processing?.total || 0}
                          color={Processing?.color || "success"}
                          link={{
                            pathname: "/account/job",
                            job_status_id: Processing?.job_status_id || 4,
                          }}
                        />
                       
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <PillsBox
                          icon={"money"}
                          title={"Applied Jobs"}
                          value={sumallRequest}
                          color={"warning"}
                         
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div className="card alca-card-shadow card-counter-block">
                <div className="card-header border-0 bg-danger py-5 pl-4  rounded">
                  <h3 className="card-title  font-weight-bolder text-center text-white mb-5">
                    My Wallet
                  </h3>
                </div>
                <div className="card-body card-connter-inner-body position-relative overflow-hidden">
                  <div className="card-connter-inner">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                        <PillsBox
                          icon={"money"}
                          space={"mb-4"}
                          title={"Balance"}
                          value={10}
                          color={"warning"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <PillsBox
                          icon={"money"}
                          title={"Amount Spent"}
                          value={10}
                          color={"primary"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <PillsBox
                          icon={"money"}
                          title={"Total Amount"}
                          value={10}
                          color={"danger"}
                          link={"/"}
                        />
                      </div>
                    </div>
                  </div>
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
  return {
    account_profile: state.account.profile,
    filter_job_status: state.account.filter_job_status,
  };
}

export default connect(mapStateToProps, { getJobStatus, setFilters })(
  AccountDashboard
);
