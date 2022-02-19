import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {  Loading ,lib } from '../library/elements';

import { getPages } from './catalog_action';


class CatalogInformation extends Component {

  componentWillMount() {
    this.props.getPages('Information', function(err, result) {
    });
  }

  renderPages(pages){
    //console.log("pages>>>>", pages);
    if(pages.length > 0) {
      return pages.map((page)=>{
        var page_link='';
        if(page.keyword){
          page_link = "/page/"+page.keyword;
        } else {
          page_link = "/page/info/"+page.page_id;
        }
        return(
          <li className="" key={page.page_id}><Link  to={page_link}> {lib.htmlDecode(page.title)}</Link></li>
        );
      });
    } else {
      return(
        <div>
          <li className="list-group-item"><Link  to="">About Us</Link></li>
          <li className="list-group-item">><Link  to="">Return Polocy</Link></li>
          <li className="list-group-item"><Link  to="">Terms & Condition</Link></li>
        </div>
      );
    }
  }

  renderMobilePages(pages){
    if(pages.length > 0) {
      return pages.map((page) => {
        var   page_link = "/page/info/"+page.page_id;
        return(
          <li className="footer-link list-group-item" key={page.page_id}><Link  className="footer-link" to={page_link}>{page.title}</Link></li>
        );
      });
    } else {
      return(
        <div>
          <li><Link  to="">About Us</Link></li>
          <li><Link  to="">Return Polocy</Link></li>
          <li><Link  to="">Terms & Condition</Link></li>
        </div>
      );
    }
  }

  render() {
    const { pages, is_mobile } = this.props;
    if(!pages) {
      return (
        <div>Loading..</div>
      );
    }
    if(is_mobile != undefined && is_mobile == true){
      return (
        <ul className="list-group">
          {this.renderMobilePages(pages)}
        </ul>
      );
    } else {
      return (
        <ul className="footer-link-list p-0">
          {this.renderPages(pages)}
        </ul>
      );
    }
  }
}



//export default CommonFooter;
function mapStateToProps(state) {
  return {
    pages: state.catalog.pages
  }
}
export default connect(mapStateToProps,{getPages})(CatalogInformation);
