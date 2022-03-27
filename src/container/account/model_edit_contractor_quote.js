import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { lib, Loading } from "../library/elements";
import { updateJobStatusbyCustomer, validationNull } from "./account_action";
class ContractorQuote extends Component {
  constructor(props) {
    super(props);
    this.handleCustomerSubmit = this.handleCustomerSubmit.bind(this);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount() {
    this.props.validationNull();
  }
  handleCustomerSubmit(status,status_id) {
    this.state = { isLoading: true };

    var _this = this;
   let formData= {};
    formData.customer_id = this.props?.contractorData?.customer_id || 0;
    formData.job_id = this.props?.contractorData?.job_id || 0;
    formData.contractor_id = this.props?.contractorData?.contractor_id || 0;
    formData.status = status;
    formData.status_id = status_id;
    this.props.updateJobStatusbyCustomer(formData, function (err, result) {
      if (result) {
        _this.props.removeModal();
      }
    });
  }
  closeModal() {
    this.props.removeModal();
  }

  render() {
    const { handleSubmit, errorMessage, contractorData } = this.props;
    var { isLoading } = this.state;

    if (errorMessage) {
      isLoading = false;
    }

    return (
      <div className="profile-modal model-card">
        {errorMessage ? (
          <fieldset className="form-group">
            <div className="col-sm-12 card-body">
              <div className="alert alert-danger">{errorMessage}</div>
            </div>
          </fieldset>
        ) : null}

        <div className="contractor-form">
          <div className="card border-0">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table mb-0">
                  <tbody>
                    <tr className="mb-2">
                      <td className="first  border-top-0 font-weight-bold  h6 col-3 ">
                        Name :
                      </td>
                      <td className="second border-top-0 col-9 p-2">
                        {" "}
                        {lib.ucwords(
                          contractorData?.firstname +
                            " " +
                            contractorData?.lastname
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="first  font-weight-bold  h6 col-3">
                        Skill :
                      </td>
                      <td className="second border-top-0 col-9">
                      {contractorData.skill && contractorData.skill  != undefined ? contractorData.skill : " - "}
                      </td>
                    </tr>
                    <tr>
                      <td className="first  font-weight-bold  h6 col-3">
                        Website :
                      </td>
                      <td className="second border-top-0 col-9">
                        {contractorData.website && contractorData.website  != undefined ? contractorData.website : " - "}
                      </td>
                    </tr>

                    <tr>
                      <td className="first  font-weight-bold  h6 col-3">
                        Address :
                      </td>
                      <td className="second border-top-0 col-9">
                        {contractorData?.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="first  font-weight-bold h6 col-3 border-bottom-0">
                        Phone :
                      </td>
                      <td className="second col-9 border-bottom-0">
                        {" "}
                        <span className="">
                          <i className="fa fa-phone mx-1 "></i>

                          {contractorData?.phone}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="first  font-weight-bold  h6 col-3">
                        Email :
                      </td>
                      <td className="second border-top-0 col-9">
                        <span className="">
                          {" "}
                          <i className="fa fa-envelope mx-1 "></i>{" "}
                          {contractorData?.email}
                        </span>
                      </td>
                    </tr>
                    <tr className="mb-2">
                      <td className="first  border-top-0 font-weight-bold  h6 col-3">
                        Remarks :
                      </td>
                      <td className="second border-top-0 col-9 p-2">
                        {" "}
                        {contractorData?.contractor_remark}
                      </td>
                    </tr>
                    <tr className="mb-2">
                      <td className="first  border-top-0 font-weight-bold  h6 col-3">
                        Quoted amount :
                      </td>
                      <td className="second border-top-0 col-9 p-2">
                        {" "}
                        Rs. {contractorData?.quote_amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-9">
              <div className="d-grid">
                <button
                  disabled={contractorData && contractorData?.job_approval_status === "approve" ? true : false}
                  className="md-btn btn btn btn-primary btn-block mb-2"
                  onClick={() => this.handleCustomerSubmit("approve",1)}
                >
                  <i className="fa fa-pencil-circle"></i>{" "}
                  {isLoading ? "Loading..." : "Approve"}
                </button>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="d-grid">
                <button
                  disabled={contractorData && contractorData?.job_approval_status === "approve" ? true : false}
                  className="md-btn btn btn btn-danger mb-2"
                  onClick={() => this.handleCustomerSubmit("decline",2)}
                >
                  <i className="fa fa-pencil-circle"></i>{" "}
                  {isLoading ? "Loading..." : "Decline"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    contractorData: ownProps.contractorData,
    errorMessage: state.account.error,
  };
}

ContractorQuote = reduxForm({
  form: "updatecontractorquote",
})(ContractorQuote);

export default connect(mapStateToProps, {
  updateJobStatusbyCustomer,
  validationNull,
})(ContractorQuote);
