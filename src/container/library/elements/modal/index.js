import ReduxModal from './container/redux_modal';
import { modalEmitter } from './container/emitter';

export default ReduxModal;
export { default as modalReducer } from './container/modal_reducer';
export const modal = modalEmitter;
