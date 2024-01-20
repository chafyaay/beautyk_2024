import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducers";
import { userReducer } from "./user.reducers";
import { tokenReducer } from "./user.reducers";

export default combineReducers({
  cartReducer,
  userReducer,
  tokenReducer,
});
