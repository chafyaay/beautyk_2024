export const GET_USER = "user/GET_USER";
export const SET_USER = "user/SET_USER";
export const SET_TOKEN = "user/SET_TOKEN";
export const GET_TOKEN = "user/GET_TOKEN";
export const SET_CUSTOMER = "user/SET_CUSTOMER";
export const GET_CUSTOMER = "user/GET_CUSTOMER";
export const LOG_OUT = "user/LOG_OUT";
export const SET_ORDERS = "user/SET_ORDERS";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  };
};

export const getToken = () => {
  return {
    type: GET_TOKEN,
  };
};

export const logOut = () => ({
  type: LOG_OUT,
});

export const setUser = (data) => {
  return {
    type: SET_USER,
    data,
  };
};
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
