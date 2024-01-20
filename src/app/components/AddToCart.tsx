import { StyleSheet, View } from "react-native";
import {
  Badge,
  Button,
  Dialog,
  IconButton,
  MD2Colors,
  MD2DarkTheme,
  MD3Colors,
  Portal,
  Text,
} from "react-native-paper";
import {
  onClearCart,
  updateCartItem,
} from "../utils/store/actions/cart.actions";
import { connect } from "react-redux";
import {
  $color1,
  $color2,
  $defaultColor,
  $primaryColor,
  deviceWidth,
} from "../utils/device";
import React, { useEffect, useState } from "react";
import { ProductProps } from "../utils/models";
import Toast from "react-native-toast-message";
import { PrimaryButton } from "./UI/Buttons";

interface AddToCartProps {
  navigation: any;
  route?: any;
  product?: ProductProps;
  cart?: any;
  updateCartItem?: (props) => void;
  onClearCart?: () => void;
  isProductPage?: boolean;
  isHomePage?: boolean;
  isCartPage?: boolean;
  isFinalPage?: boolean;
  showDeleteIcon?: boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({
  product: product,
  cart: cart,
  updateCartItem: updateCartItem,
  onClearCart: onClearCart,
  isCartPage: isCartPage,
  isHomePage: isHomePage,
  isFinalPage: isFinalPage,
  isProductPage: isProductPage,
  showDeleteIcon,
  navigation,
  route,
}) => {
  const [cartCount, setCartCount] = useState(1);
  const [showDialog, setShowDialog] = useState(false);

  const item = cart?.items?.find((it) => it.product?.id === product?.id);

  const handleAddToCart = (a: number) => {
    const prevQuantity = item ? item.quantity : 0;
    updateCartItem({
      product,
      quantity: prevQuantity + a,
    });
    Toast?.show({
      position: "bottom",
      type: isCartPage ? "success" : "updatedcart",
      text1: "Votre produit a été ajouté au panier",
      text2: "Voulez-vous  Continuer vos achats ?",
      props: {
        home: () => {
          navigation?.navigate("CartScreen");
        },
        cart: () => {
          navigation?.navigate("HomeScreen");
        },
      },
    });
  };

  /*   x: () => {
    //return navigation?.navigate("CartScreen");
  },
  y: () => {
   // return navigation?.navigate("Home");
  }, */

  useEffect(() => {
    setCartCount(item?.quantity || 1);
  }, []);

  useEffect(() => {
    setCartCount(1);
    // setShowDialog(true);
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

          <PrimaryButton
            title="Ajouter au Panier"
            onEventHandler={() => {
              handleAddToCart(cartCount);
            }}
          />
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
    } else if (isFinalPage) {
      return (
        <PrimaryButton
          title={"Continuer vos achats"}
          onEventHandler={() => {
            navigation.navigate("HomeScreen");
            onClearCart();
          }}
        />
      );
    } else
      return (
        <PrimaryButton
          title="Ajouter au Panier"
          onEventHandler={() => {
            handleAddToCart(1);
          }}
        />
      );
  };
  return (
    <View>
      <RenderAddToCart />
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { updateCartItem, onClearCart })(
  AddToCart
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  addTocartFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
  },
});
