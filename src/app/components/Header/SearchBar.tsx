import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { deviceWidth } from "../../utils/device";

export default function SearchBar(props: any) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn}>
        <MaterialCommunityIcons name="home-variant" size={25} color="#900" />
      </Pressable>
      <Pressable style={styles.btn}>
        <MaterialCommunityIcons name="cart" size={25} color="#900" />
      </Pressable>
      <Pressable style={styles.btn}>
        <MaterialCommunityIcons name="account" size={25} color="#900" />
      </Pressable>
      <Pressable style={styles.btn}>
        <MaterialCommunityIcons name="menu" size={25} color="#900" />
      </Pressable>
    </View>
  );
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
