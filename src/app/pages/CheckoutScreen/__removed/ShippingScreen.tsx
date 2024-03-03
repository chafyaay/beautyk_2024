import { ScrollView, View } from "react-native";
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
} from "react-native-paper";
import { CustomersProps } from "../../../utils/models";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { CREATE_CUSTOMER } from "../../../utils/api-calls";
import React, { useLayoutEffect, useState } from "react";
import { deviceHeight, deviceWidth } from "../../../utils/device";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const shippingForm = {
  first_name: "yassine",
  last_name: "chafyaay",
  phone: "+21233667789",
  address_1: "taj living",
  address_2: "taj living",
  city: "Casablanca",
  state: "Nouaceur",
  postcode: "23098",
};

const getFormLabel = (input: string) => {
  const labels = {
    email: "Email",
    first_name: "Nom",
    username: "Nom d'utulisateur ",
    phone: "Numéro de Téléphone",
    address_1: "Adress 1",
    address_2: "Adress 2",
    city: "Ville",
    state: "Région",
    postcode: "Code postale",
  };
  if (!!input) return labels[input];
  return "";
};

const shippingIntialvalues = {
  first_name: "yassine",
  last_name: "chafyaay",
  phone: "+21233667789",
  address_1: "taj living",
  address_2: "taj living",
  city: "Casablanca",
  state: "Nouaceur",
  postcode: "23098",
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const DisplayingErrorMessagesSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide ")
    .required("Valeur Requise"),
  first_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
  last_name: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
  city: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
  address_1: Yup.string()
    .min(2, "Valeur trop courte !")
    .max(50, "Valeur Trop Long !")
    .required("Valeur Requise"),
});

export default function ShippingScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  useLayoutEffect(() => {}, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Formik
            validationSchema={DisplayingErrorMessagesSchema}
            initialValues={shippingIntialvalues}
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
              <>
                {Object.keys(shippingForm).map((input, index) => (
                  <View key={index}>
                    <TextInput
                      disabled={isLoading}
                      style={{ marginTop: 10 }}
                      label={getFormLabel(input)}
                      onChangeText={handleChange(input)}
                      onBlur={handleBlur(input)}
                      value={values[input]}
                      dense
                      mode="outlined"
                      theme={MD2LightTheme}
                      activeOutlineColor={
                        touched[input] && errors[input]
                          ? MD2Colors.red800
                          : MD2Colors.indigo500
                      }
                    />
                    {touched[input] && errors[input] && (
                      <Text
                        variant="bodySmall"
                        style={{ color: MD2Colors.red800 }}
                      >
                        {errors[input] as any}
                      </Text>
                    )}
                  </View>
                ))}
                <Button
                  style={{ marginTop: 30 }}
                  mode="contained"
                  theme={MD2LightTheme}
                  onPress={async () => {
                    setIsLoading(true);
                    const response = await CREATE_CUSTOMER({
                      ...route.params,
                      ...values,
                    });

                    if (!!response) {
                      if (response.code === "registration-error-email-exists") {
                        Toast.show({
                          type: "error",
                          text1: response?.message
                            .split(" ")
                            .slice(0, 6)
                            .join(" "),
                          text2: response?.message
                            .split(" ")
                            .slice(6)
                            .join(" ")
                            .split(".")[0],
                          text1Style: {
                            fontSize: 14,
                            fontWeight: "400",
                            color: MD2Colors.red500,
                          },
                          text2Style: {
                            fontSize: 14,
                            fontWeight: "400",
                            color: MD2Colors.red500,
                          },
                        });
                      } else {
                      }
                    }

                    setIsLoading(false);
                  }}
                  disabled={!isValid}
                >
                  Valider {isLoading && <ActivityIndicator size={16} />}
                </Button>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}
