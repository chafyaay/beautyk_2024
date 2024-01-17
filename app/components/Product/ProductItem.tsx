import { useEffect } from "react";
import { Image, ImageBackground, Pressable, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateCartItem } from "../../utils/store/cart.actions";
import { connect } from "react-redux";
import useAddToCart from "../AddToCart";
import AddToCart from "../AddToCart";
import { $color1, $color2, deviceWidth } from "../../utils/device";
import { Badge, MD2Colors, Paragraph, Text } from "react-native-paper";

const viewColIcon = (
  <MaterialCommunityIcons name="cart-plus" size={30} color="#900" />
);

export default function ProductItem({ product, onNavigate }) {
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
      onPress={onNavigate}
      style={{
        width: "49%",
        height: 260,
        backgroundColor: "white",
        borderRadius: 4,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: MD2Colors.indigo200,
      }}
    >
      <ImageBackground
        resizeMode="contain"
        style={{
          height: 150,
          width: "100%",
          backgroundColor: "#F7F7F7",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
        source={{
          uri: images[0]?.src,
        }}
      />
      <View style={{ padding: 5 }}>
        <Paragraph
          style={{ fontSize: 12, lineHeight: 13, textTransform: "capitalize" }}
        >
          {name}{" "}
          <>
            {stock_status === "instock" ? (
              <Text style={{ color: MD2Colors.green400 }} variant="bodySmall">
                En Stock
              </Text>
            ) : (
              <Text style={{ color: "red" }} variant="bodySmall">
                Epuisé
              </Text>
            )}
          </>
        </Paragraph>
      </View>

      {/* price */}
      <View style={{ position: "absolute", bottom: 10, left: 10 }}>
        {!sale_price ? (
          <Text variant="titleMedium" style={{ color: $color1 }}>
            {price} Dh
          </Text>
        ) : (
          <>
            <Text
              variant="bodySmall"
              style={{ color: $color2, textDecorationLine: "line-through" }}
            >
              {regular_price} Dh
            </Text>
            <Text variant="titleMedium" style={{ color: $color1 }}>
              {sale_price} Dh
            </Text>
          </>
        )}
      </View>
      {stock_status === "instock" && (
        <View style={{ position: "absolute", bottom: 0, right: 0 }}>
          <AddToCart isHomePage product={product} />
        </View>
      )}

      {/* on sale  */}
      {!!on_sale ? (
        <Badge
          theme={{ colors: { secondary: "green" } }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "red",
          }}
          children={
            -Math.round(((regular_price - sale_price) * 100) / regular_price) +
            "%"
          }
        ></Badge>
      ) : (
        ""
      )}
    </Pressable>

    /*   
    
     <Badge
          theme={{ colors: { primary: "green" } }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          {-Math.round(((regular_price - sale_price) * 100) / regular_price)}%
        </Badge>
        
        <Pressable onPress={onNavigate} style={{}}>
      <ImageBackground
        resizeMode="contain"
        style={{ height: 100, width: 100, borderRadius: 5 }}
        source={{
          uri: images[0]?.src,
        }}
      />
      <Text>{name}</Text>
      <Text>Vendu par: {"brand"}</Text>
      {!!sale_price ? (
        <>
          <Text style={{ color: "green", textDecorationLine: "line-through" }}>
            {regular_price}
          </Text>
          <Text style={{ color: "gold" }}>{sale_price}</Text>
        </>
      ) : (
        <Text style={{ color: "red" }}>{price}</Text>
      )}
      {<AddToCart isIcon={true} product={product} />}
    </Pressable> */
  );
}
