import { View, StyleSheet, Pressable } from "react-native";
import { Badge, Icon, MD2Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { deviceWidth } from "../../utils/device";

import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomNavBar() {
  const [AppMenu, setAppMenu] = useState([]);
  const navigation = useNavigation() as any;

  const route = useRoute() as any;
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);

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
      _id: "MainMenuScreen",
      icon: "menu",
      action: () => navigation.navigate("MainMenuScreen"),
    },
  ];

  useEffect(() => {
    setAppMenu(Menu);
  }, []);

  return (
    <View style={styles.container}>
      {AppMenu?.map(({ icon, action, _id }, id) => {
        return (
          <Pressable key={id} onPress={action} style={{ padding: 10 }}>
            <Icon
              color={route?.name === _id ? MD2Colors.black : MD2Colors.grey400}
              key={id}
              source={icon}
              size={route?.name === _id ? 30 : 20}
            />
            {_id === "CartPage" && (
              <Badge style={styles.badge}>{cartCount}</Badge>
            )}
          </Pressable>
        );
      })}
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
    backgroundColor: MD2Colors.amber50,
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
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: MD2Colors.yellow600,
    color: MD2Colors.black,
  },
});
