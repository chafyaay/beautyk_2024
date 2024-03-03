export const SET_USER_DATA = "user/SET_USER_DATA";
export const SET_CUSTOMER_DATA = "user/SET_CUSTOMER_DATA";
export const SET_ORDERS_DATA = "user/SET_ORDERS_DATA";
export const LOG_OUT = "user/LOG_OUT";

export const set_User = (data) => {
  return {
    type: SET_USER_DATA,
    data,
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

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

/* export const getToken = () => {
  return {
    type: GET_TOKEN,
  };
};

export const logOut = () => ({
  type: LOG_OUT,
});

export const getUserData = () => ({
  type: GET_USER,
});

export const setCustomer = (data) => {
  return {
    type: SET_CUSTOMER,
    data,
  };
};

export const setOrders = (data) => ({
  type: SET_ORDERS,
  data,
});

export const getCustomer = () => ({
  type: GET_CUSTOMER,
});
 */
