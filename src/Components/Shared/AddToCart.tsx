import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, MD2Colors } from "react-native-paper";
import Toast from "react-native-toast-message";
import { connect, useSelector } from "react-redux";
import { PressableButton } from "../../Theme/PressableButton";
import { Typography } from "../../Theme/Typography";
import { ProductProps } from "../../utils/models";
import { onClearCart, updateCartItem } from "../../utils/store/actions/actions";
import { useNavigation } from "@react-navigation/native";
import { cartSelector } from "../../utils/store/selectors";
import { ROURES } from "../../Pages/Routes";

interface AddToCartProps {
  product: ProductProps;
  variant?: "single" | "text" | "line";
  updateCartItem?: (props) => void;
  onClearCart?: () => void;
}

/* const ___AddToCart: React.FC<AddToCartProps> = ({
  product: product,
  cart: cart,
  updateCartItem: updateCartItem,
  onClearCart: onClearCart,
  isCartPage: isCartPage,
  isHomePage: isHomePage,
  isFinalPage: isFinalPage,
  isProductPage: isProductPage,
  showDeleteIcon,
}) => {
  const [cartCount, setCartCount] = useState(1);
  const navigation = useNavigation();

  const item = cart?.items?.find((it) => it.product?.id === product?.id);

  const handleAddToCart = (a: number) => {
    if (product.stock_status === "instock") {
      const prevQuantity = item ? item.quantity : 0;
      updateCartItem({
        product,
        quantity: prevQuantity + a,
      });
      Toast.show({
        type: isCartPage ? "success" : "updatedcart",
        position: isCartPage ? "top" : "bottom",
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
    }
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
            <Typography children={cartCount} />
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
            onPress={() => {
              handleAddToCart(cartCount);
            }}
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
            <Typography>{item?.quantity}</Typography>
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
              onPress={() => {
                handleAddToCart(-item?.quantity);
              }}
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
}; */

const AddToCart: React.FC<AddToCartProps> = ({
  product,
  updateCartItem,
  onClearCart,
  variant,
}) => {
  const cart = useSelector(cartSelector);
  const navigation = useNavigation() as any;

  const addToCartHandler = (
    qnte: number,
    action: "ADD" | "REMOVE" | "UPDATE"
  ) => {
    const item = cart?.items?.find((it) => it.product?.id === product?.id);

    if (product.stock_status === "instock") {
      const prevQuantity = item ? item.quantity : 0;
      updateCartItem({ product, quantity: prevQuantity + qnte });
      Toast.show({
        type: action === "ADD" ? "updatedcart" : "success",
        props: {
          msg: "Votre produit a été ajouté au panier",
          action: () => navigation?.navigate(ROURES.CartSummaryScreen),
        },
        text1: "Votre produit a été ajouté au panier",
        text2: "Voulez-vous  Continuer vos achats ?",
      });
    }
  };

  if (variant === "single")
    return (
      <PressableButton
        onPress={() => addToCartHandler(1, "ADD")}
        variant="single-icon"
        icon="plus"
      />
    );
  return <PressableButton>h</PressableButton>;
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
