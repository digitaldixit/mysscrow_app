import axios from 'axios';
import cookie from 'react-cookie';
import * as config from '../../system/config';
import { lib } from '../library/elements';


var accountAction = require('../account/account_action');

export const FETCH_PROVIDER_TICKET_LIST = 'FETCH_PROVIDER_TICKET_LIST';
export const FETCH_PROVIDER_TICKET_TOTAL = 'FETCH_PROVIDER_TICKET_TOTAL';
export const FETCH_STATUSWISE_TICKETS = 'FETCH_STATUSWISE_TICKETS';
export const FETCH_PRIORITY_STATUS = 'FETCH_PRIORITY_STATUS';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const FETCH_TICKET_INFO = 'FETCH_TICKET_INFO';
export const GET_SERVICE_STATUS = 'GET_SERVICE_STATUS';


export function getRecentProviderTickets(filterdata,callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/provider/recent/ticket`,
      headers: {
       provider: cookie.load('provider'),
      },
      data: {
        props: filterdata,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_PROVIDER_TICKET_LIST, payload: response } );
      callback(null, response);
    })
    .catch(response => {
    });
  }
}

/* Ticket Related changes start */
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
      url: `${config.API_URL}/provider/ticket/list`,
      headers: {
       provider: cookie.load('provider'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_PROVIDER_TICKET_LIST, payload: response } );

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
      url: `${config.API_URL}/provider/ticket/total`,
      headers: {
       provider: cookie.load('provider'),
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: FETCH_PROVIDER_TICKET_TOTAL, payload: response } );
    })
    .catch(response => {
    });
  }
}



export function getTicketStatus() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.ticket != undefined){
      var filter_data = filters_state.ticket;
    }

    axios({
      method: 'post',
      url: `${config.API_URL}/provider/ticket/status_wise_tickets`,
      headers: {
       provider: cookie.load('provider'),
      },
      data: {
        filter: filter_data,
      }
    })
    .then(response => {
      dispatch( { type: FETCH_STATUSWISE_TICKETS, payload: response } );
    })
    .catch(response => {
    });
  }
}
export function getTicketPriorityStatus() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.ticket != undefined){
      var filter_data = filters_state.ticket;
    }

    axios({
      method: 'post',
      url: `${config.API_URL}/provider/ticket/priority_wise_tickets`,
      headers: {
       provider: cookie.load('provider'),
      },
      data: {
        filter: filter_data,
      }
    })
    .then(response => {
      dispatch( { type: FETCH_PRIORITY_STATUS, payload: response } );
    })
    .catch(response => {
    });
  }
}


export function getTicket(filter, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/provider/ticket/info`,
      headers: {
        provider: cookie.load('provider')
      },
      data: {
        option: filter,
      },
    })
    .then(response => {

      dispatch( { type: FETCH_TICKET_INFO, payload: response } );
      callback(null, response);
    })
    .catch(response => {
    });
  }
}
//20-02-2019 close

export function getServiceStatus(){
  return function(dispatch) {
    axios.get(`${config.API_URL}/service/status`)
    .then(response => {
      dispatch( { type: GET_SERVICE_STATUS, payload: response} );
    })
    .catch(response => {
    });
  }
}

export function addServiceHistory(formData,ticket_service_id, callback) {
  var filter = {}
  filter.ticket_service_id = ticket_service_id;
  return function(dispatch) {
    axios.post(`${config.API_URL}/provider/account/ticket/history/add`, formData, {
      headers: { provider: cookie.load('provider'), folder: 'ticket' }
    })
    .then(response => {
      if(!response.data.error && response.data){
        lib.createAlert({message : 'History has been added!'});
        dispatch(getTicket(filter,callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
    });
  }
}
export function addTicketTiming(formData, callback) {
  var filter = {}
  filter.ticket_service_id = formData.ticket_service_id;
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.API_URL}/provider/ticket/timing/add`,
      headers: {
        provider: cookie.load('provider')
      },
      data: {
        props: formData
      },
    })
    .then(response => {
      if(!response.data.error && response.data) {
        lib.createAlert({message : 'Ticket Time successfully!'});
        dispatch(getTicket(filter,callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      dispatch(validation('Bad request.'));
      callback(true, null);
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
