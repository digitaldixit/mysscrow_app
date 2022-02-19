import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CityLink extends Component {

  render() {
    //console.log(this.props);
    const { city_id } = this.props;
    var city_name = 'vadodara';
    if(city_id == 2){
      city_name = 'surat';
    }

    return (
      <Link to={"/"+ city_name +this.props.to } className={this.props.className} >
        {this.props.children}
      </Link>
    );
  }
}

function mapStateToProps(state) {
  return {
    city_id: state.app.city_id,
  }
}

export default connect(mapStateToProps)(CityLink);
