import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducers";
import { userReducer } from "./user.reducers";
import { productReducers } from "./product.reducers";
import { homeDataReducers } from "./home-data.reducers";

const reducers = {
  cart: cartReducer,
  user: userReducer,
  products: productReducers,
  homeData: homeDataReducers,
};
export default combineReducers(reducers);
