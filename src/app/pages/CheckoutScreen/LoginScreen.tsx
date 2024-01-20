import { ImageBackground, ScrollView, View } from "react-native";
import {
  MD2DarkTheme,
  MD2LightTheme,
  MD3DarkTheme,
  Text,
  TextInput,
  Button,
  Divider,
  ActivityIndicator,
  MD2Colors,
  Portal,
} from "react-native-paper";
import { CustomersProps } from "../../utils/models";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { deviceHeight, deviceWidth } from "../../utils/device";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultButton, PrimaryButton } from "../../components/UI/Buttons";
import { CREATE_CUSTOMER, LOGIN, loginHandler } from "../../utils/api-calls";
import {
  GET_CART,
  getCart,
  updateCartItem,
} from "../../utils/store/actions/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_TOKEN,
  getToken,
  getUserData,
  setToken,
  setUserData,
} from "../../utils/store/actions/user.actions";
import { connect } from "react-redux";
import { PrimaryInputText } from "../../components/UI/InputText";

const LoginFormSchema = Yup.object().shape({
  phone: Yup.string()
    .email("Email entré n'est pas valide ")
    .required("Valeur Requise"),
});

const LoginFormValue = { email: "" };

interface LoginScreenProps {
  setUserData: (data: any) => void;
  getUserData: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  setUserData,
  getUserData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userReducer } = useSelector((state) => state) as any;
  const { tokenReducer } = useSelector((state) => state) as any;

  const disatach = useDispatch();

  return (
    <Portal>
      <ImageBackground
        style={{
          width: deviceWidth,
          height: deviceHeight,
        }}
        resizeMode="cover"
        source={{
          uri: "https://orgaliving.com/wp-content/uploads/2024/01/cccc-scaled.jpg",
        }}
      >
        <ScrollView>
          <ImageBackground
            style={{
              width: deviceWidth,
              height: 50,
              marginTop: 160,
            }}
            resizeMode="contain"
            source={{
              uri: "https://orgaliving.com/wp-content/uploads/2024/01/beautyk-logo.png",
            }}
          />
          <View style={{ padding: 20, marginTop: 60 }}>
            <Formik
              validationSchema={LoginFormSchema}
              initialValues={LoginFormValue}
              onSubmit={(values) => {}}
            >
              {({
                touched,
                errors,
                isValid,
                values,
                handleChange,
                handleBlur,
              }) => (
                <View>
                  <Text
                    variant="headlineMedium"
                    style={{ color: MD2Colors.indigo500 }}
                  >
                    Login
                  </Text>
                  <TextInput
                    disabled={isLoading}
                    style={{ marginTop: 10 }}
                    label={"Email"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values["email"]}
                    dense
                    mode="outlined"
                    theme={MD2LightTheme}
                    activeOutlineColor={
                      touched["email"] && errors["email"]
                        ? MD2Colors.red800
                        : MD2Colors.indigo500
                    }
                  />
                  <TextInput
                    secureTextEntry
                    disabled={isLoading}
                    style={{ marginTop: 10 }}
                    label={"Mot de passe"}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values["password"]}
                    dense
                    mode="outlined"
                    theme={MD2LightTheme}
                    activeOutlineColor={
                      touched["email"] && errors["email"]
                        ? MD2Colors.red800
                        : MD2Colors.indigo500
                    }
                  />
                  {touched["email"] && errors["email"] && (
                    <Text
                      variant="bodySmall"
                      style={{ color: MD2Colors.red800 }}
                    >
                      {errors["email"] as any}
                    </Text>
                  )}
                  <View
                    style={{
                      height: deviceHeight / 8,
                      marginTop: 30,
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <PrimaryButton
                      title="Créer un compte"
                      onEventHandler={() => {
                        /* CREATE_CUSTOMER(user)
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log("err:::;;;::\n", err);
                        }); */
                      }}
                    />
                    <DefaultButton
                      title={"Se connecter"}
                      onEventHandler={() => {
                        const email = "y.chafyaay@gmail.com";
                        const password = "Chy@@1986!!";
                        loginHandler({ email, password })
                          .then((response) => {
                            console.log();
                            const _token = response?.token;
                            const userData = {
                              displayName: response?.user_display_name,
                              email: response?.user_email,
                              userName: response?.user_nicename,
                            };

                            // setUserData(userData);
                            setToken(_token);
                          })
                          .catch((err) => {
                            console.log("ERR:::", err);
                          });
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </ImageBackground>
    </Portal>
  );
};

const mapStateToProps = (state) => ({
  user: state,
  token: state,
});

export default connect(mapStateToProps, {
  setToken,
  getToken,
  setUserData,
  getUserData,
})(LoginScreen);
