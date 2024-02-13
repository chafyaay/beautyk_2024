import {
  Text,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { deviceWidth } from "../../utils/device";
import { MD2Colors } from "react-native-paper";
import { useEffect, useState } from "react";
import {
  GET_BANNER_BY_SECTION,
  GET_BANNER_PRODUCTS,
  getFeaturedData,
} from "../../utils/api-calls";
import { useQuery } from "react-query";
import { Skelton } from "../UI/Skelton";
import { ProductList } from "../Product/ProdcutList";
import ProductCard from "../Product/ProductCard/ProductCard";
import { useNavigation } from "@react-navigation/native";

export default function FeaturedProducts() {
  const navigation = useNavigation() as any;
  const { data, isLoading } = useQuery("getFeaturedData", async () =>
    getFeaturedData(4)
  );

  if (isLoading) return <Skelton type="BANNER" />;
  else if (!isLoading && data?.data?.length > 0)
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {data?.data?.map((product) => (
            <View
              key={product.id}
              style={{
                maxWidth: deviceWidth / 2,
                padding: 10,
              }}
            >
              <ProductCard
                navigation={navigation}
                product={product}
                showAddTocart={true}
                showTitle={true}
                cardView={"GRID"}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
