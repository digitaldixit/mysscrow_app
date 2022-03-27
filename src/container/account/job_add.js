import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, FieldArray, reduxForm } from "redux-form";
import { input, InputImage, Loading, textarea,lib } from "../library/elements";
import { addCustomerJob, nullJobForm,validation } from "./account_action";

class AccountJobAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      set_job_phase: 0,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderJobPhases = this.renderJobPhases.bind(this);
  }

  handleFormSubmit(formProps) {
    this.setState({ isLoading: true });
    var _this = this;
    var data = new FormData();

    var phases = formProps["phase"];
    let dataPhaseArr = [];
    if (phases && phases != undefined && phases.length > 0) {
      for (let [index, val] of phases.entries() || []) {
        dataPhaseArr.push({
          description: val.description,
          amount: val.amount,
          phase_no: index + 1,
        });
        for (var i in val["image"]) {
          if (val["image"][i][["image"]] !== undefined) {
            data.append("phase[" + index + "]", val["image"][i]["image"][0]);
          }
        }
      }
    }

    var formData = {};
    formData.job_title = formProps.job_title || "";
    formData.job_description = formProps.job_description || "";
    formData.job_location = formProps.job_location || "";
    formData.job_amount = formProps.job_amount || 0;
    formData.job_phase = formProps.total_phase || "";
    if (dataPhaseArr && dataPhaseArr != undefined && dataPhaseArr.length > 0) {
      formData.phase = dataPhaseArr;
      if (window.performance) {
        if (performance.getEntriesByType("navigation")[0].type == "reload") {
          this.props.history.push("/account/job");
        }
      }
    }
    data.append("phase", JSON.stringify(formData));
    this.props.addCustomerJob(data, function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
        _this.props.history.push("/account/job");
      }
    });
  }

  renderJobPhases(addMoreImage) {
    if (
      this.state.set_job_phase &&
      this.state.set_job_phase != undefined &&
      this.state.set_job_phase > 0
    ) {
      let generate_phase = Array.from(
        Array(parseInt(this.state.set_job_phase)).keys()
      );

      return generate_phase.map((phase, index) => {
        return (
          <div
            className="card card-add-phase mt-2 mb-2"
            key={"service.card." + index}
          >
            <div className="card-header mb-1">
              <strong> Phase - {phase + 1} </strong>
            </div>
            <div className="card-body">
              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name={"phase[" + index + "][description]"}
                    type="text"
                    component={textarea}
                    className="form-control"
                    label="Phase Description"
                  />
                </div>
              </fieldset>
              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name={"phase[" + index + "][amount]"}
                    type="text"
                    component={input}
                    className="form-control"
                    label="Phase Amount"
                  />
                </div>
              </fieldset>
              <div className="card">
                <div className="card-header">Images </div>
                <div className="card-stripe p-2">
                  <FieldArray
                    name={"phase[" + index + "][image]"}
                    component={addMoreImage}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="mt-3 mb-3 card-step">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 mobile-center">
              <h4>Step 1 : Add Your Multiple Services</h4>
              <h4>Step 2 : Add Related Images</h4>
              <h4>Step 3 : Create Ticket</h4>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, errorMessage } = this.props;
    var { isLoading, set_job_phase } = this.state;

    if (errorMessage) {
      isLoading = false;
    }

    const addMoreImage = ({ fields, meta: { touched, error } }) => (
      <ul className="card-stripe-ul">
        {fields.map((item, index) => (
          <li key={"add_phase_" + index} className="card-stripe-ul-li">
            <span
              className="badge badge-danger remove-image text-danger"
              onClick={() => fields.remove(index)}
            >
              <i className="fa fa-close"></i>
            </span>
            <Field
              name={`${item}.image`}
              type="text"
              component={InputImage}
              label="Image"
              className="form-control"
            />
          </li>
        ))}
        <li
          className="card-stripe-ul-li add_image"
          onClick={() => fields.push({})}
        >
          <i className="fa fa-plus-circle fa-5x"></i>
        </li>
      </ul>
    );

    return (
      <div id="page" className=" job-add-page container">
        <div className="card">
          {isLoading ? <Loading /> : null}
          <div className="card-header">
            <h5>Create Job</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {errorMessage ? (
                <fieldset className="form-group">
                  <div className="col-sm-12 card-body">
                    <div className="alert alert-danger">{errorMessage}</div>
                  </div>
                </fieldset>
              ) : null}

              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name="job_title"
                    type="text"
                    component={input}
                    isRequired={true}
                    label="Job Title"
                  />
                </div>
              </fieldset>
              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name="job_description"
                    type="text"
                    component={textarea}
                    isRequired={true}
                    label="Job Description"
                  />
                </div>
              </fieldset>

              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name="job_location"
                    type="text"
                    component={input}
                    isRequired={true}
                    label="Job Location"
                  />
                </div>
              </fieldset>
              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name="job_amount"
                    type="text"
                    component={input}
                    isRequired={true}
                    label="Job Amount"
                  />
                </div>
              </fieldset>
              <fieldset className="form-group row">
                <div className="col-sm-12">
                  <Field
                    name="total_phase"
                    component={(total_phase) => (
                      <div>
                        <select
                          name="total_phase"
                          className="form-control"
                          value={total_phase.input.value}
                          onChange={(event) => {
                            this.setState({
                              set_job_phase: event.target.value,
                            });
                            total_phase.input.onChange(event.target.value);
                          }}
                        >
                          <option value="">-- Select Phase --</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        {total_phase.meta.touched &&
                          ((total_phase.meta.error && (
                            <div className="error">
                              {total_phase.meta.error}
                            </div>
                          )) ||
                            (total_phase.meta.warning && (
                              <div className="error">
                                {total_phase.meta.warning}
                              </div>
                            )))}
                      </div>
                    )}
                  />
                </div>
              </fieldset>

              {/* start phase block */}

              {set_job_phase && set_job_phase != undefined && set_job_phase > 0
                ? this.renderJobPhases(addMoreImage)
                : null}

              {/* end phase block */}
              <div className="form-group row">
                <div className="col-sm-9">
                  <div className="d-grid">
                    <button
                      action="addJob"
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
                    <Link
                      to="/account"
                      className="md-btn btn btn-danger btn-block"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.job_title) {
    errors.job_title = "Required Job Title";
  }
  if (!formProps.job_description) {
    errors.job_description = "Required Job Description";
  }
  if (!formProps.job_location) {
    errors.job_location = "Required Job location";
  }
  if (!formProps.total_phase) {
    errors.total_phase = "Select Job Phase";
  }
  if (isNaN(formProps.job_amount)) {
    errors.job_amount = "Job Amount number must be numeric only!";
  }
  return errors;
}

AccountJobAdd = reduxForm({
  form: "addJob",
  enableReinitialize: true,
  validate: validate,
})(AccountJobAdd);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
  };
}

export default withRouter(
  connect(mapStateToProps, {validation, addCustomerJob, nullJobForm })(
    AccountJobAdd
  )
);
