import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { modal } from "../library/elements/modal";
import cookie from "react-cookie";
import { Loading, lib } from "../library/elements";
import UpdateProfile from "./modal_edit_profile";
import { IMAGE_URL } from "../../system/config";

class ContractorHeader extends Component {


  componentDidMount() {
    if (!cookie.load("contractor")) {
      this.props.history.push("/contractor");
    }
  }
  addEditProfileModal() {
    modal.add(UpdateProfile, {
      title: "Edit Contractor Profile",
      size: "large",
      closeOnOutsideClick: false,
      hideCloseButton: false,
      modalId: "edit-profile",
    });
  }
  render() {
    const { contractor_profile } = this.props;
    var image;
    if (
      contractor_profile &&
      contractor_profile.contractor_image != undefined &&
      contractor_profile.contractor_image != null &&
      contractor_profile.contractor_image != ""
    ) {
      image = IMAGE_URL + "/" + contractor_profile?.contractor_image;
    } else {
      image = "https://www.w3schools.com/howto/img_avatar.png";
    }
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

    var currentLink = this.props.location.pathname;
    return (
      <div className="rounded-3 profile-menu card bg-light">
        <div className="px-4 py-4 d-none d-xl-block">
          <div className="d-block d-sm-flex align-items-center text-center1">
            <div className="avatar-card">
              <img
                className="img-thumbnail img-raised rounded-circle"
                src={image}
                width="100px"
              />
            </div>
            <div className="ps-sm-4 text-center text-sm-start">
              <h5 className="mb-1">
                {lib.ucwords(
                  contractor_profile.firstname + " " + contractor_profile.lastname
                )}
              </h5>
              <div className="p mb-0 fs-ms">{contractor_profile.email}</div>
              <div className="p mb-0 fs-ms">{contractor_profile.telephone}</div>
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => this.addEditProfileModal()}
                type="button"
              >
                <i className="fa fa-pencil me-2"></i>Edit
              </button>
            </div>
          </div>
        </div>
        <nav className="mobile-customer-header navbar navbar-expand-lg navbar-light d-xl-none">
          <div className="container-xl p-0 py-2">
            <div className="d-flex align-items-center">
              <button
                className="navbar-toggler me-2 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#accountMenu"
                aria-controls="accountMenu"
                aria-expanded="true"
                aria-label="Menu"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="ps-sm-4 text-sm-start">
                <h5 className="mb-1">
                  {lib.ucwords(
                    contractor_profile.firstname + " " + contractor_profile.lastname
                  )}
                </h5>
                <div className="p mb-0 fs-ms">{contractor_profile.email}</div>
                <div className="p mb-0 fs-ms">{contractor_profile.telephone}</div>
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() => this.addEditProfileModal()}
                  type="button"
                >
                  <i className="fa fa-pencil me-2"></i>Edit
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="d-lg-block collapse" id="accountMenu">
          <div className="d-flex align-items-center justify-content-between py-3 px-4 bg-secondary d-xl-none">
            <h5 className="m-0">Account Menu</h5>
            <button
              className="btn-close collapsed"
              id="btnCloseAccountMenu"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accountMenu"
              aria-controls="accountMenu"
              aria-expanded="false"
              aria-label="Menu"
            ></button>
          </div>
          <Link
            className={
              "account-menu-item d-flex align-items-center nav-link-style" +
              (currentLink == "/contractor_account" ? " active " : "")
            }
            to="/contractor_account"
          >
            <i className="fa fa-laptop fs-lg opacity-60 me-2"></i>Dashboard
          </Link>
          <Link
            className={
              "account-menu-item d-flex align-items-center nav-link-style" +
              (currentLink == "/contractor/job" ||
              currentLink.indexOf("/contractor/job") >= 0
                ? " active"
                : "")
            }
            to="/contractor/job"
          >
            <i className="fa fa-list fs-lg opacity-60 me-2"></i>Pick Job
          </Link>

          <Link
            className="account-menu-item d-flex align-items-center nav-link-style"
            to="/contractor_logout"
          >
            <i className="fa fa-power-off   fs-lg opacity-60 me-2"></i>
            Logout
          </Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    contractor_profile: state.contractor.contractor_profile,
  };
}

export default connect(mapStateToProps)(ContractorHeader);
