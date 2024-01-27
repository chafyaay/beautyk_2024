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
import { GET_CUSTOMER, LOGIN_HANDLER } from "../../utils/api-calls";
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
  setUser,
} from "../../utils/store/actions/user.actions";
import { connect } from "react-redux";
import { PrimaryInputText } from "../../components/UI/InputText";
import {
  setAllProducts,
  setProduct,
} from "../../utils/store/actions/product.action";
import Toast from "react-native-toast-message";
import axios from "axios";
import { err } from "react-native-svg";

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
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const getCustomer = async (email: string) => {
    const response = (await GET_CUSTOMER()) as any[];

    if (response?.length > 0 && !!email)
      return response.find((customer) => customer?.email === email);
    return {};
  };

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
                    <DefaultButton
                      disabled={false}
                      title={"Se connecter"}
                      onEventHandler={async () => {
                        const email = "y.chafyaay@gmail.com";
                        const password = "Chy@@1986!!";

                        const response = await LOGIN_HANDLER({
                          email,
                          password,
                        });

                        if (!!response?.token && !!response?.user_email) {
                          const customer = (await getCustomer(
                            response.user_email
                          )) as any;

                          const customer_id = customer?.id;

                          dispatch(
                            setUser({
                              token: response.token,
                              user: {
                                displayName: response.user_display_name,
                                userName: response.user_nicename,
                                email: response.user_email,
                              },
                              customer: customer,
                            })
                          );
                        } else if (!!response?.message) {
                          const text = response?.message.split(".");
                          Toast.show({
                            type: "error",
                            text1: text[0],
                            text2: text[1],
                          });
                        } else {
                          Toast.show({
                            type: "error",
                            text1: "Echec de l'authentification!",
                            text2: "Erreur inconnue !",
                          });
                        }
                      }}
                    />

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
  cart: state?.cartReducer,
  products: state,
});

export default connect(mapStateToProps, {
  setToken,
  getToken,
  getUserData,
  setAllProducts,
  setProduct,
})(LoginScreen);
