import { Pressable, StyleSheet, View } from "react-native";
import AddToCart from "../../AddToCart";
import { Avatar, Card, Text } from "react-native-paper";
import { BG_DARK_COLOR, TEXT_COLOR } from "../../../utils/device";
import { ProductProps } from "../../../utils/models";
import { Typography } from "../../UI/Typography";
import { InStockText, PriceText, SaleText } from "./helpers";

interface ProductCardProps {
  product: ProductProps;
  showAddTocart: boolean;
  showTitle: boolean;
  navigation?: any;
  cardView: "GRID" | "LIST";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  navigation,
  showAddTocart,
  showTitle,
  cardView,
}) => {
  const { name, price, regular_price, sale_price, stock_status } = product;

  return (
    <Pressable
      onPress={() => {
        navigation?.navigate("ProductDetailsScreen", { product });
      }}
      style={styles.container}
    >
      <Card>
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
              <Typography numberOfLines={2} size={13} fontWeight="Medium">
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
                <AddToCart
                  navigation={navigation}
                  isHomePage
                  product={product}
                />
              </View>
            </View>
          </View>
        )}

        {cardView === "GRID" && (
          <>
            <Card.Cover source={{ uri: product?.images[0]?.src }} />
            {showTitle && (
              <Card.Content>
                <Typography
                  variant="bodyMedium"
                  fontWeight="Medium"
                  size={13}
                  style={styles.name}
                  numberOfLines={3}
                >
                  {name}
                </Typography>
              </Card.Content>
            )}

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
      </Card>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {},
  cover: {
    height: 150,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 4,
    overflow: "hidden",
    borderRadius: 10,
  },
  name: {
    lineHeight: 0,
    marginTop: 10,
    letterSpacing: 1,
    height: 50,
  },
  instock: {
    color: TEXT_COLOR.title,
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
    backgroundColor: BG_DARK_COLOR.error,
  },
});
