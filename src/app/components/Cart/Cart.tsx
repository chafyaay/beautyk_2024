import { View, StyleSheet } from "react-native";
import { Badge, IconButton, MD2Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface CartProps {
  navigation?: any;
  iconColor?: string;
}
const Cart: React.FC<CartProps> = ({ iconColor }) => {
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);
  const navigation = useNavigation() as any;

  return (
    <View style={{ position: "relative", maxWidth: 50 }}>
      <IconButton
        onPress={() => navigation?.navigate("CartScreen")}
        icon="shopping-outline"
        iconColor={iconColor}
        size={25}
      />
      {!!cartCount && (
        <Badge
          style={{
            position: "absolute",
            backgroundColor: MD2Colors.yellowA700,
            top: 0,
            right: 5,
            color: MD2Colors.black,
          }}
        >
          {cartCount}
        </Badge>
      )}
    </View>
  );
};
export default Cart;
