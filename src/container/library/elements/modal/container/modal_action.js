export const ADD_MODAL = 'ADD_MODAL';
export const REMOVE_MODAL = 'REMOVE_MODAL';
export const CLEAR_ALL = 'CLEAR_ALL';

export function addModal(obj) {
  return {
    type: ADD_MODAL,
    payload: obj
  };
}

export function removeModal(id) {
  return {
    type: REMOVE_MODAL,
    payload: id
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL
  };
}
