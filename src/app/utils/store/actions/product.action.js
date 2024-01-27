export const SET_ALL_PRODUCTS = "product/SET_ALL_PRODUCTS";
export const SET_PRODUCT = "product/SET_PRODUCT";
export const SET_ALL_CATEGORIES = "product/SET_ALL_CATEGORIES";
export const SET_CATEGORY = "product/SET_CATEGORY";

export const setAllProducts = (data) => ({
  type: SET_ALL_PRODUCTS,
  data,
});

export const setProduct = (product_id) => ({
  type: SET_PRODUCT,
  product_id,
});

export const setAllcategories = (data) => ({
  type: SET_ALL_CATEGORIES,
  data,
});

export const setcategory = (product_id) => ({
  type: SET_CATEGORY,
  category_id,
});
