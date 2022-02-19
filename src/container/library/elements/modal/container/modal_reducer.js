import {
  ADD_MODAL,
  REMOVE_MODAL,
  CLEAR_ALL
} from './modal_action';

const INITIAL_STATE =  {
  modals: [],
};

export default function modalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_MODAL:
      return {...state,
        modals: [
          ...state.modals,
          {
            id: 'modal_'+(state.modals.length + 1),
            ...action.payload
          }
        ]
      };
    case REMOVE_MODAL:
      return {...state, modals: state.modals.filter(modal => modal.id !== action.payload)};
    case CLEAR_ALL:
      return { ...state, modals: [] };
    default:
      return state;
  }
}
