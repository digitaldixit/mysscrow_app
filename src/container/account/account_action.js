import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL } from '../../system/config';
import { lib } from '../library/elements';
export const AUTHENTICATE_CUSTOMER = 'AUTHENTICATE_CUSTOMER';
export const UNAUTHENTICATE_CUSTOMER = 'UNAUTHENTICATE_CUSTOMER';
export const GET_SERVICES = 'GET_SERVICES';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const FETCH_ACCOUNT_PROFILE = 'FETCH_ACCOUNT_PROFILE';
export const GET_PROJECTS = 'GET_PROJECTS';
export const CUSTOMER_LOGIN_PHONE = 'CUSTOMER_LOGIN_PHONE';
// PROVIDER
export const CONTRACTOR_LOGIN_PHONE = 'CONTRACTOR_LOGIN_PHONE';
export const AUTHENTICATE_PROVIDER = 'AUTHENTICATE_PROVIDER';
export const UNAUTHENTICATE_PROVIDER = 'UNAUTHENTICATE_PROVIDER';
export const FETCH_PROVIDER_ACCOUNT_PROFILE = 'FETCH_PROVIDER_ACCOUNT_PROFILE';
export const FETCH_CUSTOM_SERVICE = 'FETCH_CUSTOM_SERVICE';
export const ADD_CUSTOM_SERVICE = 'ADD_CUSTOM_SERVICE';
export const REMOVE_CUSTOM_SERVICE = 'REMOVE_CUSTOM_SERVICE';
export const FETCH_TICKET_TOTAL = 'FETCH_TICKET_TOTAL';
export const FETCH_TICKET_LIST = 'FETCH_TICKET_LIST';
export const FETCH_STATUSWISE_TICKETS = 'FETCH_STATUSWISE_TICKETS';
export const NULL_CUSTOM_SERVICE = 'NULL_CUSTOM_SERVICE';
export const FETCH_TICKET_INFO = 'FETCH_TICKET_INFO';

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
export function logout() {
  return function(dispatch) {
    cookie.remove('customer', { path: '/' });
    dispatch( { type: UNAUTHENTICATE_CUSTOMER } );
  }
}
// add jobs

// end customer action code 
export function contractorRegister(formData, callback) {
  return function(dispatch) {
     dispatch(validationNull());
    axios({
      method: 'post',
      url: `${API_URL}/contractor/account/register`,
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
export function contractorLoginOTP(formData, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${API_URL}/provider_loginotp`,
      data: {
        props: formData
      },
    })
    .then(response => {
      cookie.remove('provider', { path: '/' });
      if(response.data.provider !== undefined && response.data.error === undefined){
        cookie.save('provider', response.data.provider, { path: '/' });
        dispatch( { type: AUTHENTICATE_PROVIDER, payload: cookie.load('provider') } );
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
export function resendContractorOTP(phone, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${API_URL}/provider_resendotp`,
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
export function getProjects(){
  return function(dispatch) {
    axios.get(`${API_URL}/projects`)
    .then(response => {
      dispatch( { type: GET_PROJECTS, payload: response} );
    })
    .catch(response => {
    });
  }
}

// --------------------------------------Task--------------------------//
export function getServices(){
  return function(dispatch) {
    axios.get(`${API_URL}/services`)
    .then(response => {
      dispatch( { type: GET_SERVICES, payload: response} );
    })
    .catch(response => {
    });
  }
}

export function provider_login(formProps, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${API_URL}/provider/account/login`,
      data: {
        props: formProps,
      },
    })
    .then(response => {
      
      cookie.remove('provider', { path: '/' });
      if(response.data.provider !== undefined && response.data.error === undefined){
        cookie.save('provider', response.data.provider, { path: '/' });
        dispatch( { type: AUTHENTICATE_PROVIDER, payload: response.data.provider } );
        //browserHistory.push('/');
         callback(null, true);
      } else {
        if(response.data != undefined && response.data.error){
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

export function providerlogout() {
  return function(dispatch) {
    cookie.remove('provider', { path: '/' });
    dispatch( { type: UNAUTHENTICATE_PROVIDER } );
  }
}

export function getProviderProfile(){
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${API_URL}/provider/account/profile`,
      headers: {
       provider: cookie.load('provider'),
      },
    })
    .then(response => {
    
      if(response != undefined && response.data != undefined && response.data.service_provider_id != undefined && response.data.service_provider_id > 0){
        dispatch( { type: FETCH_PROVIDER_ACCOUNT_PROFILE, payload: response} );
      } else {
        dispatch(providerlogout());
      }
    })
    .catch(response => {
      //console.log("catch>>>>>", response);
      if(response != undefined && response.data != undefined && response.data == "Unauthorized"){
        dispatch(providerlogout());
      }
    });
  }
}
export function updateProviderProfile(data, callback){
  return function(dispatch) {
    dispatch(validationNull());
    axios.post(`${API_URL}/provider/account/update_profile`, data, {
      headers: { provider: cookie.load('provider'), }
    })
    .then(response => {
      //console.log("response>>>>>", response);
      if(!response.data.error && response.data){
        lib.createAlert({message : 'Your Provider Profile Has Been Update Successfully!'});
        dispatch( getProviderProfile());
        callback(null, true);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
    });
  }
}
export function addCustomService(formProps, callback){
  return function(dispatch) {
    dispatch( { type: ADD_CUSTOM_SERVICE, payload: formProps } );
    callback(null, true);
  };
}
export function removeCustomService(index, callback){
  return function(dispatch) {
    dispatch( { type: REMOVE_CUSTOM_SERVICE, payload: index } );
  };
}
//18-02-2019 close
//19-02-2019 start
export function addTicket(formData, callback) {
  return function(dispatch) {
    axios.post(`${API_URL}/account/ticket/add`, formData, {
      "Content-Type": "multipart/form-data",
      headers: { customer: cookie.load('customer'), folder: 'ticket' }
    })
    .then(response => {
      //console.log("response>>>>>>>", response);return false;
      if(!response.data.error && response.data){
        callback(null, response);
        lib.createAlert({message : 'Ticket has been added!'});
        dispatch(getTickets(callback));
        dispatch(getTotalTickets());
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      console.log("addTicket catch>>>>>>>", response);
    });
  }
}

export function getRecentTickets(filterdata,callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${API_URL}/customer/recent/ticket`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        props: filterdata,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_TICKET_LIST, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      console.log("catch>>>>>", response);
    });
  }
}

export function getTickets(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.ticket != undefined){
      var filter_data = filters_state.ticket;
    }
    axios({
      method: 'post',
      url: `${API_URL}/customer/ticket/list`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_TICKET_LIST, payload: response } );

      callback(null, response);
    })
    .catch(response => {
      callback(true, null);
    });
  }
}

export function getTotalTickets() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.ticket != undefined){
      var filter_data = filters_state.ticket;
    }
    axios({
      method: 'post',
      url: `${API_URL}/customer/ticket/total`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_TICKET_TOTAL, payload: response } );
    })
    .catch(response => {
      console.log("ticket total error>>>>>>>>>>>", response);
    });
  }
}



export function getFilterTicketStatus() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.ticket != undefined){
      var filter_data = filters_state.ticket;
    }

    axios({
      method: 'post',
      url: `${API_URL}/customer/ticket/status_wise_tickets`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        filter: filter_data,
      }
    })
    .then(response => {
      dispatch( { type: FETCH_STATUSWISE_TICKETS, payload: response } );
    })
    .catch(response => {
      console.log("ticket statuswise tickets error>>>>>>>>>>>", response);
    });
  }
}
export function nullCustomService(){
  return function(dispatch) {
    dispatch( { type: NULL_CUSTOM_SERVICE, payload: {data:[]} } );
  };
}
export function getTicket(filter, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${API_URL}/customer/ticket/info`,
      headers: {
       customer: cookie.load('customer'),
      },
      data: {
        option: filter,
      },
    })
    .then(response => {
      //console.log("response>>>>>", response);
      dispatch( { type: FETCH_TICKET_INFO, payload: response } );
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
export function setAuth() {
  return {
    type: AUTHENTICATE_CUSTOMER
  }
}