import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class CommonFooter extends Component {


  componentDidMount() {
    var _this = this
    $(window).scroll(function(){
      var winTop = $(window).scrollTop();
      //console.log(winTop+"=============");
      if(winTop >= 150){
        $('.scrolltop:hidden').stop(true, true).fadeIn();
      } else {
        $('.scrolltop').stop(true, true).fadeOut();
      }
    });
  }

    renderScrollTopEvent(){
      $("html, body").animate({ scrollTop: 0 }, 1000);
    }

  render() {
  const {  } = this.props;

    return (
      <div className="footer-area">
        <div className="scrolltop">
          <div className="scroll icon" onClick={() => this.renderScrollTopEvent() }>
            <i className="fa fa-4x fa-chevron-up"></i>
          </div>
        </div>
          <div className="hidden-md-down">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-3 col-md-6">
                              <div className="single-footer-title">
                                  <div className="logo">
                                    <Link to="/" className="logo">Mysscrow
</Link>
                                  </div>
                                  <p>Mysscrow have much planned for the future, working with great clients.</p>
                                  <ul className="social-links">
                                          <li><Link to=""><i className="fa fa-facebook"></i></Link></li>
                                          <li><Link to=""><i className="fa fa-twitter"></i></Link></li>
                                          <li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
                                          <li><Link to=""><i className="fa fa-linkedin"></i></Link></li>
                                          <li><Link to=""><i className="fa fa-pinterest"></i></Link></li>
                                  </ul>
                              </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                              <div className="single-footer-title">
                                  <h3>Contacts</h3>
                                  <ul className="footer-link-list">
                                    <li><span>Mobile:</span> <Link to="">+(91)-123456789</Link></li>
                                    <li><span>Phone:</span> <Link to="">+(91)-123456789</Link></li>
                                  </ul>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="single-footer-title">
                                    <h3>Email</h3>
                                    <ul className="footer-link-list">
                                        <li><Link to="">123456789@gmail.com</Link></li>
                                        <li><Link to="">info@123456789.com</Link></li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6">
                                  <div className="single-footer-title">
                                      <h3>Address</h3>
                                      <ul className="footer-link-list">
                                          <li>Your Address, US</li>
                                      </ul>
                                  </div>
                            </div>
                      </div>
                  </div>
                </div>
                  <div className="copyright-area">
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-12 col-md-12 text-center">
                                  <p className="m-0">Copyright @2022 Mysscrow. All rights reserved</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>



    );
  }
}
function mapStateToProps(state) {
  return {
   };
}
export default connect(mapStateToProps, { })(CommonFooter);
