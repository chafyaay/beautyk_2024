export const SET_USER_DATA = "user/SET_USER_DATA";
export const LOG_OUT = "user/LOG_OUT";
export const SET_CUSTOMER_DATA = "customer/SET_CUSTOMER_DATA";
export const SET_ORDERS_DATA = "order/SET_ORDERS_DATA";
export const UPDATE_CART_ITEM = "cart/UPDATE_CART_ITEM";
export const UPDATE_CART_ITEM_QUANTITY = "cart/UPDATE_CART_ITEM_QUANTITY";
export const CLEAR_CART = "cart/CLEAR_CART";
export const GET_CART = "cart/GET_CART";

export const set_User = (data) => {
  return {
    type: SET_USER_DATA,
    data,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const set_Customer = (data) => {
  return {
    type: SET_CUSTOMER_DATA,
    data,
  };
};

export const set_Orders = (data) => {
  return {
    type: SET_ORDERS_DATA,
    data,
  };
};

/* CART ACTIONS  */

export const updateCartItem = (item) => ({
  type: UPDATE_CART_ITEM,
  item,
});

export const updateCartItemQuantity = (product, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  product,
  quantity,
});

export const onClearCart = () => ({
  type: CLEAR_CART,
});

export const getCart = () => ({
  type: GET_CART,
});
