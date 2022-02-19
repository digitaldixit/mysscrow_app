import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { modal } from '../library/elements/modal';
import { Loading, lib } from '../library/elements';
import UpdateProfile from '../account/modal_edit_profile';
import { IMAGE_URL } from '../../system/config'
class TitLeBox extends Component {

  componentWillMount(){
    var pathFound = false;
  }
  addEditProfileModal() {
  modal.add(UpdateProfile, {
    title: "Edit Profile",
    size: 'large',
    closeOnOutsideClick: false,
    hideCloseButton: false,
    modalId: 'edit-profile',
  });
}

  render() {
    const { account_profile } = this.props;
    if(!account_profile) {
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

    if(account_profile.customer_image != undefined && account_profile.customer_image != null && account_profile.customer_image != "") {
      image = IMAGE_URL + "/" + account_profile.customer_image;
    } else {
      image =  'https://www.w3schools.com/howto/img_avatar.png';
    }

    return (
      <div className="uinfo">
        <div className="title-block text-center">
          <img className="img-thumbnail img-raised rounded-circle" src={image} width="100px" />
          <h4 className="sk-heading mt-2">
          { lib.ucwords(account_profile.firstname+" "+account_profile.lastname) }
            <button onClick={() => this.addEditProfileModal()} className="ml-2 btn btn-edit-profile btn-primary">
              <i className="fa fa-pencil"></i>
            </button>
            {}
          </h4>
        </div>
        <nav className="nav justify-content-center header-navigation">
          <Link className={"sk-heading nav-link "+ (currentLink == "/account" ? "active" : null) } to="/account"><i className=" hidden-md-down fa fa-desktop"></i> Dashboard</Link>
          <Link className={"sk-heading nav-link "+ ((currentLink == "/account/ticket") || (currentLink.indexOf("/account/ticket") >= 0)  ? "active" : null) } to="/account/ticket"><i className="hidden-md-down fa fa-ticket"></i> Active Tickets</Link>
          <Link className={"sk-heading nav-link"} to="/logout"><i className="fa fa-power-off"></i> Logout</Link>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      account_profile: state.account.profile,
  };
}

export default connect(mapStateToProps)(TitLeBox);
