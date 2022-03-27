import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AccountReducer from "../container/account/account_reducer";
import CommonReducer from "../container/common/common_reducer";
import { modalReducer } from "../container/library/elements/modal";
import ContractorReducer from "../container/contractor/contractor_reducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  modals: modalReducer,
  common: CommonReducer,
  account: AccountReducer,
  contractor: ContractorReducer,
  })
  export default rootReducer;
