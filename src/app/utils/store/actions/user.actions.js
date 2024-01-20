export const GET_USER_DATA = "user/GET_USER_DATA";
export const SET_USER_DATA = "user/SET_USER_DATA";
export const SET_TOKEN = "user/SET_TOKEN";
export const GET_TOKEN = "user/GET_TOKEN";

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

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    data,
  };
};

export const getUserData = () => ({
  type: GET_USER_DATA,
});
