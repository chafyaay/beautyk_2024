import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";
import React, { useMemo } from "react";
import { ImageBackground } from "react-native";
import CartScreen from "../pages/CartScreen/CartScreen";
import CheckoutScreen from "../pages/CheckoutScreen/CheckoutScreen";
import { OrderReceivedScreen } from "../pages/CheckoutScreen/OrderReceivedScreen";
import ShippingScreen from "../pages/CheckoutScreen/ShippingScreen";
import HomeScreen from "../pages/HomeScreen/HomeScreen";
import ProductDetailsScreen from "../pages/ProductDetailsScreen/ProductDetailsScreen";
import { $color2, $color1, deviceWidth } from "../utils/device";
import LoginScreen from "../pages/CheckoutScreen/LoginScreen";

const Stack = createNativeStackNavigator();

const AppContext = createContext({});

export function Routing() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const appContextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
    }),
    [isSignedIn]
  );

  return (
    <>
      <AppContext.Provider value={appContextValue}>
        <NavigationContainer>
          <Stack.Navigator>
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
              name="HomeScreen"
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
                  onChangeText: (event) => console.log(event.nativeEvent.text),
                },
              }}
            />

            <Stack.Screen
              name="CartScreen"
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
              name="ProductDetailsScreen"
              component={ProductDetailsScreen}
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
              name="ShippingScreen"
              component={ShippingScreen}
            />
            <Stack.Screen
              options={{
                headerBackTitleVisible: false,
                title: " ",
                headerShadowVisible: false,
                headerTintColor: $color2,
                navigationBarColor: $color1,
              }}
              name="OrderReceivedScreen"
              component={OrderReceivedScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
}
