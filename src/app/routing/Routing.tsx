import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useEffect, useState } from "react";
import React, { useMemo } from "react";
import { ImageBackground } from "react-native";
import CartScreen from "../pages/CartScreen/CartScreen";
import CheckoutScreen from "../pages/CheckoutScreen/CheckoutScreen";
import { OrderReceivedScreen } from "../pages/CheckoutScreen/OrderReceivedScreen";
import ShippingScreen from "../pages/CheckoutScreen/ShippingScreen";
import HomeScreen from "../pages/HomeScreen/HomeScreen";
import ProductDetailsScreen from "../pages/ProductDetailsScreen/ProductDetailsScreen";
import { TEXT_COLOR, deviceWidth } from "../utils/device";
import LoginScreen from "../pages/CheckoutScreen/LoginScreen";
import { useSelector } from "react-redux";
import { MyOrdersListScreen } from "../pages/MyOrdersScreen/MyOrdersListScreen";
import ProductListScreen from "../pages/ProductListScreen/ProductListScreen";
import Header from "../components/Header/Header";

const Stack = createNativeStackNavigator();

const AppContext = createContext({});

export function Routing() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const { user, token } = useSelector((state: any) => state.user) as any;

  useEffect(() => {
    setIsSignedIn(!!token && Object.values(user).length > 0);
  }, [user, token]);

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
            {!!isSignedIn ? (
              <>
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
                      onChangeText: (event) =>
                        console.log(event.nativeEvent.text),
                    },
                  }}
                />
                <Stack.Screen
                  name="CartScreen"
                  options={{
                    headerBackTitleVisible: false,
                    title: "Mon Panier",
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  component={CartScreen}
                />
                <Stack.Screen
                  options={{
                    headerBackTitleVisible: false,
                    title: "",
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  name="ProductDetailsScreen"
                  component={ProductDetailsScreen}
                />
                <Stack.Screen
                  options={{
                    headerBackTitleVisible: false,
                    title: "Créer un compte",
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  name="RegisterScreen"
                  component={CheckoutScreen}
                />
                <Stack.Screen
                  options={{
                    headerBackTitleVisible: false,
                    title: " ",
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  name="ShippingScreen"
                  component={ShippingScreen}
                />
                <Stack.Screen
                  options={{
                    headerBackTitleVisible: false,
                    title: " ",
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  name="OrderReceivedScreen"
                  component={OrderReceivedScreen}
                />
                <Stack.Screen
                  options={{
                    headerBackTitleVisible: false,
                    title: " ",
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  name="MyOrdersListScreen"
                  component={MyOrdersListScreen}
                />
                <Stack.Screen
                  options={{
                    headerBackTitleVisible: false,
                    title: " ",
                    headerShadowVisible: false,
                    headerTintColor: TEXT_COLOR.primary,
                    navigationBarColor: TEXT_COLOR.default,
                  }}
                  name="ProductListScreen"
                  component={ProductListScreen}
                />
              </>
            ) : (
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  title: " ",
                  headerShadowVisible: false,
                  headerTintColor: TEXT_COLOR.primary,
                  navigationBarColor: TEXT_COLOR.default,
                }}
                name="LoginScreen"
                component={LoginScreen}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
}
