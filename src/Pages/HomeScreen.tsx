import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import Promotion from "../Components/Home/Promotion";
import Categories from "../Components/Home/Categories";
import BestSeller from "../Components/Home/BestSeller";
import NewArrival from "../Components/Home/NewArrival";
import { FeaturedProducts } from "../Components/Home/FeaturedProducts";
import { useEffect } from "react";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
//import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

export const HomeScreen = () => {
  return (
    <ScrollView>
      <Promotion />
      <Categories />
      <BestSeller />
      <FeaturedProducts />
      <NewArrival />
    </ScrollView>
  );
};
