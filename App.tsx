import { ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import CartScreen from "./app/pages/CartScreen/CartScreen";
import CheckoutScreen from "./app/pages/CheckoutScreen/CheckoutScreen";
import LoginScreen from "./app/pages/CheckoutScreen/Login";
import ShippingScreen from "./app/pages/CheckoutScreen/ShippingScreen";
import HomeScreen from "./app/pages/HomeScreen/HomeScreen";
import ProductScreen from "./app/pages/ProductScreen/ProductScreen";
import { deviceWidth, $color2, $color1 } from "./app/utils/device";
import store from "./app/utils/store/store";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{
                  title: "",
                  headerBackButtonMenuEnabled: false,
                  headerBackVisible: false,
                  contentStyle: { paddingTop: 0 },
                  headerTitle: () => (
                    <ImageBackground
                      style={{ width: deviceWidth, height: 50 }}
                      resizeMode="contain"
                      source={{
                        uri: "https://orgaliving.com/wp-content/uploads/2024/01/beautyk-logo.png",
                      }}
                    />
                  ),

                  headerSearchBarOptions: {
                    placeholder: "Rechercher de votre produit ici ...",
                    onChangeText: (event) =>
                      console.log(event.nativeEvent.text),
                  },
                }}
              />

              <Stack.Screen
                name="cart"
                options={{
                  headerBackTitleVisible: false,
                  title: "Mon Panier",
                  headerShadowVisible: false,
                  headerTintColor: $color2,
                  navigationBarColor: $color1,
                }}
                component={CartScreen}
              />
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  title: "",
                  headerShadowVisible: false,
                  headerTintColor: $color2,
                  navigationBarColor: $color1,
                }}
                name="ProductScreen"
                component={ProductScreen}
              />
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  title: "Créer un compte",
                  headerShadowVisible: false,
                  headerTintColor: $color2,
                  navigationBarColor: $color1,
                }}
                name="RegisterScreen"
                component={CheckoutScreen}
              />
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  title: " ",
                  headerShadowVisible: false,
                  headerTintColor: $color2,
                  navigationBarColor: $color1,
                }}
                name="LoginScreen"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  title: " ",
                  headerShadowVisible: false,
                  headerTintColor: $color2,
                  navigationBarColor: $color1,
                }}
                name="ShippingScreen"
                component={ShippingScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
      <Toast />
    </Provider>
  );
}
