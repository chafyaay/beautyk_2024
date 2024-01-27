import { View, StyleSheet } from "react-native";
import { Badge, IconButton, MD2Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { TEXT_COLOR, deviceWidth } from "../../utils/device";
import React from "react";

export default function Cart({ pageId, navigation }) {
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);

  return (
    <>
      {!!cartCount && (
        <View style={{ position: "relative", maxWidth: 50 }}>
          <IconButton
            onPress={() => navigation?.navigate("CartScreen")}
            icon="shopping-outline"
            iconColor={
              pageId === "CartScreen" ? TEXT_COLOR.default : TEXT_COLOR.primary
            }
            size={25}
          />
          <Badge
            style={{
              position: "absolute",
              backgroundColor: MD2Colors.red800,
              top: 0,
              right: 5,
            }}
          >
            {cartCount}
          </Badge>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    zIndex: 7,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: deviceWidth,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    height: 60,
    width: deviceWidth - 20,
    backgroundColor: MD2Colors.indigo100,
    borderRadius: 50,
  },
});
