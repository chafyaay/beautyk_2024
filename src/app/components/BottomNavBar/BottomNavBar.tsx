import { View, StyleSheet, ImageBackground, Modal } from "react-native";
import {
  IconButton,
  MD2Colors,
  MD2DarkTheme,
  Portal,
  Text,
} from "react-native-paper";
import { useSelector } from "react-redux";
import {
  BG_COLOR,
  TEXT_COLOR,
  deviceHeight,
  deviceWidth,
} from "../../utils/device";

import React, { useEffect, useState } from "react";
import { ProfileScreen } from "../../pages/ProfileScreen/ProfileScreen";
import Cart from "../Cart/Cart";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomNavBar() {
  const [AppMenu, setAppMenu] = useState([]);
  const [path, setPath] = useState("");
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  const { params } = useRoute() as any;

  console.log(route);

  const Menu = [
    {
      _id: "HomeScreen",
      icon: "home-variant-outline",
      action: () => navigation.navigate("HomeScreen"),
    },
    {
      _id: "CartScreen",
      icon: "shopping-outline",
      action: () => navigation.navigate("CartScreen"),
    },
    {
      _id: "ProfileScreen",
      icon: "account-outline",
      action: () => navigation.navigate("ProfileScreen"),
    },
    {
      _id: "MenuScreen",
      icon: "menu",
      action: () => navigation.navigate("MenuScreen"),
    },
  ];

  useEffect(() => {
    setAppMenu(Menu);
  }, []);

  return (
    <View style={styles.container}>
      {AppMenu?.map(({ icon, action, _id }, id) => (
        <IconButton
          iconColor={route?.name === _id ? "red" : "green"}
          key={id}
          icon={icon}
          onPress={action}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    zIndex: 7,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: deviceWidth - 20,
    backgroundColor: MD2Colors.amber100,
    borderRadius: 5,
    left: 10,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    width: deviceWidth - 20,
    backgroundColor: MD2Colors.black,
    opacity: 0.79,
    borderRadius: 50,
  },
});
