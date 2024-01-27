import { ImageBackground, Pressable, View } from "react-native";
import AddToCart from "../AddToCart";
import { Paragraph, Text } from "react-native-paper";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, TEXT_COLOR } from "../../utils/device";

const Price = ({ sale_price, regular_price, price }) => {
  return (
    <View style={{ position: "absolute", bottom: 10, left: 10 }}>
      {!!sale_price ? (
        <>
          <Text
            variant="titleLarge"
            style={{ fontWeight: "700", color: TEXT_COLOR.primary }}
          >
            {sale_price} Dh
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: TEXT_COLOR.primary,
              textDecorationLine: "line-through",
            }}
          >
            {regular_price} Dh
          </Text>
        </>
      ) : (
        <Text variant="titleMedium" style={{ color: TEXT_COLOR.primary }}>
          {price} Dh
        </Text>
      )}
    </View>
  );
};

export default function ProductCard({ product, navigation }) {
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
      onPress={() => {
        try {
          navigation?.navigate("ProductDetailsScreen", { product });
        } catch (error) {
          console.log(error);
        }
      }}
      style={{
        width: "49%",
        height: 260,
        backgroundColor: "white",
        borderRadius: 6,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: BG_LIGHT_COLOR.primary,
      }}
    >
      <Text
        style={{
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
          backgroundColor:
            stock_status === "instock"
              ? BG_DARK_COLOR.default
              : BG_DARK_COLOR.error,
        }}
        variant="labelSmall"
      >
        {stock_status === "instock" ? "En Stock" : "Epuisé"}
      </Text>

      <ImageBackground
        resizeMode="cover"
        style={{
          height: 150,
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 4,
        }}
        imageStyle={{ borderRadius: 2 }}
        source={{
          uri: images[0]?.src,
        }}
      />
      <View style={{ padding: 5 }}>
        <Paragraph
          style={{ fontSize: 12, lineHeight: 13, textTransform: "capitalize" }}
        >
          {name}{" "}
        </Paragraph>
      </View>

      {/* price */}
      <Price
        sale_price={sale_price}
        regular_price={regular_price}
        price={price}
      />
      {stock_status === "instock" && (
        <View style={{ position: "absolute", bottom: 0, right: 0 }}>
          <AddToCart navigation={navigation} isHomePage product={product} />
        </View>
      )}

      {/* on sale  */}
      {!!on_sale && (
        <Text
          style={{
            color: "white",
            textTransform: "uppercase",
            fontWeight: "900",
            fontSize: 9,
            position: "absolute",
            bottom: 10,
            zIndex: 9,
            right: 75,
            padding: 2,
            borderRadius: 3,
            backgroundColor: BG_DARK_COLOR.error,
          }}
        >
          {-Math.round(((regular_price - sale_price) * 100) / regular_price) +
            "%"}
        </Text>
      )}
    </Pressable>
  );
}
