import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducers";
import { customerReducer, orderReducer, userReducer } from "./user.reducers";
import { productReducers } from "./product.reducers";
import { homeDataReducers } from "./home-data.reducers";

export const reducers = {
  cart: cartReducer,
  user: userReducer,
  orders: orderReducer,
  customer: customerReducer,
  products: productReducers,
  homeData: homeDataReducers,
};
export default combineReducers(reducers);
