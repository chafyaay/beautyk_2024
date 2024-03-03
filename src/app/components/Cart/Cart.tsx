import { View, StyleSheet, Pressable } from "react-native";
import { Badge, Icon, IconButton, MD2Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface CartProps {
  visible?: boolean;
}
const Cart: React.FC<CartProps> = ({ visible }) => {
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);
  const navigation = useNavigation() as any;
  if (visible)
    return (
      <Pressable onPress={() => navigation?.navigate("CartScreen")}>
        {!!cartCount && (
          <Badge
            style={{
              position: "absolute",
              backgroundColor: MD2Colors.yellowA700,
              top: -9,
              right: -9,
              color: MD2Colors.black,
              zIndex: 8,
            }}
          >
            {cartCount}
          </Badge>
        )}
        <Icon source="shopping-outline" size={24} />
      </Pressable>
    );
};
export default Cart;
{
  /* <Pressable
        onPress={() => navigation?.navigate("CartScreen")}
        style={{ backgroundColor: "red" }}
      >
        <Icon source="shopping-outline" size={25} />
        {!!cartCount && (
          <Badge
            style={{
              position: "absolute",
              backgroundColor: MD2Colors.yellowA700,
              top: -8,
              right: -8,
              color: MD2Colors.black,
            }}
          >
            {cartCount}
          </Badge>
        )}
      </Pressable> */
}
