import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL } from '../../system/config';
import { lib } from '../library/elements';
export const AUTHENTICATE_CUSTOMER = 'AUTHENTICATE_CUSTOMER';
export const UNAUTHENTICATE_CUSTOMER = 'UNAUTHENTICATE_CUSTOMER';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const FETCH_ACCOUNT_PROFILE = 'FETCH_ACCOUNT_PROFILE';
export const CUSTOMER_LOGIN_PHONE = 'CUSTOMER_LOGIN_PHONE';
// PROVIDER

export const FETCH_JOB_TOTAL = 'FETCH_JOB_TOTAL';
export const FETCH_JOB_LIST = 'FETCH_JOB_LIST';
export const FETCH_STATUSWISE_JOBS = 'FETCH_STATUSWISE_JOBS';
export const NULL_JOB_FORM = 'NULL_JOB_FORM';
export const FETCH_JOB_INFO = 'FETCH_JOB_INFO';

// customer action code 
export function login(formProps, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${API_URL}/customer/account/login`,
      data: {
        props: formProps,
      },
    })
    .then(response => {
      cookie.remove('customer', { path: '/' });
      if(response.data.customer !== undefined && response.data.error === undefined){
        cookie.save('customer', response.data.customer, { path: '/' });
        dispatch( { type: AUTHENTICATE_CUSTOMER, payload: response.data.customer } );
         callback(null, true);
      }
      else {
        if(response.data.error == "OTP" && response.data.phone) {
          dispatch( { type: CUSTOMER_LOGIN_PHONE, payload: response.data.phone } );
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
      url: `${API_URL}/customer/account/register`,
      data: {
        props: formData
      },
    })
    .then(response => {
      if(!response.data.error && response.data.customer){
        dispatch( { type: CUSTOMER_LOGIN_PHONE, payload: formData.phone } );
        callback(null, true);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      console.log("catch>>>>>", response);
    });
   }
}
export function loginOTP(formData, callback) {
    return function(dispatch) {
      axios({
        method: 'post',
        url: `${API_URL}/customer_loginotp`,
        data: {
          props: formData
        },
      })
      .then(response => {
        cookie.remove('customer', { path: '/' });
        if(response.data.customer !== undefined && response.data.error === undefined){
          cookie.save('customer', response.data.customer, { path: '/' });
          dispatch( { type: AUTHENTICATE_CUSTOMER, payload: cookie.load('customer') } );
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
export function resendOTP(phone, callback) {
    return function(dispatch) {
      axios({
        method: 'post',
        url: `${API_URL}/customer_resendotp`,
        data: {
          phone: phone
        },
      })
      .then(response => {
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
export function otplogin(formProps, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${API_URL}/customer/account/otp_login`,
      data: {
        props: formProps,
      },
    })
    .then(response => {
        if(!response.data.error) {
          dispatch( { type: CUSTOMER_LOGIN_PHONE, payload: response.data.phone } );
        //  browserHistory.push('/otp');
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
export function forgotPassword(email, callback) {
  return function(dispatch) {
    axios({
       method: 'post',
       url: `${API_URL}/customer/account/forgot-password`,
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
export function getProfile(){
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${API_URL}/customer/account/profile`,
      headers: {
       customer: cookie.load('customer'),
      },
    })
    .then(response => {


      if(response != undefined && response.data != undefined && response.data.customer_id != undefined && response.data.customer_id > 0){
        dispatch( { type: FETCH_ACCOUNT_PROFILE, payload: response} );
      } else {
        dispatch(logout());
      }
    })
    .catch(response => {
      if(response != undefined && response.data != undefined && response.data == "Unauthorized"){
        dispatch(logout());
      }
    });
  }
}
export function updateCustomerProfile(data, callback){
  return function(dispatch) {
    dispatch(validationNull());
    axios.post(`${API_URL}/customer/account/update_profile`, data, {
      headers: { customer: cookie.load('customer'), }
    })
    .then(response => {
      //console.log("response>>>>>", response);
      if(!response.data.error && response.data){
        lib.createAlert({message : 'Your Profile Has Been Update Successfully!'});
        dispatch( getProfile());
        callback(null, true);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      dispatch(validation('Bad customer Update'));
    });
  }
}
export function updateJobStatusbyCustomer(data, callback){
  var filter = {};
  filter.job_id = data.job_id;
  return function(dispatch) {
    dispatch(validationNull());

     axios({
      method: 'put',
      url: `${API_URL}/customer/account/update_customer_job_status`,
      data: {
        data: data,
      },
      headers: { customer: cookie.load('customer'), }
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
      dispatch(validation('Bad customer Update'));
    });
  }
}
export function logout() {
  return function(dispatch) {
    cookie.remove('customer', { path: '/' });
    dispatch( { type: UNAUTHENTICATE_CUSTOMER } );
  }
}
export function addCustomerJob(formData, callback) {

  return function(dispatch) {
    axios.post(`${API_URL}/customer/job/add`, formData, {
      "Content-Type": "multipart/form-data",
      headers: { customer: cookie.load('customer'), folder: 'customer_job' }
    })
    .then(response => {

      if(!response.data.error && response.data){
        lib.createAlert({message : 'Customer Job has been added!'});
        dispatch(getJobs(callback));
        dispatch(getTotalJobs());
        dispatch(getJobStatus());
        callback(null, true);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
    });
  }
}
export function nullJobForm(){
  return function(dispatch) {
    dispatch( { type: NULL_JOB_FORM, payload: {data:[]} } );
  };
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
      url: `${API_URL}/customer/job/list`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_JOB_LIST, payload: response } );

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
      url: `${API_URL}/customer/job/total`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_JOB_TOTAL, payload: response } );
    })
    .catch(response => {
      console.log("job total error>>>>>>>>>>>", response);
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
      url: `${API_URL}/customer/job/status_wise_jobs`,
      headers: {
       customer: cookie.load('customer'),
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
      url: `${API_URL}/customer/job/info`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        option: filter,
      },
    })
    .then(response => {
      //console.log("response>>>>>", response);
      dispatch( { type: FETCH_JOB_INFO, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      console.log("catch>>>>>", response);
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

export function signoutCustomer() {
  cookie.remove('customer', { path: '/' });
  return {
    type: UNAUTHENTICATE_CUSTOMER
  }
}
