import { Pressable, StyleSheet, View } from "react-native";
import AddToCart from "../../AddToCart";
import { Avatar, Card, MD2Colors, Text } from "react-native-paper";
import { BG_DARK_COLOR, TEXT_COLOR } from "../../../utils/device";
import { ProductProps } from "../../../utils/models";
import { Typography } from "../../UI/Typography";
import { InStockText, PriceText, SaleText } from "./helpers";
import { useNavigation } from "@react-navigation/native";

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
  const { name, price, regular_price, sale_price, stock_status } = product;

  return (
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
              numberOfLines={2}
              size={13}
              fontWeight="Medium"
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
          {showTitle && (
            <Typography
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 15,
                lineHeight: 15,
                textTransform: "capitalize",
              }}
              fontWeight="SemiBold"
              size={15}
              numberOfLines={2}
            >
              {name}
            </Typography>
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
    </Pressable>
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
