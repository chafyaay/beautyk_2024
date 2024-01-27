import {
  SET_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_ALL_CATEGORIES,
  SET_CATEGORY,
} from "../actions/product.action";

const intialUserReducer = {
  products: [],
  categories: [],
  category: {},
  product: {},
};

export const productReducers = (state = intialUserReducer, action) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      const products = action.data;
      state = { ...state, products: products };
      return state;

    case SET_PRODUCT:
      const product = action.data;
      state = { ...state, product: product };
      return state;

    case SET_ALL_CATEGORIES:
      const categories = action.data;
      state = { ...state, categories: categories };
      return state;

    case SET_CATEGORY:
      const category = action.data;
      state = { ...state, category: category };
      return state;

    default:
      return state;
  }
};
