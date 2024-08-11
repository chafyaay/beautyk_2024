import { Formik } from "formik";
import { TextField } from "../../Theme/TextField";
import { PressableButton } from "../../Theme/PressableButton";
import { Typography } from "../../Theme/Typography";
import { LoginValidation } from "../../utils/form-validation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginApiCall } from "../../utils/api-calls";
import { set_User } from "../../utils/store/actions/actions";

export function Login() {
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async (values) => {
    setIsloading(true);
    const response = await loginApiCall(values);
    if (!!response) {
      dispatch(
        set_User({
          token: response.token,
          displayName: response.user_display_name,
          userName: response.user_nicename,
          email: response.user_email,
        })
      );
      setIsloading(false);
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
        <>
          <Typography variant="heading3">Se connecter</Typography>
          <TextField
            value={values["username"]}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
            touched={touched["username"] as any}
            error={errors["username"] as any}
            label="E-mail"
          />
          <TextField
            hiddenText
            value={values["password"]}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            touched={touched["password"] as any}
            error={errors["password"] as any}
            label="Mot de passe"
          />
          <PressableButton
            variant="primary"
            onPress={handleSubmit}
            isLoading={isloading}
          >
            Se connecter
          </PressableButton>
        </>
      )}
    </Formik>
  );
}
