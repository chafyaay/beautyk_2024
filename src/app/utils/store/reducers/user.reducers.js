import {
  GET_USER,
  SET_TOKEN,
  GET_TOKEN,
  SET_USER,
  SET_CUSTOMER,
  GET_CUSTOMER,
} from "../actions/user.actions";

const intialUserReducer = {
  token: "",
  user: {},
  customer: {},
  orders: [],
};

export const userReducer = (state = intialUserReducer, action) => {
  switch (action.type) {
    case SET_USER:
      const user = action.data;
      state = { ...state, ...user };
      return state;

    case GET_USER:
      return { ...state };

    /*  case SET_USER:
      const userData = action.data;
      return { ...state, ...userData };

    case GET_USER:
      return { state };

    case SET_CUSTOMER:
      const customerData = action.data;
      return { ...state, ...customerData };

    case GET_CUSTOMER:
      return { state }; */

    default:
      return state;
  }
};
