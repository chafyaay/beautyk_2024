import { View, StyleSheet } from "react-native";
import { Badge, IconButton, MD2Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  $defaultColor,
  $defaultTextColor,
  $primaryColor,
  deviceWidth,
} from "../../utils/device";
import { useEffect } from "react";

export default function BottomNavBar({ pageId, navigation }) {
  const { cart } = useSelector((state) => state) as any;
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <IconButton
          onPress={() => {
            navigation?.navigate("HomeScreen");
          }}
          icon="home-variant-outline"
          iconColor={
            pageId === "HomeScreen" ? $defaultTextColor : $primaryColor
          }
          size={25}
          style={{ marginLeft: 30 }}
        />
        <View style={{ position: "relative", maxWidth: 50 }}>
          <IconButton
            onPress={() => navigation?.navigate("CartScreen")}
            icon="shopping-outline"
            iconColor={
              pageId === "CartScreen" ? $defaultTextColor : $primaryColor
            }
            size={25}
          />
          {!!cartCount ? (
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
          ) : (
            <></>
          )}
        </View>

        <IconButton
          onPress={() => {}}
          icon="account-outline"
          iconColor={$primaryColor}
          size={25}
        />

        <IconButton
          onPress={() => {}}
          icon="menu"
          iconColor={$primaryColor}
          size={25}
          style={{ marginRight: 30 }}
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
    width: deviceWidth - 20,
    backgroundColor: MD2Colors.indigo100,
    borderRadius: 50,
  },
});
