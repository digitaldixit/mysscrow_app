import { format } from "date-fns";
import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { lib } from '../library/elements';
import { addTicketTiming } from './provider_action';
const required = value => value ? undefined : 'Required';
class ModalAddTicketTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      startDate: new Date()
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleFormSubmit(formProps) {
    var momentToDate = moment(formProps.appointment_date, "YYYY-MM-DD HH:mm");
    formProps.appointment_date = format(momentToDate._d, 'YYYY-MM-DD HH:mm');
    formProps.service_id = this.props.service_id;
    formProps.ticket_id = this.props.ticket_id;
    formProps.ticket_service_id = this.props.ticket_service_id;

    this.setState({ isLoading: false });
    var _this = this;
    this.props.addTicketTiming(formProps, function(err, result) {
      _this.setState({ isLoading: false });
      _this.props.reset('form_appointment');
      _this.props.removeModal();
    });
  }
  closeModal(){
    this.props.removeModal();
  }
  dateChange(e) {
    this.setState({isChangeDate: true});
    this.setState({isChangeTime: true});
    this.setState({datePickerDate: e._d});
    var momentToDate = moment(e, "YYYY-MM-DD HH:mm");
    this.setState({startDate: momentToDate._d});
    this.setState({startTime: momentToDate._d});
  }

  renderTimes(times) {
    return times.map((day_time) => {
      var OpenstrTime = day_time.open;
      var CloasestrTime = day_time.close;
      var open_close = OpenstrTime+' - '+CloasestrTime+' ';
      return open_close;
    });
  }

  rendorTiming(timing) {
    if(timing){
      return timing.map((day_time) => {
        var day = Object.keys(day_time)[0];
        var open_close = this.renderTimes(day_time[day]);

        day =  day.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function($1){
          return $1.toUpperCase();
        });

        if(day == lib.getTodayString({})){
          return (
            <div key={"time."+day}>
              <div className="btn btn-xs btn-outline-success" >{day} : {open_close} <i className="fa fa-check"></i></div>
            </div>
          )
        } else {
          return (
            <div key={"vendor.time."+day}>
              <div className="btn btn-xs btn-outline-secondary" >{day} : {open_close}</div>
            </div>
          )
        }
      });
    }
  }

  getTimeStops(start, end, interval){
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');

    if( endTime.isBefore(startTime) ){
      endTime.add(1, 'day');
    }

    var timeStops = [];
    //moment(todayDate+' '+timings[ti]['close'])
    while(startTime <= endTime){
      //timeStops.push(new moment(startTime).format('HH:mm'));
      timeStops.push(moment(moment().format("YYYY-MM-DD")+' '+new moment(startTime).format('HH:mm')));
      startTime.add(interval, 'minutes');
    }
    return timeStops;
  }


  render() {
    const { handleSubmit, setting  } = this.props;
    let { isLoading } = this.state;

    return (
      <div className="ticket-timing cm-frm">
              <div className="card-ticket-timing">
                  <form className="" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="form-group">
                      <label className="control-label">Select Date & Time
                      </label>
                      <Field name={`appointment_date`}
                        component={ appointment_date => {
                        return(
                          <div className="dt-picker">
                            <DatePicker
                              selected={!appointment_date.input.value ? null : moment(appointment_date.input.value)}
                              onChange={(event) => {
                                appointment_date.input.onChange(event);
                              }}
                              withPortal
                              minDate={moment()}
                              showTimeSelect
                              placeholderText="Choose an available date and time"
                              timeFormat="hh:mm A"
                              dateFormat="DD-MM-YYYY hh:mm a"
                            />
                          </div>
                        )
                      }} className="form-control" />
                    </div>
                    <div className="card-footerr sk-form">
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            action="form_tickettime"
                            disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
              </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {}
  //console.log("formProps>>>>>", formProps);
  if(!formProps.appointment_date || formProps.appointment_date == null){
    errors.appointment_date = "Please select appointment date"
  }
  return errors;
}

ModalAddTicketTime = reduxForm({
  form: 'form_tickettime',
  validate: validate
})(ModalAddTicketTime);

function mapStateToProps(state) {
  return {
    setting: state.common.settings,
  }
}

export default connect(mapStateToProps ,{ addTicketTiming })(ModalAddTicketTime);
