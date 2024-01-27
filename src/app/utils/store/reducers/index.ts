import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducers";
import { userReducer } from "./user.reducers";
import { productReducers } from "./product.reducers";

const reducers = {
  cart: cartReducer,
  user: userReducer,
  products: productReducers,
};
export default combineReducers(reducers);
