import React, { Component } from "react";
import Lightbox from "react-images";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../system/config";
import { lib, Loading } from "../library/elements";
import { getJobInfo } from "./account_action";
import UpdateContractorQuote from "./model_edit_contractor_quote";
import { modal } from "../library/elements/modal";
import cookie from "react-cookie";
import SignIn from "./signin";
class AccountJobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    if (!cookie.load("customer")) {
      return <SignIn />;
    }

    this.setState({ isLoading: true });
    var filter = {};
    filter.job_id = this.props.match.params.job_id;
    var _this = this;
    this.props.getJobInfo(filter, function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  editContractorQuoteModal(contractor) {
    contractor.job_id = this.props.job?.info?.job_id;
    contractor.customer_id = this.props.job?.info?.customer_id;
    contractor.job_approval_status = this.props.job?.info?.job_approval_status;
    modal.add(UpdateContractorQuote, {
      title: "Contractor Quote",
      size: "large",
      closeOnOutsideClick: false,
      hideCloseButton: false,
      contractorData: contractor,
      modalId: "edit-contractor-quote",
    });
  }
  renderJobContractorRequests(contractors) {
    return contractors.map((contractor, index) => {
      return (
        <div className="col-sm-3" key={"job_" + contractor?.contractor_id}>
          <Link
            className="job-link"
            onClick={() => this.editContractorQuoteModal(contractor)}
          >
            {contractor?.customer_quote_status != undefined &&
            contractor?.customer_quote_status ? (
              <span
                className={
                  contractor?.customer_quote_status === "approve"
                    ? "tag-offer badge bg-success right"
                    : "tag-offer badge bg-danger right"
                }
              >
                {contractor?.customer_quote_status}
              </span>
            ) : (
              ""
            )}
            <div className="single-services contractor-request-card no-shadow border text-center">
              <h3 className="text-secondary">
                {" "}
                {lib.ucwords(
                  contractor?.firstname + " " + contractor?.lastname
                )}
              </h3>
              <h3 className="text-success"> Rs.{contractor?.quote_amount}</h3>
              <div className="align-items-center mt-3">
                <div className="flex-grow-1"></div>
                <Link className="btn btn-outline-secondary btn-sm">
                  Read More
                </Link>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }
  renderJobPhases(phases) {
    if (phases && phases.length > 0) {
      phases.sort(function (a, b) {
        return a.phase_no - b.phase_no;
      });
      return phases.map((phase, index) => {
        return (
          <div
            className="card-body"
            key={"phase.card." + phase.phase_id + "." + index}
          >
            <div className="card phase-card">
              <div className="card-header">
                <strong>Phase - {phase.phase_no}</strong>
              </div>

              <div className="card-body">
                <div className="card border-0">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <tbody>
                          <tr className="mb-2">
                            <td className="first  border-top-0 font-weight-bold  h6 col-3">
                              Job Discription
                            </td>
                            <td className="second border-top-0 col-9 p-2">
                              {phase?.description}
                            </td>
                          </tr>
                          <tr>
                            <td className="first  font-weight-bold  h6 col-3">
                              Phase Amt :
                            </td>
                            <td className="second border-top-0 col-9">
                              Rs.{phase?.amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center mt-2 mb-2">
              <div className="card">
                <div className="card-body p-2">
                  <div className="no-result">
                    <h5>No Data found!</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }


  render() {
    const { job } = this.props;
    var { isLoading } = this.state;

    if (!job) {
      return <Loading />;
    }
    if (job && !job.no_result) {
      return (
        <div id="job-info-card">
          {isLoading ? <Loading /> : null}
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-job-info mb-3">
                  <div class="card-header d-sm-flex align-items-center justify-content-between mb-3">
                    <h3 class="mb-0 text-center text-sm-start">
                      Job Information
                    </h3>
                    <button class={"btn btn-"+job?.info?.job_status_color} type="button">
                      {job?.info?.job_status}
                    </button>
                  </div>

                  <div className="p-2">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card-body">
                          <div className="card">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody>
                                    <tr className="mb-2">
                                      <td className="first  border-top-0 font-weight-bold  h6 col-3">
                                        Job Discription
                                      </td>
                                      <td className="second border-top-0 col-9 p-2">
                                        {" "}
                                        {job?.info?.job_description}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Job Location :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {job?.info?.job_location}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Approx Amt :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        Rs.{job?.info?.job_amount}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        No.of Phases :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {job?.info?.job_phase}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold h6 col-3 border-bottom-0">
                                        Date oF Creation :
                                      </td>
                                      <td className="second col-9 border-bottom-0">
                                        {" "}
                                        <span className="">
                                          :{" "}
                                          <i className="fa fa-calendar mr-1"></i>
                                          {lib.dateFormat(
                                            job?.info?.date_added,
                                            "dd-mm-yyyy :h:MM TT"
                                          )}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Contractor Requests :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {" "}
                                        {job.contractor_requests != undefined &&
                                        job.contractor_requests.length
                                          ? job.contractor_requests.length
                                          : 0}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Approve Contractor :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {" "}
                                        {job.info.contractor_name != undefined &&
                                        job.info.contractor_name
                                          ? job.info.contractor_name
                                          : " "}
                                      </td>
                                    </tr>
                                    
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <h4>Job Phases Detail</h4>
              </div>
              <div className="row">
                <div className="col-sm-12 ">
                  {this.renderJobPhases(
                    job.phases
                  )}
                </div>
              </div>
            </div>
            {/* contractor */}
            <div className="card mb-3">
              <div className="card-header">
                <h4>
                  Job Contractor Request -{" "}
                  {job.contractor_requests != undefined &&
                  job.contractor_requests.length
                    ? job.contractor_requests.length
                    : 0}
                </h4>
              </div>
              <div className="card-body">
                {job.contractor_requests != undefined &&
                job.contractor_requests.length > 0 ? (
                  <div className="row">
                    {this.renderJobContractorRequests(job.contractor_requests)}
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center mt-2 mb-2">
                        <div className="card">
                          <div className="card-body p-2">
                            <div className="no-result">
                              <h5>No Data found!</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="job-info-card">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center mt-2 mb-2">
                <div className="card">
                  <div className="card-body p-2">
                    <div className="no-result">
                      <h5>No Info found!</h5>
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
}

function mapStateToProps(state) {
  return {
    job: state.account.job_info,
  };
}
export default connect(mapStateToProps, { getJobInfo })(AccountJobInfo);
