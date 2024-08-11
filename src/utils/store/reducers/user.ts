import { UserStateProps } from "../../models";
import { LOG_OUT, SET_USER_DATA } from "../actions/actions";

const intialUserReducer: UserStateProps = {
  token: "",
  displayName: "",
  userName: "",
  email: "",
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
