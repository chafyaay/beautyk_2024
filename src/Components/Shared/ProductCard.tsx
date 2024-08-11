import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Card, MD2Colors } from "react-native-paper";
import { Typography } from "../../Theme/Typography";
import { ProductProps } from "../../utils/models";
import { InStockText, PriceText, SaleText } from "./Products";
import ProductPrice from "./ProductPrice";
import React from "react";
import AddToCart from "./AddToCart";

interface ProductCardProps {
  product: ProductProps;
  showAddTocart: boolean;
  showTitle: boolean;
  cardView: "GRID" | "LIST";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddTocart,
  showTitle,
  cardView,
}) => {
  const navigation = useNavigation() as any;
  const { name, price, regular_price, sale_price, stock_status, images } =
    product;

  /*   const _return = (
    <Pressable
      onPress={() => {
        navigation?.navigate("ProductDetailsScreen", { product });
      }}
      style={[
        styles.container,
        stock_status !== "instock" ? { opacity: 0.4 } : {},
      ]}
    >
      <SaleText regular_price={regular_price} sale_price={sale_price} />

      {cardView === "LIST" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            columnGap: 10,
          }}
        >
          <InStockText stock_status={stock_status} />
          <Avatar.Image source={{ uri: product?.images[0]?.src }} />
          <View style={{ flex: 1 }}>
            <Typography
              style={{
                textTransform: "capitalize",
                paddingTop: 15,
                lineHeight: 15,
              }}
            >
              {product.name}
            </Typography>
            <PriceText
              sale_price={sale_price}
              price={price}
              cardView={cardView}
              regular_price={regular_price}
            />
          </View>
          <View>
            <View
              style={{
                position: "absolute",
                bottom: -5,
                right: -10,
              }}
            >
              <AddToCart navigation={navigation} isHomePage product={product} />
            </View>
          </View>
        </View>
      )}

      {cardView === "GRID" && (
        <>
          <Card.Cover source={{ uri: product?.images[0]?.src }} />
          {showTitle && <Typography variant="body1">{name}</Typography>}

          <Card.Title
            title={
              <PriceText
                sale_price={sale_price}
                price={price}
                cardView={cardView}
                regular_price={regular_price}
              />
            }
            subtitle=""
            right={() => (
              <>
                {showAddTocart && (
                  <AddToCart
                    navigation={navigation}
                    isHomePage
                    product={product}
                  />
                )}
              </>
            )}
          ></Card.Title>
          <SaleText regular_price={regular_price} sale_price={sale_price} />
          <InStockText stock_status={stock_status} />
        </>
      )}
    </Pressable>
  );
 */
  return (
    <Card>
      <Card.Cover
        source={
          !!images[0].src
            ? { uri: images[0].src }
            : require("../../../assets/image-non-disponible.jpg")
        }
      />
      <Card.Content>
        <Typography nbrLines={2} variant="body1">
          {name}
        </Typography>
        <ProductPrice {...{ price, regular_price, sale_price }} />
        <AddToCart product={product} variant="single" />
      </Card.Content>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: MD2Colors.grey700,
    shadowOffset: { width: -0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 3,
    height: "auto",
    backgroundColor: MD2Colors.white,
  },
  cover: {},
  productName: {
    marginTop: 10,
  },
  instock: {
    textTransform: "uppercase",
    fontWeight: "900",
    fontSize: 9,
    position: "absolute",
    top: 10,
    zIndex: 9,
    left: 10,
    padding: 2,
    borderRadius: 3,
  },
  addToCart: { position: "absolute", bottom: 0, right: 0 },
  sale_percente: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "900",
    fontSize: 9,
  },
});
