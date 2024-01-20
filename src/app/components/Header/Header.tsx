import { View, StyleSheet, Pressable } from "react-native";
import {
  Text,
  IconButton,
  MD2Colors,
  MD3Colors,
  Badge,
} from "react-native-paper";
import { useSelector } from "react-redux";

export default function Header({ title, navigation }) {
  const { cart } = useSelector((state) => state) as any;

  const cartCount = cart?.items?.reduce((a, b) => (a += b?.quantity), 0);
  return (
    <View>
      <View style={styles.container}>
        <IconButton
          size={25}
          icon="arrow-left"
          style={{ position: "relative", zIndex: 2 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {title && (
          <Text style={{ color: MD2Colors.indigo400 }} variant="titleMedium">
            {title}
          </Text>
        )}
        <Pressable>
          <Badge
            style={{
              position: "absolute",
              backgroundColor: MD2Colors.red600,
              left: "50%",
            }}
            children={cartCount}
          />
          <IconButton
            size={25}
            icon="shopping-outline"
            style={{ position: "relative", zIndex: 2 }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    overflow: "visible",
  },
  title: {
    textTransform: "capitalize",
    color: MD2Colors.indigo500,
    width: "100%",
    textAlign: "center",
  },
});
