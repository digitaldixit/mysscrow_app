import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL,API_PREFIX } from '../../system/config';

export const FETCH_ALERT_TOP = 'FETCH_ALERT_TOP';
export const FETCH_LIST_FILTERS = 'FETCH_LIST_FILTERS';
export const UPDATE_LIST_FILTERS = 'UPDATE_LIST_FILTERS';
export const MERGE_LIST_FILTERS = 'MERGE_LIST_FILTERS';


export function setAlertTop(data) {
  return {
    type: FETCH_ALERT_TOP,
    payload: {data}
  };
}
export function removeAlertTop() {
  var data = {};
  return {
    type: FETCH_ALERT_TOP,
    payload: {data}
  };
}

export function setFilters(group, group_data, type){
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.common.list_filters;
    if(filters_state != undefined && filters_state[group] != undefined){
      if(type != undefined && type == 'merge'){
        dispatch( { type: MERGE_LIST_FILTERS, payload: group_data, group:group });
      } else {
        dispatch( { type: UPDATE_LIST_FILTERS, payload: group_data, group:group });
      }
    } else {
      filters_state = {[group]: group_data}
      dispatch( { type: FETCH_LIST_FILTERS, payload: {data:filters_state}} );
    }
  };
}
