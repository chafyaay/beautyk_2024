import {
  GET_USER_DATA,
  SET_TOKEN,
  GET_TOKEN,
  SET_USER_DATA,
} from "../actions/user.actions";

export const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case SET_TOKEN:
      const token = action.token;
      console.log("token", token);
      console.log("state", state);
      return { ...state, token: token };

    case GET_TOKEN:
      return { state };

    default:
      return state;
  }
};

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return { state };

    case SET_USER_DATA:
      const userData = action.data;
      return { ...state, ...userData };

    default:
      return state;
  }
};
