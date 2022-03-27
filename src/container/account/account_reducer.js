import {
  AUTHENTICATE_CUSTOMER,
  UNAUTHENTICATE_CUSTOMER,
  VALIDATION_ERROR,
  FETCH_ACCOUNT_PROFILE,
  CUSTOMER_LOGIN_PHONE,
  FETCH_JOB_TOTAL,
  FETCH_STATUSWISE_JOBS,
  FETCH_JOB_LIST,
  NULL_JOB_FORM,
  FETCH_JOB_INFO,

  // Provider
} from "./account_action";

const INITIAL_STATE = {
  custom_service: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case VALIDATION_ERROR:
      return { ...state, error: action.payload };
    case AUTHENTICATE_CUSTOMER:
      return {
        ...state,
        error: "",
        authenticated: true,
        token: action.payload,
      };
    case UNAUTHENTICATE_CUSTOMER:
      localStorage.removeItem("token");
      return { ...state, error: "", authenticated: false, token: false };
    case FETCH_ACCOUNT_PROFILE:
      return { ...state, profile: action.payload.data };
    case CUSTOMER_LOGIN_PHONE:
      return { ...state, login_phone: action.payload };
    case FETCH_JOB_TOTAL:
      return { ...state, job_total: action.payload.data.total };
    case FETCH_STATUSWISE_JOBS:
      return { ...state, filter_job_status: action.payload.data };
    case FETCH_JOB_LIST:
      return { ...state, job_list: action.payload.data };
    case NULL_JOB_FORM:
      return { ...state, job_service: action.payload.data };
    case FETCH_JOB_INFO:
      return { ...state, job_info: action.payload.data };
    default:
      return state;
  }
}
