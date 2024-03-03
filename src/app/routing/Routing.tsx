import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { createContext, useEffect, useState } from "react";
import React, { useMemo } from "react";
import CartScreen from "../pages/CartScreen/CartScreen";
import CheckoutScreen from "../pages/CheckoutScreen/CheckoutScreen";
import HomeScreen from "../pages/HomeScreen/HomeScreen";
import ProductDetailsScreen from "../pages/ProductDetailsScreen/ProductDetailsScreen";
import { TEXT_COLOR, deviceHeight, deviceWidth } from "../utils/device";
import LoginScreen from "../pages/Login/LoginScreen";
import { useSelector } from "react-redux";
import { MyOrdersListScreen } from "../pages/MyOrdersScreen/MyOrdersListScreen";
import ProductListScreen from "../pages/ProductListScreen/ProductListScreen";
import { ProfileScreen } from "../pages/ProfileScreen/ProfileScreen";
import AppHeader from "../components/AppHeader/AppHeader";
import SearchProductsScreen from "../pages/SearchProductsScreen/SearchProductsScreen";
import UpdateAdressScreen from "../pages/UpdateAdressScreen/UpdateAdressScreen";
import { AddReviewScreen } from "../pages/AddReviewScreen/AddReviewScreen";
import BottomNavBar from "../components/BottomNavBar/BottomNavBar";
import { Icon, IconButton, MD2Colors, Text } from "react-native-paper";
import { MyAccountScreen } from "../pages/ProfileScreen/MyAccountScreen";
import Cart from "../components/Cart/Cart";
import { SearchBarAutocomplet } from "../components/commun/Search/SearchBarAutocomplet";
import { Modal, ScrollView, View } from "react-native";
import { Typography } from "../components/UI/Typography";
import Toast from "react-native-toast-message";
import { AllProductsScreen } from "../pages/AllProductsScreen/AllProductsScreen";
import { MainMenuScreen } from "../pages/MainMenuScreen/MainMenuScreen";
import { HeaderLeft } from "../components/AppHeader/HeaderLeft";
import { HeaderTitle } from "../components/AppHeader/HeaderTitle";

import { userSelector } from "../utils/store/selectors";
import { retrieveProducts } from "../utils/api-calls";
import { OrderReceivedScreen } from "../pages/CheckoutScreen/__removed/OrderReceivedScreen";

const Stack = createNativeStackNavigator();

const AppContext = createContext({});

export type PATHS =
  | "HomeScreen"
  | "CartScreen"
  | "ProductDetailsScreen"
  | "CheckoutScreen"
  | "ShippingScreen"
  | "OrderReceivedScreen"
  | "MyOrdersListScreen"
  | "ProductListScreen"
  | "LoginScreen"
  | "SearchProductsScreen"
  | "ProfileScreen"
  | "AddReviewScreen"
  | "UpdateAdressScreen"
  | "AllProductsScreen"
  | "MyAccountScreen";

export interface AppHeaderProps {
  title?: string;
  navigation?: any;
  search?: boolean;
  showCart?: boolean;
  showLogo?: boolean;
  goBack?: boolean;
}

const getOptionsHandler = (pageId: PATHS) => {
  let options: NativeStackNavigationOptions = {};
  let props: AppHeaderProps = {};

  switch (pageId) {
    case "HomeScreen":
      props = {
        search: true,
        goBack: false,
        showCart: false,
        showLogo: true,
      };
      break;
    case "SearchProductsScreen":
    case "ProductListScreen":
    case "ProductDetailsScreen":
    case "AllProductsScreen":
      props = {
        search: true,
        goBack: true,
        showCart: true,
      };
      break;
    case "ProfileScreen":
      props = {
        search: false,
        goBack: true,
        showCart: false,
      };
      break;
    case "UpdateAdressScreen":
      props = {
        search: false,
        goBack: true,
        showCart: false,
        title: "Changer l'adresse",
      };
      break;
    case "CartScreen":
      props = {
        search: false,
        goBack: true,
        showCart: true,
        title: "Mon panier",
      };
      break;
    case "CheckoutScreen":
      props = {
        search: false,
        goBack: true,
        showCart: true,
        title: "Valider ma commande",
      };
      break;
    case "AddReviewScreen":
      props = {
        search: false,
        goBack: true,
        showCart: false,
        title: "Donner votre avis",
      };
    case "MyOrdersListScreen":
      props = {
        search: false,
        goBack: true,
        showCart: false,
        title: "Historique de mes commandes",
      };

      break;

    default:
      return options;
  }

  options = {
    headerLeft: () => (
      <HeaderLeft logo={props.showLogo} goback={props.goBack} />
    ),
    headerRight: () => <Cart visible={props.showCart} />,
    headerTitle: () => (
      <HeaderTitle
        showLogo={props.showLogo}
        isSearch={props.search}
        title={props.title}
      />
    ),
  };
  return options;
};

export function Routing() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const appContextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
    }),
    [isSignedIn]
  );

  const user = useSelector(userSelector);
  const isLoggedIn = useMemo(() => {
    return !!user.token && !!user.email;
  }, [user]);

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={getOptionsHandler("HomeScreen")}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={getOptionsHandler("CartScreen")}
          />
          <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
            options={getOptionsHandler("ProductDetailsScreen")}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={getOptionsHandler("CheckoutScreen")}
          />

          <Stack.Screen
            name="OrderReceivedScreen"
            component={OrderReceivedScreen}
            options={getOptionsHandler("OrderReceivedScreen")}
          />
          <Stack.Screen
            name="MyOrdersListScreen"
            component={MyOrdersListScreen}
            options={getOptionsHandler("MyOrdersListScreen")}
          />
          <Stack.Screen
            name="ProductListScreen"
            component={ProductListScreen}
            options={getOptionsHandler("ProductListScreen")}
          />
          <Stack.Screen
            name="SearchProductsScreen"
            component={SearchProductsScreen}
            options={getOptionsHandler("SearchProductsScreen")}
          />

          <Stack.Screen
            name="UpdateAdressScreen"
            component={UpdateAdressScreen}
            options={getOptionsHandler("UpdateAdressScreen")}
          />
          <Stack.Screen
            name="AddReviewScreen"
            component={AddReviewScreen}
            options={getOptionsHandler("AddReviewScreen")}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={getOptionsHandler("ProfileScreen")}
          />
          <Stack.Screen
            name="AllProductsScreen"
            component={AllProductsScreen}
            options={getOptionsHandler("AllProductsScreen")}
          />
          <Stack.Screen
            name="MainMenuScreen"
            component={MainMenuScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
