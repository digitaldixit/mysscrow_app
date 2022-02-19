import axios from 'axios';
import { API_URL } from '../../system/config';
import cookie from 'react-cookie';

export const GET_PAGES = 'GET_PAGES';
export const GET_PAGE_INFO = 'GET_PAGE_INFO';


// Footer Pages
  export function getPages(callback){
    return function(dispatch) {
      axios({
        method: 'get',
        url: `${API_URL}/catalog/page`,
      })
      .then(response => {
        dispatch( { type: GET_PAGES, payload: response} );
        if(callback){
          callback(null, response);
        }
      })
      .catch(response => {
        //console.log("catch>>>>>", response);
      });
    }
  }
  export function getPageInfo(pageData, callback) {
    return function(dispatch) {
      axios({
        method: 'post',
        url: `${API_URL}/catalog/page/info`,
        data: {
          props: pageData,
        },
      })
      .then(response => {
        dispatch( { type: GET_PAGE_INFO, payload: response } );
        callback(null, response);
      })
      .catch(response => {
        //console.log("catch>>>>>", response);
      });
    }
  }
