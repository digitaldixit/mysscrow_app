import update from 'react-addons-update';
import {
  FETCH_PROVIDER_TICKET_TOTAL,
  FETCH_PROVIDER_TICKET_LIST,
  FETCH_STATUSWISE_TICKETS,
  FETCH_PRIORITY_STATUS,
  FETCH_TICKET_INFO,
  GET_SERVICE_STATUS,
  VALIDATION_ERROR
} from './provider_action';

const INITIAL_STATE =  {
  custom_service: [],
};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROVIDER_TICKET_LIST:
      return { ...state, provider_ticket_list: action.payload.data }
    case FETCH_PROVIDER_TICKET_TOTAL:
      return { ...state, provider_ticket_total: action.payload.data.total }
      case FETCH_PRIORITY_STATUS:
        return { ...state, ticket_priority_status: action.payload.data }
    case FETCH_STATUSWISE_TICKETS:
        return { ...state, filter_ticket_status: action.payload.data }
    case FETCH_TICKET_INFO:
      return { ...state, ticket_info: action.payload.data }
    case GET_SERVICE_STATUS:
      return { ...state, service_status: action.payload.data }
    case VALIDATION_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
