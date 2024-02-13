import { ScrollView, View, ImageBackground } from "react-native";
import {
  Text,
  Badge,
  MD2Colors,
  Divider,
  Icon,
  SegmentedButtons,
  ActivityIndicator,
  MD2DarkTheme,
  MD2LightTheme,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";
import Carousel from "react-native-snap-carousel";
import RenderHtml from "react-native-render-html";
import { useSelector } from "react-redux";
import AddToCart from "../../components/AddToCart";
import { ProductProps } from "../../utils/models";
import { useQuery } from "react-query";
import { GET_SHIPPING_MODES } from "../../utils/api-calls";
import { ReviewList } from "../../components/Reviews/ReviewList";
import { SafeAreaView } from "react-native-safe-area-context";
import { PressableButton } from "../../components/UI/Buttons";
import { TextHolder } from "../../components/UI/TextHolder";
import {
  InStockText,
  PriceText,
  SaleText,
} from "../../components/Product/ProductCard/helpers";
import { Typography } from "../../components/UI/Typography";
import Spacer from "../../components/UI/Spacer";

export default function ProductDetailsScreen({ route, navigation }) {
  const [shippingData, setShippingData] = useState([]);
  const [segmentedButtonsValue, setSegmentedButtonsValue] = useState("about");

  const product = route?.params?.product as ProductProps;
  const {
    name,
    description,
    images,
    price,
    regular_price,
    sale_price,
    on_sale,
    short_description,
  } = product;

  const { data, isLoading } = useQuery(
    "GET_SHIPPING_MODES",
    GET_SHIPPING_MODES
  );

  useEffect(() => {
    setShippingData(data);
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <SafeAreaView>
          <View style={{ padding: 15, paddingBottom: 100 }}>
            <Carousel
              layout="default"
              autoplay
              data={images}
              showsHorizontalScrollIndicator
              renderItem={(props) => {
                const { item } = props;
                return (
                  <>
                    <SaleText
                      regular_price={product.regular_price}
                      sale_price={product.sale_price}
                    />
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
            <Typography size={20} fontWeight="Medium" variant="headlineMedium">
              {name}
            </Typography>

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
              <PriceText
                sale_price={product.sale_price}
                price={product.price}
                cardView={undefined}
                regular_price={product.regular_price}
              />
              <InStockText stock_status={product.stock_status} />
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
                color={MD2Colors.black}
                source={"truck-cargo-container"}
                size={30}
              />
              <View
                style={{
                  paddingLeft: 20,
                }}
              >
                {!!isLoading ? (
                  <ActivityIndicator color={MD2Colors.black} size={17} />
                ) : (
                  shippingData?.map((item: any, index: number) => (
                    <Typography variant="bodyMedium" key={index}>
                      {"- " + item.description}
                    </Typography>
                  ))
                )}
              </View>
            </View>
            <Spacer size={10} />

            <PressableButton icon="whatsapp" fontWeight="Bold" type="whatsapp">
              Commander via WhatsApp
            </PressableButton>

            <Divider style={{ marginTop: 20, marginBottom: 20 }} />

            <SegmentedButtons
              theme={MD2LightTheme}
              value={segmentedButtonsValue}
              onValueChange={setSegmentedButtonsValue}
              buttons={[
                {
                  value: "about",
                  label: "Description",
                  showSelectedCheck: true,
                  style: {},
                  labelStyle: {
                    fontSize: 12,
                    borderRadius: 0,
                  },
                },
                {
                  value: "Specifications",
                  label: "Spécifications",
                  showSelectedCheck: true,
                  labelStyle: {
                    fontSize: 12,
                    borderRadius: 0,
                  },
                },
                {
                  value: "review",
                  label: "Avis",
                  showSelectedCheck: true,
                  labelStyle: {
                    fontSize: 12,
                    borderRadius: 2,
                  },

                  style: {
                    columnGap: 1,
                    shadowRadius: 0,
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
                <ReviewList product={product} />
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
