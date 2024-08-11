import { combineReducers } from "redux";
import { UserStateProps } from "../models";
import { cartReducer } from "./reducers/cart";
import { userReducer } from "./reducers/user";

export type State = {
  userReducer: UserStateProps;
};

export const reducers = {
  user: userReducer,
  cart: cartReducer,
  /* orders: orderReducer,
  customer: customerReducer,
  products: productReducers,
  homeData: homeDataReducers, */
};
export default combineReducers(reducers);
