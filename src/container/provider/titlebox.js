import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { modal } from '../library/elements/modal';
import { Loading, lib } from '../library/elements';
import UpdateProviderProfile from './modal_edit_provider_profile';

class ProviderTitLeBox extends Component {

  addEditProviderProfileModal() {

  modal.add(UpdateProviderProfile, {
    title: "Edit Profile",
    size: 'large',
    closeOnOutsideClick: false,
    hideCloseButton: false,
    modalId: 'edit-profile',
  });
}

  render() {
    const { provider_profile } = this.props;
    if(!provider_profile) {
      return (
        <div className="container">
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
    var image;
      image =  'https://www.w3schools.com/howto/img_avatar.png';

    return (
      <div className="uinfo">
        <div className="title-block text-center">
          <img className="img-thumbnail img-raised rounded-circle" src={image} width="100px" />
          <h4 className="sk-heading mt-2">
            { lib.ucwords(provider_profile.firstname+" "+provider_profile.lastname) }
            <button onClick={() => this.addEditProviderProfileModal()} className="ml-2 btn btn-edit-profile btn-primary">
              <i className="fa fa-pencil"></i>
            </button>
          </h4>
        </div>
        <nav className="nav justify-content-center header-navigation provider-main-menu m-0">
          <Link className={"sk-heading nav-link "+ (currentLink == "/provider" ? "active" : null) } to="/provider"><i className="hidden-md-down fa fa-desktop"></i> Dashboard</Link>
          <Link className={"sk-heading nav-link "+ ((currentLink == "/provider/ticket") || (currentLink.indexOf("/provider/ticket") >= 0)  ? "active" : null) } to="/provider/ticket"><i className=" hidden-md-down fa fa-ticket"></i> Active Tickets</Link>
          <Link className={"sk-heading nav-link"} to="/provider_logout"><i className="fa fa-power-off"></i> Logout</Link>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      provider_profile: state.account.provider_profile,
  };
}

export default connect(mapStateToProps)(ProviderTitLeBox);
