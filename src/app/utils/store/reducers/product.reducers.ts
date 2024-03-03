import {
  SET_ALL_PRODUCTS,
  SET_ALL_PRODUCTS_TOTAL,
} from "../actions/product.action";

const intialUserReducer = {
  products: [],
  totalProducts: 0,
};

export const productReducers = (state = intialUserReducer, action) => {
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
