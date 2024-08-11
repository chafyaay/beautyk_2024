import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LoginScreen from "./LoginScreen";
import { selectUser } from "../utils/store/selectors";
import { HomeScreen } from "./HomeScreen";
import CartSummaryScreen from "./CartSummaryScreen";
const Stack = createNativeStackNavigator();

export const ROURES = {
  HomeScreen: HomeScreen,
  CartSummaryScreen: CartSummaryScreen,
};

export type paths =
  | "HomeScreen"
  | "CartSummaryScreen"
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

export function Routes() {
  const user = useSelector(selectUser);

  const isLoggedIn = useMemo(() => {
    if (user) return !!user.token && !!user.email;
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Homecreen"}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {isLoggedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="CartSummaryScreen"
              component={CartSummaryScreen}
            />
          </>
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
