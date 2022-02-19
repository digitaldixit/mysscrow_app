import {
  AUTHENTICATE_CUSTOMER,
  UNAUTHENTICATE_CUSTOMER,
  VALIDATION_ERROR,
  FETCH_ACCOUNT_PROFILE,
  GET_PROJECTS,
  CUSTOMER_LOGIN_PHONE,
  GET_SERVICES,
  FETCH_CUSTOM_SERVICE,
  ADD_CUSTOM_SERVICE,
  REMOVE_CUSTOM_SERVICE,

  FETCH_TICKET_TOTAL,
  FETCH_STATUSWISE_TICKETS,
  FETCH_TICKET_LIST,
  NULL_CUSTOM_SERVICE,
  FETCH_TICKET_INFO,

  // Provider
  CONTRACTOR_LOGIN_PHONE,
  AUTHENTICATE_PROVIDER,
  UNAUTHENTICATE_PROVIDER,
  FETCH_PROVIDER_ACCOUNT_PROFILE,
  
} from './account_action';

const INITIAL_STATE =  {
  custom_service: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VALIDATION_ERROR:
        return { ...state, error: action.payload }
    case AUTHENTICATE_CUSTOMER:
        return { ...state, error: '', authenticated: true, token: action.payload }
    case UNAUTHENTICATE_CUSTOMER:
        localStorage.removeItem('token');
        return { ...state, error: '', authenticated: false, token: false }
    case FETCH_ACCOUNT_PROFILE:
        return { ...state, profile: action.payload.data }
    case GET_PROJECTS:
          return { ...state, projects: action.payload.data }
    case CUSTOMER_LOGIN_PHONE:
        return { ...state, login_phone: action.payload }
    case GET_SERVICES:
        return { ...state, services: action.payload.data }

// PROVIDER
case CONTRACTOR_LOGIN_PHONE:
  return { ...state, contractor_login_phone: action.payload }
    case AUTHENTICATE_PROVIDER:
      return { ...state, error: '', authenticate_provider: true, token: action.payload }
    case UNAUTHENTICATE_PROVIDER:
      localStorage.removeItem('token');
      return { ...state, error: '', authenticate_provider: false, token: false }
    case FETCH_PROVIDER_ACCOUNT_PROFILE:
      return { ...state, provider_profile: action.payload.data }


      case FETCH_CUSTOM_SERVICE:
          return { ...state, custom_service: action.payload.data }
      case ADD_CUSTOM_SERVICE:
          return { ...state, custom_service: [...state.custom_service, action.payload] }
      case REMOVE_CUSTOM_SERVICE:
          return { ...state, custom_service: [ ...state.custom_service.slice(0, action.payload), ...state.custom_service.slice(action.payload + 1) ] }
      case FETCH_TICKET_TOTAL:
            return { ...state, ticket_total: action.payload.data.total }
      case FETCH_STATUSWISE_TICKETS:
           return { ...state, filter_ticket_status: action.payload.data }
      case FETCH_TICKET_LIST:
          return { ...state, ticket_list: action.payload.data }
      case NULL_CUSTOM_SERVICE:
          return { ...state, custom_service: action.payload.data }
      case FETCH_TICKET_INFO:
          return { ...state, ticket_info: action.payload.data }
    default:
      return state;
  }
}
