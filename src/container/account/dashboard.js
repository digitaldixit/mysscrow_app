import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, PillsBox } from "../library/elements";

class AccountDashboard extends Component {
  constructor() {
    super();
  }

  render() {
    const { account_profile } = this.props;

    if (!account_profile) {
      return <Loading />;
    }

    return (
      <div className="profile-content d-flex flex-column h-100 rounded-3  card">
        <div className="d-sm-flex align-items-center justify-content-between  text-center text-sm-start card-header">
          <h4 className=" text-nowrap">Customer Dashboard</h4>
          <button className="btn btn-outline-primary btn-sm btn-add-action" type="button"><i className="fa fa-plus me-2 align-middle mt-n1"></i>Create Job</button>
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
                      <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                        <PillsBox
                          icon={"money"}
                          space={"mb-4"}
                          title={"Requests on Jobs"}
                          value={0}
                          color={"danger"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                        <PillsBox
                          icon={"cash"}
                          space={"mb-4"}
                          title={"On Going Jobs"}
                          value={10}
                          color={"primary"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                        <PillsBox
                          icon={"minecart-loaded"}
                          title={"Completed Jobs"}
                          value={10}
                          color={"success"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                        <PillsBox
                          icon={"people-fill"}
                          title={"Applied Jobs"}
                          value={10}
                          color={"warning"}
                          link={"/"}
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
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
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
                          icon={"exclude"}
                          title={"Amount Spent"}
                          value={10}
                          color={"primary"}
                          link={"/"}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <PillsBox
                          icon={"chat"}
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
  };
}

export default connect(mapStateToProps, {})(AccountDashboard);
