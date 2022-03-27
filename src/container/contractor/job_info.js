import React, { Component } from "react";
import Lightbox from "react-images";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../system/config";
import { lib, Loading } from "../library/elements";
import { getJobInfo } from "./contractor_action";
import UpdateContractorQuote from "./model_edit_contractor_quote";
import { modal } from "../library/elements/modal";
import cookie from "react-cookie";
import SignIn from "./signin";
class AccountJobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      photoLightboxIndex: 0,
      isLightboxOpen: false,
    };
  }

  componentDidMount() {
    if (!cookie.load("contractor")) {
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
    modal.add(UpdateContractorQuote, {
      title: "Contractor Quote",
      size: "large",
      closeOnOutsideClick: false,
      hideCloseButton: false,
      contractorData: contractor,
      modalId: "edit-contractor-quote",
    });
  }

  renderCustomerImages(customerimages) {
    const images = [];

    var images_data = customerimages.map((image, index) => {
      var thumb = "";
      if (image.image) {
        thumb = IMAGE_URL + image.image;
      }
      images.push(thumb);
      return (
        <li
          className="card-stripe-ul-li"
          key={image.job_phase_image_id + "." + index}
        >
          <Link className="icon zoom" title="Click to view" onClick={() => window.open(thumb, "_blank")}>
            <div className="fileUpload btn btn-outline-default p-0">
              <img src={thumb} className="" width="100" height="100" />
            </div>
          </Link>
        </li>
      );
    });
    return (
      <div className="panel-body">
        <ul className="thumbnails unstyled p-0" id="main-image">
          {images_data}
        </ul>
      </div>
    );
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

                {phase.images ? (
                  <div>
                    <div className="image-block p-3">Customer Images</div>
                    <div className="row">
                      <div className="card-stripe">
                        <ul className="card-stripe-ul">
                          {this.renderCustomerImages(phase.images)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null}
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
  renderHistories(histories){
    if(histories && histories.length > 0){
      return histories.map((history)=>{
        return(
          <tr key={'order_history_'+history.quote_history_id}>

            <td  className="text-center">{lib.dateFormat(history.date_added ,"dd-mm-yyyy :h:MM TT")}</td>
              <td className="text-center"> {lib.toHtml(history.contractor_remark)}</td>
              <td className="text-center"> {lib.toHtml(history.quote_amount)}</td>
            <td  className="text-center">
            <td  className="text-center"><span className={"badge bg-"+history.status_color}>{history.status_name}</span></td>
                      </td>
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
    const { job } = this.props;
    var { isLoading, photoLightboxIndex, isLightboxOpen } = this.state;

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
                      Customer Information
                    </h3>

                    {job?.histories &&job?.histories.length &&
                    job?.info?.job_status && job?.info?.job_status != "Requesting" &&  job?.info?.job_status != "Decline" ? (
                      <button class={"btn btn-"+job?.info?.job_status_color} type="button">
                      {job?.info?.job_status}
                    </button>
                    ) : (
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={() => this.editContractorQuoteModal(job)}
                      >
                        <i className="fa fa-plus me-2 align-middle mt-n1"></i>
                        Add Job Quote
                      </button>
                    )}
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
                                        Name
                                      </td>
                                      <td className="second border-top-0 col-9 p-2">
                                        {" "}
                                        {job?.info?.customer_name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Mobile :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {job?.info?.customer_phone}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Email :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {job?.info?.customer_email}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td className="first  font-weight-bold  h6 col-3">
                                        Address :
                                      </td>
                                      <td className="second border-top-0 col-9">
                                        {job?.info?.customer_address}
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
                <div className="card card-job-info mb-3">
                  <div class="card-header d-sm-flex align-items-center justify-content-between mb-3">
                    <h3 class="mb-0 text-center text-sm-start">
                      Job Information
                    </h3>
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
                                        Job Title
                                      </td>
                                      <td className="second border-top-0 col-9 p-2">
                                        {" "}
                                        {job?.info?.job_title}
                                      </td>
                                    </tr>
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
                                        Job Amount :
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
                                          
                                          <i className="fa fa-calendar mx-2"></i>
                                          {lib.dateFormat(
                                            job?.info?.date_added,
                                            "dd-mm-yyyy :h:MM TT"
                                          )}
                                        </span>
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
                <h4>Customer Job Phases Detail</h4>
              </div>
              <div className="row">
                <div className="col-sm-12 ">
                  {this.renderJobPhases(
                    job.phases,
                    photoLightboxIndex,
                    isLightboxOpen
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-job-info mb-3">
                  <div className="card-header d-sm-flex align-items-center justify-content-between mb-3">
                    <h4 className="mb-0 text-center text-sm-start">
                      Contractor Job Quote History
                    </h4>
                    {job?.histories &&job?.histories.length &&
                    job?.info?.job_status && job?.info?.job_status != "Requesting"  && job?.info?.job_status != "Decline"  ? (
                      <button class={"btn btn-"+job?.info?.job_status_color} type="button">
                      {job?.info?.job_status}
                    </button>
                    ) : (
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={() => this.editContractorQuoteModal(job)}
                      >
                        <i className="fa fa-plus me-2 align-middle mt-n1"></i>
                        Add Job Quote
                      </button>
                    )}
                  </div>
                  <div className="fcard-body fcard-padding">
                    <table className="table table-hover table-bordered table-striped df-table ticket-history hidden-md-down">
                      <thead>
                        <tr>
                         <th className="text-center">Date Added</th>
                          <th className="text-center">Remark</th>
                          <th className="text-center">Amount</th>
                          <th className="text-center">Status</th>
                        
                        </tr>
                      </thead>
                      <tbody>
                      { this.renderHistories(job?.histories) }

                      </tbody>
                    </table>
                  </div>
                </div>
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
    job: state.contractor.job_info,
  };
}
export default connect(mapStateToProps, { getJobInfo })(AccountJobInfo);
