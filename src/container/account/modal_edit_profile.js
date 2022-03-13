import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getProjects, updateCustomerProfile } from "../account/account_action";
import { input } from "../library/elements";
import { IMAGE_URL } from "../../system/config";
class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.removeModal = this.handleProfileSubmit.bind(this);
    this.state = {
      isLoading: false,
      isPasswordText: false,
      isPasswordConfirmText: false,
    };
  }
  componentWillMount() {
    this.props.getProjects();
  }
  handleProfileSubmit(formProps) {
    this.state = { isLoading: true };
    const data = new FormData();
    var keyName;
    var i = 0;
    var image = formProps.image;
    delete formProps.image;
    if (image) {
      data.append("file", image[0]);
    }
    for (var key in formProps) {
      data.append(key, JSON.stringify(formProps[key]));
    }
    var _this = this;
    this.props.updateCustomerProfile(data, function (err, result) {
      if (result) {
        _this.props.removeModal();
      }
    });
  }
  closeModal() {
    this.props.removeModal();
  }

  addDefaultSrc(ev) {
    return (ev.target.src =
      IMAGE_URL + "/" + "profile/User-default-image-boy.png");
  }

  renderPasswordMask(getState) {
    if (this.state[getState] == false) {
      this.setState({ [getState]: true });
    } else {
      this.setState({ [getState]: false });
    }
  }
  renderConfirmPasswordMask(getState) {
    if (this.state[getState] == false) {
      this.setState({ [getState]: true });
    } else {
      this.setState({ [getState]: false });
    }
  }
  renderProject(projects) {
    if (projects) {
      return projects.map((project) => {
        return (
          <option
            value={project.project_id}
            key={"project." + project.project_id}
          >
            {project.name}
          </option>
        );
      });
    } else {
      return <option value="0">Loading...</option>;
    }
  }
  render() {
    const { handleSubmit, errorMessage, projects } = this.props;
    var { isLoading, isPasswordText, isPasswordConfirmText } = this.state;

    if (errorMessage) {
      isLoading = false;
    }

    return (
      <div className="profile-modal model-card">
        <form
          onSubmit={handleSubmit(this.handleProfileSubmit.bind(this))}
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
              <div className="col-sm-12 text-center">
                <Field
                  name="image"
                  component={(image) => {
                    var showImage = null;
                    if (image.input.value && image.input.value !== "") {
                      showImage = (
                        <div className="pro-image">
                          <img
                            onError={this.addDefaultSrc}
                            src={
                              image.input.value.dataUrl
                                ? image.input.value.dataUrl
                                : image.input.value
                            }
                            className="m-l-10"
                            width="100"
                            height="100"
                          />
                          <div className="fileUpload md-btn btn btn-primary">
                            <span>Upload Profile Image</span>
                            <input
                              type="file"
                              name="image"
                              className="ml-2"
                              onChange={(e) => {
                                var files = e.target.files;
                                let reader = new FileReader();
                                let file = e.target.files[0];
                                reader.onload = function (e) {
                                  var picFile = e.target;
                                  files.dataUrl = picFile.result;
                                  image.input.onChange(files);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div>
                        {showImage !== null ? (
                          showImage
                        ) : (
                          <div className="fileUpload md-btn btn btn-primary">
                            <span>Upload Profile Image</span>
                            <input
                              type="file"
                              name="image"
                              className="m-l-20"
                              onChange={(e) => {
                                var files = e.target.files;
                                let reader = new FileReader();
                                let file = e.target.files[0];
                                reader.onload = function (e) {
                                  var picFile = e.target;
                                  files.dataUrl = picFile.result;
                                  image.input.onChange(files);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />{" "}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <Field
                  name="firstname"
                  type="text"
                  component={input}
                  label="First Name"
                  className="form-control"
                />
              </div>
              <div className="col-sm-6">
                <Field
                  name="lastname"
                  type="text"
                  component={input}
                  label="Last Name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3">
                <Field
                  name="email"
                  type="text"
                  component={input}
                  label="Email"
                  className="form-control"
                />
              </div>
              <div className="col-sm-6">
                <Field
                  name="phone"
                  type="text"
                  component={input}
                  label="Mobile or Phone"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="input-group">
                {isPasswordText ? (
                  <Field
                    name="password"
                    type="text"
                    component={input}
                    label="* Password"
                    className="form-control"
                  />
                ) : (
                  <Field
                    name="password"
                    type="password"
                    component={input}
                    label="* Password"
                    className="form-control"
                  />
                )}
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => this.renderPasswordMask("isPasswordText")}
                >
                  {isPasswordText ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-9">
                <div className="d-grid">
                <button
                  action="updateprofile"
                  type="submit"
                  disabled={isLoading}
                  className="md-btn btn btn btn-primary btn-block mb-2"
                >
                  <i className="fa fa-pencil-circle"></i>{" "}
                  {isLoading ? "Loading..." : "Update"}
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
  if (!formProps.firstname) {
    errors.firstname = "Required First Name";
  }
  if (!formProps.lastname) {
    errors.lastname = "Required Last Name";
  }
  if (!formProps.email) {
    errors.email = "Required Email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
  ) {
    errors.email = "Invalid Email Address";
  }

  if (!formProps.telephone) {
    errors.telephone = "Required Mobile";
  } else {
    if (isNaN(formProps.telephone)) {
      errors.telephone = "Mobile number must be numeric only!";
    } else if (formProps.telephone.length > 10) {
      errors.telephone = "Mobile number must be up to 10 digit!";
    }
  }

  if (
    formProps.password &&
    formProps.confirm_password &&
    formProps.password != formProps.confirm_password
  ) {
    errors.confirm_password = "Confirm must match to Password";
  }

  return errors;
}

function mapStateToProps(state) {
  var iniCus = {};
  if (state.account.profile) {
    iniCus = state.account.profile;
    iniCus.image = IMAGE_URL + state.account.profile.customer_image;
  }
  return {
    initialValues: iniCus,
    errorMessage: state.account.error,
    projects: state.account.projects,
  };
}

UpdateProfile = reduxForm({
  form: "updateprofile",
  validate: validate,
})(UpdateProfile);

export default connect(mapStateToProps, { updateCustomerProfile, getProjects })(
  UpdateProfile
);
