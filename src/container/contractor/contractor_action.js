import axios from 'axios';
import cookie from 'react-cookie';
import * as config from '../../system/config';
import { lib } from '../library/elements';

export const CONTRACTOR_LOGIN_PHONE = 'CONTRACTOR_LOGIN_PHONE';
export const AUTHENTICATE_CONTRACTOR = 'AUTHENTICATE_CONTRACTOR';
export const UNAUTHENTICATE_CONTRACTOR = 'UNAUTHENTICATE_CONTRACTOR';
export const FETCH_CONTRACTOR_ACCOUNT_PROFILE = 'FETCH_CONTRACTOR_ACCOUNT_PROFILE';

export const FETCH_CONTRACTOR_JOB_LIST = 'FETCH_CONTRACTOR_JOB_LIST';
export const FETCH_CONTRACTOR_TICKET_TOTAL = 'FETCH_CONTRACTOR_TICKET_TOTAL';
export const FETCH_CONTRACTOR_JOB_COUNTERS = 'FETCH_CONTRACTOR_JOB_COUNTERS';

export const FETCH_STATUSWISE_JOBS = 'FETCH_STATUSWISE_JOBS';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const FETCH_JOB_INFO = 'FETCH_JOB_INFO';
export const GET_JOB_STATUS = 'GET_JOB_STATUS';
export const GET_CUSTOMER_REQUESTS = 'GET_CUSTOMER_REQUESTS';


export function login(formProps, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/account/login`,
      data: {
        props: formProps,
      },
    })
    .then(response => {
      cookie.remove('contractor', { path: '/' });
      if(response.data.contractor !== undefined && response.data.error === undefined){
        cookie.save('contractor', response.data.contractor, { path: '/' });
        dispatch( { type: AUTHENTICATE_CONTRACTOR, payload: response.data.contractor } );
         callback(null, true);
      }
      else {
        if(response.data.error == "OTP" && response.data.phone) {
          dispatch( { type: CONTRACTOR_LOGIN_PHONE, payload: response.data.phone } );
          callback(null, 'OTP');
        } else {
          dispatch(validation(response.data.error));
          callback(null, false);
        }
      }
    })
    .catch(response => {
      console.log("catch>>>>>", response);
    });
  }
}
export function register(formData, callback) {
  return function(dispatch) {
     dispatch(validationNull());
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/account/register`,
      data: {
        props: formData
      },
    })
    .then(response => {
      if(!response.data.error){
        dispatch( { type: CONTRACTOR_LOGIN_PHONE, payload: formData.phone } );
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      if(response != undefined && response.data.error != undefined){
        dispatch(validation(response.data.error));
      } else {
        dispatch(validation('Bad Signup Info'));
      }
    });
   }
}
export function loginOTP(formData, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor_loginotp`,
      data: {
        props: formData
      },
    })
    .then(response => {
      cookie.remove('contractor', { path: '/' });
      if(response.data.contractor !== undefined && response.data.error === undefined){
        cookie.save('contractor', response.data.contractor, { path: '/' });
        dispatch( { type: AUTHENTICATE_CONTRACTOR, payload: cookie.load('contractor') } );
        callback(null, response);
      } else {
        callback(null, response.data);
      }
    })
    .catch(error => {
      console.log(error);
    });
 }
}
export function otplogin(formProps, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/account/otp_login`,
      data: {
        props: formProps,
      },
    })
    .then(response => {
        if(!response.data.error) {
          dispatch( { type: CONTRACTOR_LOGIN_PHONE, payload: response.data.phone } );
          callback(null, true);
        } else {
          dispatch(validation(response.data.error));
          callback(null, false);
        }

    })
    .catch(response => {
      console.log("catch>>>>>", response);
    });
  }
}
export function resendOTP(phone, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor_resendotp`,
      data: {
        phone: phone
      },
    })
    .then(response => {
      console.log(response.data.error );
      if(response.data.error === undefined){
        lib.createAlert({message:'Your OTP has been send successfully'});
        callback(null, response);
      } else {
        callback(null, response.data);
      }
    })
    .catch(error => {
      console.log(error);
    });
 }
}
export function contractorlogout() {
  return function(dispatch) {
    cookie.remove('contractor', { path: '/' });
    dispatch( { type: UNAUTHENTICATE_CONTRACTOR } );
  }
}

export function getContractorProfile(){
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.API_URL}/contractor/account/profile`,
      headers: {
        contractor: cookie.load('contractor'),
      },
    })
    .then(response => {


      if(response != undefined && response.data != undefined && response.data.contractor_id != undefined && response.data.contractor_id > 0){
        dispatch( { type: FETCH_CONTRACTOR_ACCOUNT_PROFILE, payload: response} );
      } else {
        dispatch(contractorlogout());
      }
    })
    .catch(response => {
      if(response != undefined && response.data != undefined && response.data == "Unauthorized"){
        dispatch(contractorlogout());
      }
    });
  }
}
export function updateContractorProfile(data, callback){
  return function(dispatch) {
    dispatch(validationNull());
    axios.post(`${config.API_URL}/contractor/account/update_profile`, data, {
      headers: { contractor: cookie.load('contractor'), }
    })
    .then(response => {
      if(!response.data.error && response.data){
        lib.createAlert({message : 'Your Profile Has Been Update Successfully!'});
        dispatch( getContractorProfile());
        callback(null, true);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      dispatch(validation('Bad contractor Update'));
    });
  }
}
export function forgotPassword(email, callback) {
  return function(dispatch) {
    axios({
       method: 'post',
       url: `${config.API_URL}/contractor/account/forgot-password`,
       data: email,
      })
      .then(response => {
        if(!response.data.error){
          lib.createAlert({message : 'Your password reset link email has been sent to your email address, please check your email.'});
          callback(null, response);
        } else {
          dispatch(validation(response.data.error));
        }
      })
      .catch(response => {
        dispatch(validation(response.data.error));
      });
  }
}
export function getJobs(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.job != undefined){
      var filter_data = filters_state.job;
    }
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/job/list`,
      headers: {
       contractor: cookie.load('contractor'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_CONTRACTOR_JOB_LIST, payload: response } );

      callback(null, response);
    })
    .catch(response => {
      callback(true, null);
    });
  }
}

export function getTotalJobs() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.job != undefined){
      var filter_data = filters_state.job;
    }
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/Job/total`,
      headers: {
       contractor: cookie.load('contractor'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_CONTRACTOR_TICKET_TOTAL, payload: response } );
    })
    .catch(response => {
    });
  }
}
export function getJobDrpStatus(){
  return function(dispatch) {
    axios.get(`${config.API_URL}/job/status`)
    .then(response => {
      dispatch( { type: GET_JOB_STATUS, payload: response} );
    })
    .catch(response => {
    });
  }
}
export function TotalCustomerRequests(){
  return function(dispatch) {
    axios.get(`${config.API_URL}/job/customer_requests`)
    .then(response => {
      dispatch( { type: GET_CUSTOMER_REQUESTS, payload: response} );
    })
    .catch(response => {
    });
  }
}

export function getContractorJobCounter() {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/job/counters`,
      headers: {
        contractor: cookie.load('contractor'),
      }
    })
    .then(response => {
      dispatch( { type: FETCH_CONTRACTOR_JOB_COUNTERS, payload: response } );
    })
    .catch(response => {
      console.log(response);
    });
  }
}
export function getJobStatus() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.job != undefined){
      var filter_data = filters_state.job;
    }

    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/job/status_wise_jobs`,
      headers: {
        contractor: cookie.load('contractor'),
      },
      data: {
        filter: filter_data,
      }
    })
    .then(response => {
      dispatch( { type: FETCH_STATUSWISE_JOBS, payload: response } );
    })
    .catch(response => {
      console.log("ticket statuswise tickets error>>>>>>>>>>>", response);
    });
  }
}
export function getJobInfo(filter, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/contractor/job/info`,
      headers: {
        contractor: cookie.load('contractor'),
      },
      data: {
        option: filter,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_JOB_INFO, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      console.log("catch>>>>>", response);
    });
  }
}
export function updateContractorQuote(data, callback){
  var filter = {};
  filter.job_id = data.job_id;
  return function(dispatch) {
    dispatch(validationNull());

     axios({
      method: 'post',
      url: `${config.API_URL}/contractor/account/update_contractor_quote`,
      data: {
        data: data,
      },
      headers: { contractor: cookie.load('contractor'), }
    })
    .then(response => {
      if(!response.data.error && response.data){
        lib.createAlert({class:"danger" ,message : 'Status Has Been Update Successfully!'});
       
        dispatch(getJobInfo(filter,callback));
        callback(null, true);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      dispatch(validation('Bad contractor Update'));
    });
  }
}
export function validation(error) {
  return {
    type: VALIDATION_ERROR,
    payload: error
  }
}
export function validationNull() {
  return {
    type: VALIDATION_ERROR,
    payload: null
  }
}
