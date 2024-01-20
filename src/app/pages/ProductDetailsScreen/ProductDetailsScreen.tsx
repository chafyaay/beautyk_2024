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
  Portal,
  SegmentedButtons,
  ActivityIndicator,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { $color1, $color2, deviceWidth } from "../../utils/device";
import Carousel from "react-native-snap-carousel";
import { AirbnbRating, Rating } from "react-native-ratings";
import RenderHtml, { RenderHTML } from "react-native-render-html";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import AddToCart from "../../components/AddToCart";
import { ProductProps } from "../../utils/models";
import { useQuery } from "react-query";
import { GET_SHIPPING_MODES } from "../../utils/api-calls";
import { RatingReview } from "../../components/RatingReview/RatingReview";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import { PrimaryButton } from "../../components/UI/Buttons";

export default function ProductDetailsScreen({ route, navigation }) {
  const [shippingData, setShippingData] = useState([]);
  const [segmentedButtonsValue, setSegmentedButtonsValue] = useState("about");

  const { cart } = useSelector((state) => state) as any;
  const quantity = cart?.items?.reduce((a, b) => (a += b?.quantity), 0);

  const product = route?.params?.product as ProductProps;
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
    short_description,
  } = product;

  const { data, isLoading } = useQuery(
    "GET_SHIPPING_MODES",
    GET_SHIPPING_MODES
  );

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: false,
      headerRight: () => (
        <>
          {!!quantity && (
            <Pressable
              onPress={() => {
                navigation.navigate("CartScreen");
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <SafeAreaView>
          <View style={{ padding: 15 }}>
            <Header navigation={navigation} title={""} />

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

            <Divider style={{ marginTop: 20, marginBottom: 10 }} />

            <Text
              style={{
                textTransform: "capitalize",
                color: MD2Colors.indigo500,
                width: "100%",
                textAlign: "left",
              }}
              numberOfLines={3}
              variant="bodyLarge"
            >
              {name}
            </Text>

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
                style={{
                  fontWeight: "800",
                  color: MD2Colors.green400,
                }}
              >
                {product.stock_status === "instock" ? "En stock" : "epuisé"}
              </Text>
            </View>

            {/* Order choices */}
            <View>
              <AddToCart
                navigation={navigation}
                isProductPage
                product={product}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 10,
                backgroundColor: MD2Colors.grey100,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <Icon
                color={MD2Colors.indigo300}
                source={"truck-cargo-container"}
                size={30}
              />
              <View
                style={{
                  paddingLeft: 20,
                }}
              >
                {!!isLoading ? (
                  <ActivityIndicator color={MD2Colors.indigo300} size={17} />
                ) : (
                  shippingData?.map((item: any, index: number) => (
                    <Text key={index} variant="labelSmall">
                      - {item.description}
                    </Text>
                  ))
                )}
              </View>
            </View>

            <Divider style={{ marginTop: 20, marginBottom: 20 }} />

            <SegmentedButtons
              value={segmentedButtonsValue}
              onValueChange={setSegmentedButtonsValue}
              buttons={[
                {
                  value: "about",
                  label: "Description",
                  showSelectedCheck: true,
                  labelStyle: {
                    fontSize: 12,
                    color: MD2Colors.indigo400,
                  },
                },
                {
                  value: "Specifications",
                  label: "Spécifications",
                  showSelectedCheck: true,
                  labelStyle: { fontSize: 12, color: MD2Colors.indigo400 },
                },
                {
                  value: "review",
                  label: "Avis",
                  showSelectedCheck: true,
                  labelStyle: {
                    fontSize: 12,
                    color: MD2Colors.indigo400,
                  },

                  style: {
                    columnGap: 1,
                    shadowRadius: 0,
                    backgroundColor: "white",
                    shadowOpacity: 0,
                  },
                },
              ]}
              density="small"
            />
            <View>
              {segmentedButtonsValue === "about" && (
                <RenderHtml
                  contentWidth={deviceWidth}
                  source={{ html: description }}
                  classesStyles={{ Text: { color: "red" } }}
                />
              )}
              {segmentedButtonsValue === "Specifications" && (
                <RenderHtml
                  contentWidth={deviceWidth}
                  source={{ html: short_description }}
                  classesStyles={{ Text: { color: "red" } }}
                />
              )}
              {segmentedButtonsValue === "review" && (
                <RatingReview product={product} />
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 30,
          padding: 30,
          paddingBottom: 0,
        }}
      >
        <PrimaryButton
          title="Commander via WhatsApp"
          onEventHandler={() => {}}
        />
      </View>
    </View>
  );
}
