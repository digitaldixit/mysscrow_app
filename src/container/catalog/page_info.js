import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPageInfo } from './catalog_action';
import {  Loading ,lib } from '../library/elements';

class CatalogPageInformation extends Component {
  constructor() {
  	super();
    this.state = { isLoading:false };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentWillMount() {
    this.setState({isLoading: true});
    var _this = this;
    var pageData = {};
    pageData.keyword = this.props.params.keyword;
    pageData.page_id = this.props.params.page_id;
    this.props.getPageInfo(pageData, function(err, result) {
      if(result) {
        _this.setState({isLoading: false});
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.page_id !== this.props.params.page_id  || nextProps.params.keyword !== this.props.params.keyword){
      this.setState({ isLoading: true });
      var _this = this;
      var _nextProps = nextProps;
      var pageData = {};
      pageData.keyword = nextProps.params.keyword;
      pageData.page_id = nextProps.params.page_id;
      this.props.getPageInfo(pageData, function(err, result) {
         if(result) {
           _this.setState({isLoading: false});
         }
      });
     }
  }

  render() {
    const { pageinfo } = this.props;
    const isLoading = this.state.isLoading;

    if(!pageinfo) {
      return (
        <div className="footer"><Loading/></div>
      );
    }
    return (
        <div className="page-info">
        { isLoading ? <Loading /> : null }
        <div className="container">
          <div className="row">
  				  <div id="content" className="col-sm-12">
              <div className="card-page-content mt-3 mb-3">
            		<div className="card-page-description">
                  <div className="card page p-3 text-center">
                    <h2>{pageinfo.title}</h2>
                    <div className="card-block p-0">
                    {lib.Decodetohtml(pageinfo.description)}
                    </div>
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



//export default CommonFooter;
function mapStateToProps(state) {
  return {
    pageinfo: state.catalog.pageinfo,
  }
}
export default connect(mapStateToProps,{getPageInfo})(CatalogPageInformation);
