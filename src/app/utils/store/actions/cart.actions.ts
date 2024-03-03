export const UPDATE_CART_ITEM = "cart/UPDATE_CART_ITEM";
export const UPDATE_CART_ITEM_QUANTITY = "cart/UPDATE_CART_ITEM_QUANTITY";
export const CLEAR_CART = "cart/CLEAR_CART";
export const GET_CART = "cart/GET_CART";

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
