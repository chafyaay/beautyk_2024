import {
  ScrollView,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import ProductItem from "../../components/Product/ProductItem";
import {
  Card,
  Paragraph,
  Text,
  Button,
  Badge,
  IconButton,
  MD2DarkTheme,
  MD3DarkTheme,
  MD2Colors,
  Divider,
  Icon,
  MD3Colors,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { $color1, $color2, deviceWidth } from "../../utils/device";
import Carousel from "react-native-snap-carousel";
import { AirbnbRating, Rating } from "react-native-ratings";
import RenderHtml from "react-native-render-html";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import AddToCart from "../../components/AddToCart";
import { ProductProps } from "../../utils/models";
import { useQuery } from "react-query";
import { GET_SHIPPING_MODES } from "../../utils/api-calls";
import { RatingReview } from "../../components/RatingReview/RatingReview";

export default function ProductScreen({ route, navigation }) {
  const product = route?.params?.query as ProductProps;
  const {
    name,
    description,
    images,
    price_html,
    price,
    regular_price,
    sale_price,
    stock_status,
    on_sale,
  } = product;
  const { cart } = useSelector((state) => state) as any;
  const quantity = cart?.items?.reduce((a, b) => (a += b?.quantity), 0);
  const [shippingData, setShippingData] = useState([]);

  const { data, isLoading } = useQuery(
    "GET_SHIPPING_MODES",
    GET_SHIPPING_MODES
  );

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <>
          {!!quantity && (
            <Pressable
              onPress={() => {
                navigation.navigate("cart");
              }}
            >
              <IconButton icon={"cart"}></IconButton>
              <Badge style={{ position: "absolute", right: 5, top: 3 }}>
                {quantity}
              </Badge>
            </Pressable>
          )}
        </>
      ),
    });
  }, [quantity]);

  useEffect(() => {
    setShippingData(data);
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 100 }}>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text variant="titleMedium">{name}</Text>
          <Carousel
            layout="default"
            autoplay
            data={images}
            showsHorizontalScrollIndicator
            renderItem={(props) => {
              const { item } = props;
              return (
                <>
                  <ImageBackground
                    resizeMode="contain"
                    style={{
                      height: 200,
                      backgroundColor: "white",
                    }}
                    source={{ uri: item?.src }}
                  />
                </>
              );
            }}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
            style={{ padding: 0, margin: 0 }}
          />

          {/* price */}
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 30,
              alignItems: "center",
            }}
          >
            <View>
              {!sale_price ? (
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "800", color: $color1 }}
                >
                  {price} Dh
                </Text>
              ) : (
                <>
                  <Text
                    variant="bodySmall"
                    style={{
                      color: $color2,
                      textDecorationLine: "line-through",
                    }}
                  >
                    {regular_price} Dh
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ fontWeight: "800", color: $color1 }}
                  >
                    {sale_price} Dh
                  </Text>
                </>
              )}
              {/* on sale  */}
              {!!on_sale ? (
                <Badge
                  theme={{ colors: { secondary: "green" } }}
                  style={{
                    position: "absolute",
                    bottom: 3,
                    right: -40,
                    backgroundColor: MD2Colors.redA200,
                  }}
                  children={
                    -Math.round(
                      ((Number(regular_price) - Number(sale_price)) * 100) /
                        Number(regular_price)
                    ) + "%"
                  }
                ></Badge>
              ) : (
                ""
              )}
            </View>

            <Text
              variant="labelLarge"
              style={{ fontWeight: "800", color: MD2Colors.green400 }}
            >
              {product.stock_status === "instock" ? "En stock" : "epuisé"}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: 10,
            }}
          >
            <Icon source={"truck-cargo-container"} size={30} />
            <View
              style={{
                paddingLeft: 20,
              }}
            >
              {!!isLoading
                ? ""
                : shippingData?.map((item: any, index: number) => (
                    <Text key={index} variant="bodySmall">
                      {item.description}
                    </Text>
                  ))}
            </View>
          </View>
          <Divider style={{ marginBottom: 20 }}></Divider>
          {/* Order choices */}
          <View>
            <Button
              style={{ marginTop: 10, marginBottom: 20 }}
              mode="contained-tonal"
              collapsable
              theme={MD3DarkTheme}
              icon={"whatsapp"}
              buttonColor={MD2Colors.greenA400}
              textColor={MD2Colors.green900}
            >
              Commander via whatsapp
            </Button>
            <Button theme={MD3DarkTheme} mode="contained">
              Acheter maintemant{" "}
            </Button>
          </View>

          <Divider style={{ marginTop: 30 }}></Divider>

          <RenderHtml
            contentWidth={deviceWidth}
            source={{ html: description }}
            classesStyles={{ Text: { color: "red" } }}
          />
          <RatingReview product={product} />
        </View>
      </ScrollView>
      <AddToCart isProductPage product={product} />
    </View>
  );
}
