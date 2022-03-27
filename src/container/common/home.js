import React, { Component } from "react";
import { connect } from "react-redux";
var ReactRotatingText = require("react-rotating-text");
class CommonHome extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="common-home">
        <div className="first-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="first-section-content text-center cm-frm">
                  <h2
                    className="wow bounceIn  animated slide-text"
                    style={{
                      visibility: "visible",
                      "-webkit-animation-delay": "0.6s",
                      "-moz-animation-delay": "0.6s",
                      "animation-delay": "0.6s",
                      "animation-delay": "0.6s",
                    }}
                  >
                    {" "}
                    Mysscrow Help in{" "}
                    <ReactRotatingText
                      items={["Advertising", "Services", "Marketing"]}
                      pause={1500}
                      className="text-warning"
                      emptyPause={1000}
                      typingInterval={100}
                      deletingInterval={100}
                    />
                  </h2>
                  <div className="overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services-area bg ptb-100 text-center">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title">
                  <h3>We provide best services!</h3>
                  <p className="hidden-lg-down">
                    We enjoy adapting our strategies to offer every customer the
                    best solutions that are at the forefront of the industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-6">
                <div className="single-services">
                  <div className="icon">
                  <i className="icon-logo fa fa-handshake-o"></i>
                  </div>
                  <h3>Kitchen Services</h3>
                  <p className="hidden-lg-down">
                    Our new kitchen planner allows you to design your dream
                    kitchen and arrive at a rough quotation in a matter of
                    minutes.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6">
                <div className="single-services">
                  <div className="icon">
                  <i className="icon-logo fa fa-handshake-o"></i>
                  </div>
                  <h3>Bathroom Services</h3>
                  <p className="hidden-lg-down">
                    Planning your bathroom with our Bathroom Planner design tool
                    is easy and intuitive.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6">
                <div className="single-services">
                  <div className="icon">
                  <i className="icon-logo fa fa-handshake-o"></i>
                  </div>
                  <h3>Plumbing Services</h3>
                  <p className="hidden-lg-down">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6">
                <div className="single-services">
                  <div className="icon">
                  <i className="icon-logo fa fa-handshake-o"></i>
                  </div>
                  <h3>Electrical Services</h3>
                  <p className="hidden-lg-down">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6">
                <div className="single-services">
                  <div className="icon">
                  <i className="icon-logo fa fa-handshake-o"></i>
                  </div>
                  <h3>Painting Services</h3>
                  <p className="hidden-lg-down">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6">
                <div className="single-services">
                  <div className="icon">
                  <i className="icon-logo fa fa-handshake-o"></i>
                  </div>
                  <h3>Pest Conttrol Services</h3>
                  <p className="hidden-lg-down">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(CommonHome);
