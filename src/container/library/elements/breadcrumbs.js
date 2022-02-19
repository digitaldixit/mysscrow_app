import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Breadcrumbs extends Component {

  renderBreadcrumb(breadcrumbs){
    return breadcrumbs.map((breadcrumb) => {      
      return(
        <li key={"breadcrumb."+breadcrumb.value}>
          <Link to={breadcrumb.value}>{breadcrumb.text}</Link>
        </li>
      );
    });
  }

  render() {
    const { breadcrumbs } = this.props;
    if(!breadcrumbs){
      return <div className="loading">Loading</div>
    }
    return (
      <ul className="breadcrumb">
        <li><Link to={"/"}><i className="fa fa-home"></i></Link></li>
        {this.renderBreadcrumb(breadcrumbs)}
      </ul>
    );
  }
}

export default Breadcrumbs;
