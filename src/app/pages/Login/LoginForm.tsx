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

import { loginApiCall } from "../../utils/api-calls";
import Toast from "react-native-toast-message";
import Spacer from "../../components/UI/Spacer";
import { deviceWidth } from "../../utils/device";
import { set_User } from "../../utils/store/actions/user.actions";

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
        set_User({
          token: response.token,
          displayName: response.user_display_name,
          userName: response.user_nicename,
          email: response.user_email,
        })
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
          <>
            {["username", "password"].map((key) => (
              <TextField
                key={key}
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
              onPress={handleSubmit}
              type="primary"
              disabled={!isValid}
              isLoading={isloading}
              fontWeight="Bold"
            >
              Se connecter
            </PressableButton>
          </>
        )}
      </Formik>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state,
  token: state,
  cart: state?.cartReducer,
  products: state,
});

export default connect(mapStateToProps, {})(LoginForm);
