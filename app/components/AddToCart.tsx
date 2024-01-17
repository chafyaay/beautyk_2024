import { StyleSheet, View } from "react-native";
import {
  Badge,
  Button,
  IconButton,
  MD2DarkTheme,
  MD3Colors,
  Text,
} from "react-native-paper";
import { updateCartItem } from "../utils/store/cart.actions";
import { connect } from "react-redux";
import { $color1, $color2, deviceWidth } from "../utils/device";
import React, { useEffect, useState } from "react";
import { ProductProps } from "../utils/models";

interface AddToCartProps {
  product: ProductProps;
  cart: any;
  updateCartItem: (props) => void;
  isProductPage?: boolean;
  isHomePage?: boolean;
  isCartPage?: boolean;
  showDeleteIcon?: boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({
  product: product,
  cart: cart,
  updateCartItem: updateCartItem,
  isCartPage: isCartPage,
  isHomePage: isHomePage,
  isProductPage: isProductPage,
  showDeleteIcon,
}) => {
  const [cartCount, setCartCount] = useState(1);
  const item = cart.items.find((it) => it.product?.id === product?.id);

  const handleAddToCart = (a: number) => {
    const prevQuantity = item ? item.quantity : 0;
    updateCartItem({
      product,
      quantity: prevQuantity + a,
    });
  };

  useEffect(() => {
    setCartCount(item?.quantity || 1);
  }, []);

  useEffect(() => {
    setCartCount(1);
  }, [item?.quantity]);

  const RenderAddToCart = () => {
    if (isHomePage) {
      return (
        <View>
          <IconButton
            mode="outlined"
            size={17}
            icon="cart-plus"
            onPress={() => handleAddToCart(1)}
          />
          {item?.quantity && (
            <Badge
              style={{
                position: "absolute",
                right: 5,
                backgroundColor: $color1,
              }}
            >
              {item?.quantity}
            </Badge>
          )}
        </View>
      );
    } else if (isProductPage) {
      return (
        <View style={styles.container}>
          <View style={styles.addTocartFlex}>
            <IconButton
              size={17}
              mode="outlined"
              onPress={() =>
                setCartCount((e) => {
                  if (e > 1) return e - 1;
                  else return 1;
                })
              }
              icon={"minus"}
            ></IconButton>
            <Text variant="bodyMedium">{cartCount}</Text>
            <IconButton
              size={17}
              mode="outlined"
              onPress={() => setCartCount((e) => e + 1)}
              icon={"plus"}
            ></IconButton>
          </View>
          <Button mode="contained" onPress={() => handleAddToCart(cartCount)}>
            Ajouter au panier
          </Button>
        </View>
      );
    } else if (isCartPage) {
      return (
        <View style={styles.addTocartFlex}>
          <View style={styles.addTocartFlex}>
            <IconButton
              size={10}
              icon="minus"
              onPress={() => handleAddToCart(-1)}
              iconColor={$color1}
              mode="outlined"
            />
            <Text style={{ fontSize: 10 }} variant="bodyMedium">
              {item?.quantity}
            </Text>
            <IconButton
              iconColor={$color1}
              size={10}
              icon="plus"
              onPress={() => handleAddToCart(1)}
              mode="outlined"
            />
          </View>
          {!!showDeleteIcon && (
            <IconButton
              iconColor={$color1}
              size={10}
              icon="delete"
              onPress={() => handleAddToCart(-item?.quantity)}
              mode="outlined"
            />
          )}
        </View>
      );
    } else <Button>Ajouter au Panier</Button>;
  };
  return <RenderAddToCart />;
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { updateCartItem })(AddToCart);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: deviceWidth,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderTopWidth: 1,
    borderTopColor: $color2,
    padding: 10,
  },
  addTocartFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
  },
});
