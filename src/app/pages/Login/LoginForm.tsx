/* ********* */
/* ***** LoginForm **** */
/* ********* */

import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import { connect, useDispatch } from "react-redux";
import { PressableButton } from "../../components/UI/Buttons";
import { TextField } from "../../components/UI/TextField";
import DataIndex from "../../utils/DataIndex";
import { LoginValidation } from "../../utils/form-validation";
import {
  setAllProducts,
  setProduct,
  setHomePromotionBanner,
} from "../../utils/store/actions/product.action";
import {
  setToken,
  getToken,
  getUserData,
  setUser,
} from "../../utils/store/actions/user.actions";
import { loginApiCall } from "../../utils/api-calls";
import Toast from "react-native-toast-message";
import RenderHTML from "react-native-render-html";
import { TEXT_COLOR } from "../../utils/device";
import Spacer from "../../components/UI/Spacer";

const LoginForm = () => {
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async (values: any) => {
    setIsloading(true);
    const response = await loginApiCall(values);

    if (!!response?.data?.status) {
      Toast.show({
        type: "error",
        props: {
          msg: response.message,
        },
      });
    } else if (response.token) {
      setIsloading(false);

      dispatch(
        setUser({
          token: response.token,
          user: {
            displayName: response.user_display_name,
            userName: response.user_nicename,
            email: response.user_email,
          },
        })
      );
    }
  };

  return (
    <Formik
      validationSchema={LoginValidation}
      onSubmit={loginHandler}
      initialValues={{
        username: "y.chafyaay@gmail.com",
        password: "Chy@@1986!!",
      }}
      validateOnBlur
      validateOnChange
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View style={{ width: "100%", padding: 30 }}>
          {["username", "password"].map((key) => (
            <TextField
              label={DataIndex[key]}
              value={values[key]}
              handleChange={handleChange(key)}
              handleBlur={handleBlur(key)}
              touched={touched[key] as any}
              error={errors[key] as any}
              secureTextEntry={key === "password"}
            />
          ))}
          <Spacer size={30} />
          <PressableButton
            children={"Se connecter"}
            onPress={handleSubmit}
            type="primary"
            disabled={!isValid}
            isLoading={isloading}
            fullwidth
          />
        </View>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  user: state,
  token: state,
  cart: state?.cartReducer,
  products: state,
});

export default connect(mapStateToProps, {
  setToken,
  getToken,
  getUserData,
  setAllProducts,
  setProduct,
  setHomePromotionBanner,
})(LoginForm);
