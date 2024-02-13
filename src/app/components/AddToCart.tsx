import { StyleSheet, View } from "react-native";
import { Button, IconButton, MD2Colors, Text } from "react-native-paper";
import {
  onClearCart,
  updateCartItem,
} from "../utils/store/actions/cart.actions";
import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import { ProductProps } from "../utils/models";
import Toast from "react-native-toast-message";
import { PressableButton } from "./UI/Buttons";
import { BG_COLOR, TEXT_COLOR } from "../utils/device";
import { Typography } from "./UI/Typography";

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

  const item = cart?.items?.find((it) => it.product?.id === product?.id);

  const handleAddToCart = (a: number) => {
    const prevQuantity = item ? item.quantity : 0;
    updateCartItem({
      product,
      quantity: prevQuantity + a,
    });
    Toast.show({
      type: isCartPage ? "success" : "updatedcart",
      props: !isCartPage
        ? {
            cart: () => {
              navigation?.navigate("CartScreen");
            },
          }
        : { msg: "Votre produit a été ajouté au panier" },
      text1: "Votre produit a été ajouté au panier",
      text2: "Voulez-vous  Continuer vos achats ?",
    });
    /*  Toast?.show({
      position: "bottom",
      type: isCartPage ? "success" : "updatedcart",
      text1: "Votre produit a été ajouté au panier",
      text2: "Voulez-vous  Continuer vos achats ?",
      props: {
        msg: "Votre produit a été ajouté au panier",
        home: () => {
          navigation?.navigate("CartScreen");
        },
        cart: () => {
          navigation?.navigate("HomeScreen");
        },
      },
    }); */
  };

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
        <IconButton
          mode="outlined"
          size={15}
          hitSlop={12}
          icon="plus"
          onPress={() => handleAddToCart(1)}
          iconColor="white"
          containerColor="black"
        />
      );
    } else if (isProductPage) {
      return (
        <View style={styles.container}>
          <View style={styles.addTocartFlex}>
            <IconButton
              size={17}
              mode="outlined"
              iconColor={MD2Colors.white}
              containerColor={MD2Colors.black}
              onPress={() =>
                setCartCount((e) => {
                  if (e > 1) return e - 1;
                  else return 1;
                })
              }
              icon={"minus"}
            ></IconButton>
            <Typography fontWeight="Bold" children={cartCount} />
            <IconButton
              size={17}
              iconColor={MD2Colors.white}
              containerColor={MD2Colors.black}
              mode="outlined"
              onPress={() => setCartCount((e) => e + 1)}
              icon={"plus"}
            ></IconButton>
          </View>

          <PressableButton
            fontWeight="Bold"
            onPress={() => {
              handleAddToCart(cartCount);
            }}
            type="default"
          >
            Ajouter au Panier
          </PressableButton>
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
              mode="outlined"
            />
            <Typography fontWeight="SemiBold">{item?.quantity}</Typography>
            <IconButton
              size={10}
              icon="plus"
              onPress={() => handleAddToCart(1)}
              mode="outlined"
            />
          </View>
          {!!showDeleteIcon && (
            <IconButton
              size={10}
              icon="delete"
              onPress={() => handleAddToCart(-item?.quantity)}
              mode="contained"
              containerColor={MD2Colors.yellow700}
              iconColor={MD2Colors.black}
            />
          )}
        </View>
      );
    } else if (isFinalPage) {
      return (
        <PressableButton
          fontWeight="Bold"
          type="default"
          onPress={() => {
            navigation.navigate("HomeScreen");
            onClearCart();
          }}
          children="Continuer vos achats"
        />
      );
    } else
      return (
        <PressableButton
          children="Ajouter au Panier"
          type="primary"
          onPress={() => {
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
    columnGap: 30,
  },
  addTocartFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
  },
});
