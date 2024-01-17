import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={[styles.container, styles.row]}>
      <Text>Logo</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 130,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#cc88C1",
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  input: {
    width: 200,
    height: 50,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#CCC",
  },
});
