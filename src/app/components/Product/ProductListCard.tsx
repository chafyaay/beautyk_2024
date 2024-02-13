import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import AddToCart from "../AddToCart";
import { Card, MD2Colors, Text } from "react-native-paper";
import { ProductProps } from "../../utils/models";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";
import { Typography } from "../UI/Typography";
import DataIndex from "../../utils/DataIndex";

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

  const _return = (
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
          resizeMode="cover"
          imageStyle={{ width: "100%" }}
          style={styles.cover}
        />
      )}

      <View
        style={type !== "c" ? styles.body : { width: "75%", paddingLeft: 10 }}
      >
        <Typography
          fontWeight="Regular"
          numberOfLines={2}
          children={product?.name}
        />

        <View style={{ marginTop: 5 }}>
          {!sale_price ? (
            <Typography>{price} Dh</Typography>
          ) : (
            <>
              <Typography>{regular_price} Dh</Typography>
              <Typography>{sale_price} Dh</Typography>
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

  return (
    <View style={styles.container}>
      <Card.Cover
        style={{ height: 60, width: 60, backgroundColor: "yellow" }}
        source={{
          uri: product?.images[0]?.src,
        }}
      />
      <Typography
        fontWeight="Regular"
        numberOfLines={1}
        children={product?.name}
        style={{ flex: 1 }}
      />
      <View
        style={{ marginTop: 5, position: "absolute", left: 80, bottom: 10 }}
      >
        {!sale_price ? (
          <Typography type="default" size={14} fontWeight="Regular">
            {price + " " + DataIndex.currency}
          </Typography>
        ) : (
          <View style={{ flexDirection: "row", columnGap: 10 }}>
            <Typography type="default" fontWeight="Bold">
              {sale_price + " " + DataIndex.currency}
            </Typography>
            <Typography
              color={MD2Colors.grey500}
              style={{ textDecorationLine: "line-through" }}
              fontWeight="Bold"
            >
              {regular_price + " " + DataIndex.currency}
            </Typography>
          </View>
        )}
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
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
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
