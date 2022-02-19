import React,  { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { modal } from '../library/elements/modal';

import { validationNull, getServiceStatus } from './provider_action';
import { input, Loading, textarea ,InputImage } from '../library/elements';
import { IMAGE_URL } from '../../system/config';
var dateFormat = require('dateformat');
class ModalViewTicketHistory extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading:false };
  }

  componentWillMount() {
    this.props.getServiceStatus();
  }
  closeModal(){
    this.props.removeModal();
  }

  renderServiceStatus(services){
    if(services) {
      return services.map((status) => {
        return(
          <option value={status.service_status_id} key={"service."+status.service_status_id}>{status.name}</option>
        );
      });
    } else {
      return (
        <option value="0">Loading...</option>
      )
    }
  }


renderHistoryImages(images){
  if(images.length){
    return images.map((image) => {
      console.log("-----image",image);
      return (
        <li className="card-stripe-ul-li" key={'images_'+image.ticket_service_image_id}>
          <div className="fileUpload btn btn-outline-default p-0">
            <img src={IMAGE_URL+image.image} className="" width='100' height='100' />
          </div>
        </li>

      );
    });
  }else{
    return(
        <div className="row text-center mt-3">
      <div className="col-sm-12 col-md-12 col-lg-12 text-cenetr">
             History Image Not Found
        </div>
    </div>
    );
  }
}
  render() {
    const { errorMessage, services,history  } = this.props;
    var isLoading = this.state.isLoading;

    if(errorMessage){
      isLoading = false;
    }
    if(!services){
      return (
        <div className="p-1">
          <Loading />
        </div>
      )
    }
    return (
      <div className="view-history">
    <div className="review-info">
    {isLoading ? <Loading /> : null  }
      <div className="row">
          <div className="col-sm-12">
            <div className="card-history-info card-comment">
                <div className="row mt-1">
                    <div className="col-sm-2">
                        <label className="control-label">Date :</label>
                    </div>
                    <div className="col-sm-10">
                      {dateFormat(history.date_added, "dd-mm-yyyy h:MM TT")}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label className="control-label">Status :</label>
                    </div>
                    <div className="col-sm-10">
                      <label  className="btn btn-sm btn-success"  style={{"fontSize":"13px", "background-color":"{'#'+history.status_color}"}}>{history.status}</label>
                    </div>
                </div>
                <div className="row">

                    <div className="col-sm-12">
                        <label className="control-label required">Comment :</label>
                      <div className="card-comment">

                        {history.comment}
                          </div>
                    </div>
                </div>
              </div>
          </div>
            <div className="form-group col-sm-12 mt-3">
              <div className="card-image">
                <table className="table mb-0">
                  <thead>
                  <tr>
                    <th width="500px"className="text-left">History Image</th>
                  </tr>
                  </thead>
                  <tbody>
                      <div className="card-stripe">
                        <ul className="card-stripe-ul">
                          {this.renderHistoryImages(history.history_mages)}
                        </ul>
                      </div>

                  </tbody>
                </table>
              </div>
            </div>
      </div>
    </div>
  </div>
   );
  }
}

ModalViewTicketHistory = reduxForm({
  form: 'formaddticketservice',
  enableReinitialize: true,
})(ModalViewTicketHistory);

function mapStateToProps(state, ownProps) {
  return {
    history: ownProps.history,
    services: state.provider.service_status,
  }
}

export default connect(mapStateToProps, { getServiceStatus })(ModalViewTicketHistory);
