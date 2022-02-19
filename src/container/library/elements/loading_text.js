import React, { Component } from 'react';

class LoadingText extends Component {

  render() {
    if(this.props.text){
      var text = this.props.text;
    } else {
      var text = "Loading...";
    }
    return (
      <div id="overlay" className="display-block">
        <div className="overlay-block">
           <div className="loader1">{text}</div>
        </div>
      </div>
    );
  }
}

export default LoadingText;
