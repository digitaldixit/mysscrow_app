import {
  GET_PAGES,
  GET_PAGE_INFO
} from './catalog_action';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PAGES:
        return { ...state, pages: action.payload.data }
    case GET_PAGE_INFO:
        return { ...state, pageinfo: action.payload.data }
    default:
      return state;
  }
}
