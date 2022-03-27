import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { input,textarea } from "../library/elements";
import { updateContractorQuote, validationNull } from "./contractor_action";
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
  handleCustomerSubmit(formProps) {
    this.state = { isLoading: true };

    var _this = this;
   let formData= {};
    formData.customer_id = this.props?.contractorData?.customer_id || 0;
    formData.job_id = this.props?.contractorData?.job_id || 0;
    formData.contractor_id = this.props?.contractorData?.contractor_id || 0;
    formData.quote_amount = formProps.quote_amt || 0;
    formData.contractor_remark = formProps.remark || "";
    
    this.props.updateContractorQuote(formData, function (err, result) {
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


<form
          onSubmit={handleSubmit(this.handleCustomerSubmit.bind(this))}
          className="df-form"
        >
          {errorMessage ? (
            <fieldset className="form-group">
              <div className="col-sm-12 card-body">
                <div className="alert alert-danger">{errorMessage}</div>
              </div>
            </fieldset>
          ) : null}

          <div className="cp-1">
           
            <div className="form-group row">
              <div className="col-sm-12">
                <Field
                  name="quote_amt"
                  type="text"
                  component={input}
                  label="* Quote Amount"
                  className="form-control"
                />
              </div>
              </div>
              <div className="form-group row">
              <div className="col-sm-12">
                <Field
                  name="remark"
                  type="text"
                  component={textarea}
                  label="Remark"
                  className="form-control"
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-9">
                <div className="d-grid">
                <button
                  action="updatecontractorquote"
                  type="submit"
                  disabled={isLoading}
                  className="md-btn btn btn btn-primary btn-block mb-2"
                >
                  <i className="fa fa-pencil-circle"></i>{" "}
                  {isLoading ? "Loading..." : "Add"}
                </button>
              </div>
              </div>
              <div className="col-sm-3">
              <div className="d-grid">
                <button
                  onClick={() => this.closeModal()}
                  type="button"
                  className="md-btn btn btn-danger btn-block"
                >
                  Cancel
                </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (!formProps.quote_amt) {
    errors.quote_amt = "Required";
  }
  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    contractorData: ownProps.contractorData,
    errorMessage: state.contractor.error,
  };
}

ContractorQuote = reduxForm({
  form: "updatecontractorquote",
  validate: validate,
})(ContractorQuote);

export default connect(mapStateToProps, {
  updateContractorQuote,
  validationNull,
})(ContractorQuote);
