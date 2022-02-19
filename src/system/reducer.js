import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AccountReducer from "../container/account/account_reducer";
import CatalogReducer from "../container/catalog/catalog_reducer";
import CommonReducer from "../container/common/common_reducer";
import { modalReducer } from "../container/library/elements/modal";
import ProviderReducer from "../container/provider/provider_reducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  modals: modalReducer,
  common: CommonReducer,
  catalog: CatalogReducer,
  account: AccountReducer,
  provider: ProviderReducer,
  })
  export default rootReducer;
