import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { createContext, useEffect } from "react";
import React, { useMemo } from "react";
import CartScreen from "../pages/CartScreen/CartScreen";
import CheckoutScreen from "../pages/CheckoutScreen/CheckoutScreen";
import { OrderReceivedScreen } from "../pages/CheckoutScreen/OrderReceivedScreen";
import HomeScreen from "../pages/HomeScreen/HomeScreen";
import ProductDetailsScreen from "../pages/ProductDetailsScreen/ProductDetailsScreen";
import { TEXT_COLOR } from "../utils/device";
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
import { Text } from "react-native-paper";
import { MyAccountScreen } from "../pages/ProfileScreen/MyAccountScreen";

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
  let headerShown = true;

  switch (pageId) {
    case "HomeScreen":
      props = {
        search: true,
        goBack: false,
        showCart: true,
        showLogo: true,
      };
      break;
    case "SearchProductsScreen":
    case "ProductListScreen":
    case "ProductDetailsScreen":
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
        showCart: false,
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
      break;

    default:
      return options;
  }

  options = {
    header: () => <AppHeader {...props} />,
    headerShown,
  };
  return options;
};

function ProfileScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      <Stack.Screen name="MyOrdersListScreen" component={MyOrdersListScreen} />
    </Stack.Navigator>
  );
}

export function Routing() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const { user, token } = useSelector((state: any) => state.user) as any;

  useEffect(() => {
    setIsSignedIn(!!token && Object.values(user).length > 0);
  }, [user, token]);

  useEffect(() => {}, []);

  const appContextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
    }),
    [isSignedIn]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        <ProfileScreens />
        <Stack.Navigator>
          {!!isSignedIn ? (
            <>
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
                name="ProfileScreen"
                component={ProfileScreen}
                options={getOptionsHandler("ProfileScreen")}
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
  );
}
