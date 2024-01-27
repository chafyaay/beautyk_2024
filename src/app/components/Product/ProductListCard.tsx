import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import AddToCart from "../AddToCart";
import { MD2Colors, Text } from "react-native-paper";
import { ProductProps } from "../../utils/models";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";

interface ProductCardProps {
  product: ProductProps;
  type?: "a" | "b" | "c";
  navigation: any;
}

export const ProductListCard: React.FC<ProductCardProps> = ({
  navigation,
  product,
  type,
}) => {
  const { price, regular_price, sale_price } = product;

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
          numberOfLines={2}
          style={{
            paddingRight: 30,
            marginTop: 10,
            color: MD2Colors.indigo800,
          }}
        >
          {product?.name}
        </Text>

        <View>
          {!sale_price ? (
            <Text variant="titleMedium" style={{ color: TEXT_COLOR.body }}>
              {price} Dh
            </Text>
          ) : (
            <>
              <Text
                variant="bodySmall"
                style={{
                  color: TEXT_COLOR.body,
                  textDecorationLine: "line-through",
                }}
              >
                {regular_price} Dh
              </Text>
              <Text variant="titleMedium" style={{ color: TEXT_COLOR.body }}>
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
    borderColor: TEXT_COLOR.body,
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
    borderRightColor: TEXT_COLOR.body,
    borderRightWidth: 1,
  },
  body: {
    width: deviceWidth - 145,
    height: "100%",
    paddingLeft: 15,
  },
});
