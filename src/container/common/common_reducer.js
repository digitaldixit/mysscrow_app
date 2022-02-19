
import update from 'react-addons-update';
import {
  FETCH_ALERT_TOP,
  FETCH_LIST_FILTERS,
  UPDATE_LIST_FILTERS,
  MERGE_LIST_FILTERS,
} from './common_action';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALERT_TOP:
        return { ...state, alert: action.payload.data }
    case FETCH_LIST_FILTERS:
          return { ...state, list_filters: action.payload.data }
    case UPDATE_LIST_FILTERS:
          return update(state, { list_filters: { [action.group]: {$set: action.payload} } })
    case MERGE_LIST_FILTERS:
          return update(state, { list_filters: { [action.group]: {$merge: action.payload} } })
    default:
      return state;
  }
}
