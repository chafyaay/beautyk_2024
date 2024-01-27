import {
  Text,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { deviceWidth } from "../../utils/device";
import { MD2Colors } from "react-native-paper";
import { useEffect, useState } from "react";
import {
  GET_BANNER_BY_SECTION,
  GET_BANNER_PRODUCTS,
} from "../../utils/api-calls";
import { useQuery } from "react-query";

export default function Banners({ navigation }) {
  const { data, isLoading } = useQuery("get banner products", async () =>
    GET_BANNER_BY_SECTION("section-slider")
  );

  return (
    <View>
      <ScrollView horizontal showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 150,
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
            width: "auto",
          }}
        >
          {data?.data?.map((item) => (
            <Pressable
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("ProductListScreen", { ...item });
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: item.image?.src,
                }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
