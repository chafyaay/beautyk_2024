import { Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import DataIndex from "../../utils/DataIndex";
import { updateUserDetailsApi } from "../../utils/api-calls";
import {
  UserValidation,
  PasswordValidation,
} from "../../utils/form-validation";
import { logOut } from "../../utils/store/actions/user.actions";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import { PressableButton } from "../UI/Buttons";
import { TextField } from "../UI/TextField";
import * as Yup from "yup";
import { Icon, MD2Colors, Text } from "react-native-paper";
import { Pressable, View } from "react-native";
import { TEXT_COLOR, deviceHeight } from "../../utils/device";
import Spacer from "../UI/Spacer";
import { TextHolder } from "../UI/TextHolder";
import { Typography } from "../UI/Typography";

export const AccountDetails = ({ userId, userDetails }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetailsForm, setUserDetailsForm] = useState({});
  const user = useSelector((state: any) => state.user) as UserProps;
  const formRef = useRef() as any;

  const dispatch = useDispatch();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    setUserDetailsForm(userDetails);
  }, []);

  useEffect(() => {
    const passwordForm = isSwitchOn
      ? { newpassword_1: "", newpassword_2: "" }
      : {};

    setUserDetailsForm({
      ...userDetails,
      ...passwordForm,
    });
    formRef.current.setFieldValue("newpassword_1", "");
    formRef.current.setFieldValue("newpassword_2", "");
  }, [isSwitchOn]);

  const validation = Yup.object().shape(
    isSwitchOn
      ? { ...UserValidation, ...PasswordValidation }
      : { ...UserValidation }
  );

  const onUpdateCustomerHandler = async ({
    email,
    first_name,
    last_name,
    name,
    newpassword_1,
  }) => {
    setIsLoading(true);
    let data = !newpassword_1
      ? { email, first_name, last_name, name }
      : { email, first_name, last_name, name, password: newpassword_1 };

    const response = await updateUserDetailsApi(user.token, userId, data);

    if (!!response?.id)
      Toast.show({
        type: "success",
        props: {
          msg: "Les détails du compte ont bien été modifiés.",
        },
      });
    else if (response.message) {
      Toast.show({
        type: "error",
        props: {
          msg: response.message,
        },
      });
    }

    setIsLoading(false);
  };

  return (
    <Formik
      validationSchema={validation}
      initialValues={userDetails}
      validateOnBlur
      validateOnChange
      onSubmit={onUpdateCustomerHandler}
      innerRef={formRef}
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
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            height: deviceHeight - 200,
          }}
        >
          <View>
            {Object.keys(userDetailsForm).map((key, index) => {
              return (
                <>
                  <TextField
                    key={key}
                    handleChange={handleChange(key)}
                    handleBlur={handleBlur(key)}
                    value={values[key]}
                    label={DataIndex[key]}
                    touched={touched[key] as any}
                    error={errors[key] as any}
                    secureTextEntry={
                      key === "newpassword_1" || key === "newpassword_2"
                    }
                  />
                  <Spacer size={10} />

                  {index === 3 && (
                    <>
                      <Spacer size={10} />
                      <PressableButton
                        type={"Link"}
                        onPress={onToggleSwitch}
                        children="Modifier le mot de passe"
                        isLoading={isLoading}
                        fullwidth
                        fontWeight="Medium"
                        icon={
                          isSwitchOn
                            ? "checkbox-marked-circle-outline"
                            : "checkbox-blank-circle-outline"
                        }
                      />
                      <Spacer size={10} />
                    </>
                  )}
                </>
              );
            })}
          </View>

          <PressableButton
            type="default"
            onPress={handleSubmit}
            children="Enregistrer les modifications"
            isLoading={isLoading}
            fullwidth
            fontWeight="Medium"
          />
        </View>
      )}
    </Formik>
  );
};
