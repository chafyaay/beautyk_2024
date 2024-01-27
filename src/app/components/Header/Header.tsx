import { View, StyleSheet, Pressable } from "react-native";
import {
  Text,
  IconButton,
  MD2Colors,
  MD3Colors,
  Badge,
  Searchbar,
  TextInput,
  Divider,
  MD2LightTheme,
} from "react-native-paper";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, TEXT_COLOR } from "../../utils/device";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

interface HeaderProps {
  title?: string;
  navigation?: any;
  search?: boolean;
  showCart?: boolean;
}
export default function Header({ title, search, navigation, showCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View style={{ height: 100, backgroundColor: BG_DARK_COLOR.default }}>
      <SafeAreaView>
        <View
          style={[
            styles.container,
            { justifyContent: !showCart ? "flex-start" : "space-between" },
          ]}
        >
          <IconButton
            size={25}
            iconColor="white"
            icon="arrow-left"
            style={{ position: "relative", zIndex: 2 }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          {!!title && (
            <Text
              style={{
                color: MD2Colors.indigo400,
              }}
              variant="titleMedium"
            >
              {title}
            </Text>
          )}

          {!!search && (
            <TextInput
              style={{
                height: 40,
                flex: 1,
                backgroundColor: BG_LIGHT_COLOR.default,
                borderColor: "white",
                shadowColor: "white",
              }}
              outlineColor="white"
              outlineStyle={{ borderColor: "white" }}
              textColor={TEXT_COLOR.primary}
              theme={MD2LightTheme}
              mode="outlined"
              placeholder="eachercher un produit"
            />
          )}

          {!!showCart && <Cart pageId="" navigation={navigation} />}
        </View>
        <Divider />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    overflow: "visible",
    paddingRight: 10,
  },
  title: {
    textTransform: "capitalize",
    color: MD2Colors.indigo500,
    width: "100%",
    textAlign: "center",
  },
});
