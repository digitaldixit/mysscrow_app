import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAlertTop } from '../../common/common_action';

class AlertTop extends Component {
  removeAlert(){
    this.props.removeAlertTop();
  }

  render() {
    const { alert } = this.props;
    if(alert !== undefined && alert.message) {
      setTimeout(() => {
        this.removeAlert();
      }, 3000);

      return (
        <div className={"fixed-top text-center b-r-0 alert alert-"+alert.className}>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button>
          {alert.message}
        </div>
      )
    } else {
      return null;
    }

  }
}

function mapStateToProps(state) {
  return {
    alert: state.common.alert,
  }
}
export default connect(mapStateToProps, { removeAlertTop })(AlertTop);
