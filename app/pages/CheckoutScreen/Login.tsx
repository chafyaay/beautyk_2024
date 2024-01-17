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
} from "react-native-paper";
import { CustomersProps } from "../../utils/models";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { useState } from "react";
import { deviceHeight, deviceWidth } from "../../utils/device";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

const LoginFormSchema = Yup.object().shape({
  phone: Yup.string()
    .email("Email entré n'est pas valide ")
    .required("Valeur Requise"),
});

const LoginFormValue = { email: "" };

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <ImageBackground
          style={{
            width: deviceWidth,
            height: 50,

            marginTop: 60,
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
                {touched["email"] && errors["email"] && (
                  <Text variant="bodySmall" style={{ color: MD2Colors.red800 }}>
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
                  <Button onPress={async () => {}} mode="contained">
                    Se connecter
                  </Button>
                  <Button
                    onPress={() => {
                      navigation.navigate("RegisterScreen");
                    }}
                    mode="outlined"
                  >
                    Crér votre compte
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}
