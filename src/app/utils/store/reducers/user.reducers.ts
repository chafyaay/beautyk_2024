import { CustomersProps, OrderProps } from "../../models";
import {
  SET_ALL_PRODUCTS,
  SET_ALL_PRODUCTS_TOTAL,
} from "../actions/product.action";
import {
  SET_USER_DATA,
  LOG_OUT,
  SET_CUSTOMER_DATA,
  SET_ORDERS_DATA,
} from "../actions/user.actions";

const intialProductsReducer = {
  products: [],
  totalProducts: 0,
};

export interface UserStateProps {
  token: string;
  displayName: string;
  userName: string;
  email: string;
}

export interface StateProps {
  user: UserStateProps;
  customer: CustomersProps;
  orders: OrderProps[];
  productsTotal: number;
}

const intialCustomerReducer: CustomersProps = {
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
};

const intialUserReducer: UserStateProps = {
  token: "",
  displayName: "",
  userName: "",
  email: "",
};

const intialOrderReducer: OrderProps = {
  id: 0,
  parent_id: 0,
  status: "",
  currency: "",
  version: "",
  prices_include_tax: false,
  date_created: "",
  date_modified: "",
  discount_total: "",
  discount_tax: "",
  shipping_total: "",
  shipping_tax: "",
  cart_tax: "",
  total: "",
  total_tax: "",
  customer_id: 0,
  order_key: "",
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
    phone: "",
  },
  payment_method: "",
  payment_method_title: "",
  transaction_id: "",
  customer_ip_address: "",
  customer_user_agent: "",
  created_via: "",
  customer_note: "",
  date_completed: undefined,
  date_paid: undefined,
  cart_hash: "",
  number: "",
  meta_data: [],
  line_items: [],
  tax_lines: [],
  shipping_lines: [],
  fee_lines: [],
  coupon_lines: [],
  refunds: [],
  payment_url: "",
  is_editable: true,
  needs_payment: false,
  needs_processing: true,
  date_created_gmt: "",
  date_modified_gmt: "",
  date_completed_gmt: undefined,
  date_paid_gmt: undefined,
  currency_symbol: "",
  _links: {
    self: [],
    collection: [],
    customer: [],
  },
};

export const userReducer = (state = intialUserReducer, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      state = { ...action.data };

      return { ...state };
    case LOG_OUT:
      state = null;

    default:
      return { ...state };
  }
};

export const customerReducer = (state = intialCustomerReducer, action) => {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      state = { ...action.data };
      return { ...state };
    default:
      return { ...state };
  }
};

export const orderReducer = (state = intialOrderReducer, action) => {
  switch (action.type) {
    case SET_ORDERS_DATA:
      state = { ...action.data };
      return { ...state };
    default:
      return { ...state };
  }
};

export const productReducers = (state = intialProductsReducer, action) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      const products = action.data;
      state = { ...state, products: products };
      return state;

    case SET_ALL_PRODUCTS_TOTAL:
      const totalProducts = action.data.reduce((a, b) => (a += b.total), 0);
      state = { ...state, totalProducts };
      return state;

    default:
      return state;
  }
};
