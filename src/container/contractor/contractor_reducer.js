import update from "react-addons-update";
import {
  CONTRACTOR_LOGIN_PHONE,
  AUTHENTICATE_CONTRACTOR,
  UNAUTHENTICATE_CONTRACTOR,
  FETCH_CONTRACTOR_ACCOUNT_PROFILE,
  FETCH_CONTRACTOR_TICKET_TOTAL,
  FETCH_CONTRACTOR_JOB_LIST,
  FETCH_STATUSWISE_JOBS,
  FETCH_JOB_INFO,
  GET_JOB_STATUS,
  GET_CUSTOMER_REQUESTS,
  FETCH_CONTRACTOR_JOB_COUNTERS,
  VALIDATION_ERROR,
} from "./contractor_action";

const INITIAL_STATE = {};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONTRACTOR_LOGIN_PHONE:
      return { ...state, login_phone: action.payload };
    case AUTHENTICATE_CONTRACTOR:
      return {
        ...state,
        error: "",
        authenticated: true,
        token: action.payload,
      };
    case UNAUTHENTICATE_CONTRACTOR:
      localStorage.removeItem("token");
      return { ...state, error: "", authenticated: false, token: false };
    case FETCH_CONTRACTOR_ACCOUNT_PROFILE:
      return { ...state, contractor_profile: action.payload.data };
    case FETCH_CONTRACTOR_JOB_LIST:
      return { ...state, job_list: action.payload.data };
    case FETCH_CONTRACTOR_TICKET_TOTAL:
      return { ...state, job_total: action.payload.data.total };
    case FETCH_STATUSWISE_JOBS:
      return { ...state, filter_job_status: action.payload.data };
    case FETCH_JOB_INFO:
      return { ...state, job_info: action.payload.data };
    case GET_JOB_STATUS:
      return { ...state, job_status: action.payload.data };
    case GET_CUSTOMER_REQUESTS:
      return { ...state, job_customer_requests: action.payload.data };
    case FETCH_CONTRACTOR_JOB_COUNTERS:
      return { ...state, job_contractor_counters: action.payload.data };

    case VALIDATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
