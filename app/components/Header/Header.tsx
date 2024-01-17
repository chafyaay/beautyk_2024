import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Icon, MD3Colors } from "react-native-paper";
import { useEffect } from "react";
import { getCart } from "../../utils/store/cart.actions";
import { deviceWidth } from "../../utils/device";

export default function Header(props: any) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 3,
    top: deviceWidth - 160,
    width: deviceWidth - 20,
    height: 60,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "red",
    left: 10,
    padding: 20,
  },
  btn: {
    width: 50,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
