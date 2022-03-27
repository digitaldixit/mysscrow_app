import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loading,lib, PillsBox } from "../library/elements";
import { getContractorJobCounter,TotalCustomerRequests } from "./contractor_action";
import { setFilters } from "../common/common_action";
class AccountDashboard extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.setFilters("job", {});
    this.props.TotalCustomerRequests();
    this.props.getContractorJobCounter();
  }

  render() {
    const { contractor_profile,job_customer_requests,job_contractor_counters } = this.props;



    if (!contractor_profile) {
      return (
        <div className="container-fluid account-box m-b-1">
          <div className="row">
            <div className="col-sm-5"></div>
            <div className="col-sm-1">
              <Loading />
            </div>
            <div className="col-sm-5"></div>
          </div>
        </div>
      );
    }
 


    let sumallRequest = 0;
    let Requested = {};
    let Completed = {};
    let Processing = {};
     let Approve = {};
     let Decline = {};
    if (job_contractor_counters && job_contractor_counters?.length > 0) {
      sumallRequest = job_contractor_counters
        .map((item) => item.total)
        .reduce((prev, curr) => prev + curr, 0);


      
    }
    for (let i in job_contractor_counters) {
      if (job_contractor_counters[i].name === "Requested") {
        Requested = job_contractor_counters[i];
      }
      if (job_contractor_counters[i].name === "Completed") {
        Completed = job_contractor_counters[i];
      }
      if (job_contractor_counters[i].name === "Processing") {
        Processing = job_contractor_counters[i];
      }
      if (job_contractor_counters[i].name === "Approve") {
        Approve = job_contractor_counters[i];
      }
      if (job_contractor_counters[i].name === "Decline") {
        Decline = job_contractor_counters[i];
      }
    }
 
    return (
      <div className="profile-content d-flex flex-column h-100 rounded-3  card">
        
        <div className="d-sm-flex align-items-center justify-content-between  text-center text-sm-start card-header">
          <h4 className=" text-nowrap"> {lib.ucwords(
                  contractor_profile.firstname + " " + contractor_profile.lastname
                )}</h4>
          <Link
            className="btn btn-outline-primary btn-sm btn-add-action"
            to="/contractor/job"
          >
            <i className="fa fa-plus me-2 align-middle mt-n1"></i>Pick Job
          </Link>
        </div>
        <div className="dashboard-top-counter card-body">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="card alca-card-shadow card-counter-block">
                <div className="card-header border-0 bg-success   py-5 pl-4  rounded">
                  <h3 className="card-title  font-weight-bolder text-center text-white mb-5">
                    Jobs
                  </h3>
                </div>
                <div className="card-body card-connter-inner-body position-relative overflow-hidden">
                  <div className="card-connter-inner">
              
                    <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12  mb-4">
                    <PillsBox
                          icon={"money"}
                          title={"Customer Request"}
                          value={job_customer_requests?.total || 0}
                          color={"warning"}
                          link={{
                            pathname: "/contractor/job",
                            job_status_id: 3,
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6  mb-1">
                        <PillsBox
                          icon={Requested?.icon || "money"}
                          title={Requested?.display_title || "Requests on Jobs"}
                          value={Requested?.total || 0}
                          color={"primary"}
                          link={{
                            pathname: "/contractor/job",
                            job_status_id: Requested?.job_status_id || 6,
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6  mb-4">
                        <PillsBox
                          icon={Decline?.icon || "money"}
                          title={Decline?.display_title || "Decline Job Requests"}
                          value={Decline?.total || 0}
                          color={'danger'}
                          link={{
                            pathname: "/contractor/job",
                            job_status_id: Decline?.job_status_id || 2,
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6  mb-4 ">
                      <PillsBox
                          icon={"money"}
                          space={"mb-4"}
                          title={Approve?.display_title || "Approve Job"}
                          value={Approve?.total || 0}
                          color={"warning"}
                          link={{
                            pathname: "/contractor/job",
                            job_status_id: Approve?.job_status_id || 1,
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
                            pathname: "/contractor/job",
                            job_status_id: Completed?.job_status_id || 5,
                          }}
                        />

                       
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6 mb-4  ">
                      <PillsBox
                          icon={Processing?.icon || "money"}
                          title={Processing?.display_title || "Completed Jobs"}
                          value={Processing?.total || 0}
                          color={Processing?.color || "success"}
                          link={{
                            pathname: "/contractor/job",
                            job_status_id: Processing?.job_status_id || 4,
                          }}
                        />
                       
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <PillsBox
                          icon={"money"}
                          title={"Total Applied Jobs"}
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
                <div className="card-header border-0 bg-success   py-5 pl-4  rounded">
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
                          title={"Balance on Hold"}
                          value={10}
                          color={"warning"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <PillsBox
                          icon={"money"}
                          title={"Amount Received"}
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
    contractor_profile: state.contractor.contractor_profile,
    job_customer_requests: state.contractor.job_customer_requests,
    job_contractor_counters: state.contractor.job_contractor_counters,
    
  };
}

export default connect(mapStateToProps, { setFilters,getContractorJobCounter,TotalCustomerRequests})(
  AccountDashboard
);
