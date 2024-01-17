import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Badge,
  Icon,
  IconButton,
  MD2Colors,
  MD3Colors,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { useEffect, useState } from "react";
import { getCart } from "../../utils/store/cart.actions";
import { connect, useSelector } from "react-redux";
import { $color2, deviceHeight, deviceWidth } from "../../utils/device";

export default function BottomNavBar({ currentPageName, navigation }) {
  const { cart } = useSelector((state) => state) as any;

  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <IconButton
          onPress={() => {
            navigation?.navigate("home");
          }}
          icon="home"
          theme={MD3LightTheme}
          size={20}
        />
        <View style={{ position: "relative", maxWidth: 50 }}>
          <IconButton
            onPress={() => navigation?.navigate("cart")}
            icon="cart"
            theme={MD3LightTheme}
            size={20}
          />
          {!!cartCount ? (
            <Badge
              style={{
                position: "absolute",
                backgroundColor: MD2Colors.red800,
              }}
            >
              {cartCount}
            </Badge>
          ) : (
            <></>
          )}
        </View>

        <IconButton
          theme={MD3LightTheme}
          onPress={() => {}}
          icon="account"
          size={20}
        />

        <IconButton
          onPress={() => {}}
          icon="menu"
          theme={MD3LightTheme}
          size={20}
        />
      </View>
    </View>
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
    width: deviceWidth - 40,
    backgroundColor: MD2Colors.indigo100,
    borderRadius: 5,
  },
});
