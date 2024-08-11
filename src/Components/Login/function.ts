import { loginApiCall } from "../../utils/api-calls";

export const loginHandler = async (values?: any) => {
  const response = await loginApiCall(values);
  console.log(response);

  /* 
    dispatch(
        set_User({
          token: response.token,
          displayName: response.user_display_name,
          userName: response.user_nicename,
          email: response.user_email,
        })
      ); */
};
