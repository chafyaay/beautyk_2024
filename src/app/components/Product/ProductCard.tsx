import { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateCartItem } from "../../utils/store/actions/cart.actions";
import { connect } from "react-redux";
import useAddToCart from "../AddToCart";
import AddToCart from "../AddToCart";
import { $color1, $color2, deviceWidth } from "../../utils/device";
import { Badge, MD2Colors, Paragraph, Text } from "react-native-paper";
import { ProductProps } from "../../utils/models";

interface ProductCardProps {
  product: ProductProps;
  type?: "a" | "b" | "c";
  navigation: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  navigation,
  product,
  type,
}) => {
  const {
    images,
    name,
    price,
    regular_price,
    sale_price,
    stock_status,
    on_sale,
  } = product;

  return (
    <Pressable
      onPress={() => navigation?.navigate("ProductDetailsScreen")}
      style={
        type !== "c"
          ? styles.container
          : {
              flexDirection: "row",
              height: 70,
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderRadius: 2,
              marginBottom: 5,
              width: "100%",
            }
      }
    >
      {type !== "c" && (
        <ImageBackground
          source={{
            uri: product?.images[0]?.src,
          }}
          resizeMode="contain"
          imageStyle={{ width: "100%" }}
          style={styles.cover}
        />
      )}

      <View
        style={type !== "c" ? styles.body : { width: "75%", paddingLeft: 10 }}
      >
        <Text
          variant="bodySmall"
          style={{
            paddingRight: 30,
            marginTop: 10,
            color: MD2Colors.indigo800,
          }}
        >
          {product?.name}
        </Text>
        {/* price */}
        <View>
          {!sale_price ? (
            <Text variant="titleMedium" style={{ color: $color1 }}>
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
              <Text variant="titleMedium" style={{ color: $color1 }}>
                {sale_price} Dh
              </Text>
            </>
          )}
        </View>
        <View
          style={
            type !== "c"
              ? {
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  width: "100%",
                }
              : {
                  position: "absolute",
                  top: 0,
                  right: "-30%",
                  width: "30%",
                }
          }
        >
          <AddToCart
            showDeleteIcon={type !== "c"}
            isCartPage
            product={product}
            navigation={navigation}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderColor: MD2Colors.indigo100,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5,
    width: "100%",
    height: 100,
    backgroundColor: "white",
  },
  cover: {
    width: 100,
    height: 70,
    padding: 10,
    marginRight: "3%",
    borderRightColor: MD2Colors.indigo100,
    borderRightWidth: 1,
  },
  body: {
    width: deviceWidth - 145,
    height: "100%",
    paddingLeft: 15,
  },
});
