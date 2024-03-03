import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import AddToCart from "../AddToCart";
import { Card, MD2Colors, Text } from "react-native-paper";
import { ProductProps } from "../../utils/models";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";
import { Typography } from "../UI/Typography";
import DataIndex from "../../utils/DataIndex";
import { PriceText } from "./ProductCard/helpers";

interface ProductCardProps {
  product: ProductProps;
  type?: "a" | "b" | "c";
  navigation: any;
}

const shadowStyle = {
  shadowColor: "#171717",
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 3,
};

export const ProductListCard: React.FC<ProductCardProps> = ({
  navigation,
  product,
  type,
}) => {
  const { price, regular_price, sale_price } = product;

  return (
    <View style={[styles.container, type !== "c" ? shadowStyle : {}]}>
      <Card.Cover
        style={{
          height: 60,
          width: 60,
        }}
        source={{
          uri: product?.images[0]?.src,
        }}
      />
      <View style={{ flex: 1 }}>
        <Typography
          fontWeight="Regular"
          numberOfLines={1}
          children={product?.name}
          style={{ flex: 1 }}
        />
        <PriceText
          sale_price={sale_price}
          price={price}
          cardView="LIST"
          regular_price={regular_price}
        />
      </View>
      <View style={{ position: "absolute", right: 0, bottom: 0 }}>
        <AddToCart
          showDeleteIcon={type !== "c"}
          isCartPage
          product={product}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    width: "100%",
    maxHeight: 80,
    backgroundColor: MD2Colors.white,
    columnGap: 10,
  },
  cover: {
    width: 80,
    height: 80,
    marginRight: "3%",
  },
  body: {
    width: deviceWidth - 145,
    height: "100%",
    paddingLeft: 15,
  },
});
