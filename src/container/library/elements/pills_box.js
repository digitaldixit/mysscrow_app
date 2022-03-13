import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PillsBox extends Component {

  render() {
    const { icon, title, value, link, color,space } = this.props;

    if (link) {
      return (

        <div className={"card card-counter border-0 rounded  bg-light-" + color+' '+space}>
          <Link to={link}>
            <div className="card-body">
              <h1 className="card-counter-icon"> <i className={"text-" + color + " fa fa-" + icon}></i><div className={"pull-right text-" + color}>{value}</div></h1>
              <h5 className={"font-weight-bold text-"+color}>{title}</h5>
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className={"card card-counter border-0 rounded bg-light-" + color+' '+space}>
        
            <div className="card-body">
              <h1 className="card-counter-icon"> <i className={"text-" + color + " bi bi-" + icon}></i><div className={"pull-right text-" + color}>{value}</div></h1>
              <h5 className="text-primary font-weight-bold">{title}</h5>
            </div>
   
        </div>
      );
    }
  }
}

export default PillsBox;
