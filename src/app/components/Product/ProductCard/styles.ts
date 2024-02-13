import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  cover: {
    height: 150,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 4,
    overflow: "hidden",
    borderRadius: 10,
  },
  name: {
    fontFamily: "Raleway_400Regular",
    lineHeight: 0,
    marginTop: 10,
    letterSpacing: 1,
    height: 50,
  },
  instock: {
    textTransform: "uppercase",
    fontWeight: "900",
    fontSize: 9,
    position: "absolute",
    top: 10,
    zIndex: 9,
    left: 10,
    padding: 2,
    borderRadius: 3,
  },
  addToCart: { position: "absolute", bottom: 0, right: 0 },
  sale_percente: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "900",
    fontSize: 9,
  },
});
