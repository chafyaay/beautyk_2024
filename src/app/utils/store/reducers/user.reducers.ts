import { CustomersProps, OrderProps } from "../../models";
import {
  GET_USER,
  SET_USER,
  LOG_OUT,
  SET_CUSTOMER,
  SET_ORDERS,
} from "../actions/user.actions";

export interface UserProps {
  token: string;
  user: any;
  customer: CustomersProps;
  orders: OrderProps[];
}

const intialUserReducer: UserProps = {
  token: "",
  user: {},
  customer: {
    id: 0,
    date_created: "",
    date_created_gmt: "",
    date_modified: "",
    date_modified_gmt: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    username: "",
    billing: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: "",
    },
    shipping: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
    is_paying_customer: false,
    avatar_url: "",
    meta_data: [],
    _links: {
      self: [],
      collection: [],
    },
  },
  orders: [],
};

export const userReducer = (state = intialUserReducer, action) => {
  switch (action.type) {
    case SET_USER:
      state = {
        ...state,
        user: action.data["user"],
        customer: action.data["customer"],
        token: action.data["token"],
      };
      return state;

    case GET_USER:
      return { ...state };
    case LOG_OUT:
      let s = { ...state };
      s.user = null;
      s.token = null;
      s.customer = null;
      s.orders = null;
      return { ...s };

    case SET_CUSTOMER:
      state = {
        ...state,
        customer: action.data,
      };

      return state;

    case SET_ORDERS:
      state = {
        ...state,
        orders: action.data,
      };
      return state;

    default:
      return state;
  }
};
