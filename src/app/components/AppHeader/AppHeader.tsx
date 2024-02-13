import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";

import { BG_DARK_COLOR, TEXT_COLOR, deviceWidth } from "../../utils/device";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { SearchBarAutocomplet } from "../commun/Search/SearchBarAutocomplet";
import { useNavigation } from "@react-navigation/native";
import { IconButton, MD2Colors, Text } from "react-native-paper";
import Cart from "../Cart/Cart";
import { TextHolder } from "../UI/TextHolder";
import { Typography } from "../UI/Typography";
import { LinearGradient } from "expo-linear-gradient";

interface AppHeaderProps {
  title?: string;
  navigation?: any;
  search?: boolean;
  showCart?: boolean;
  showLogo?: boolean;
  goBack?: boolean;
}
const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  search,
  showCart,
  showLogo,
  goBack,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 0,
        margin: 0,
        height: 100,
      }}
    >
      <LinearGradient
        style={{
          position: "absolute",
          width: deviceWidth,
          zIndex: 9,
        }}
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
      />
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: !showCart && title ? "flex-start" : "space-between",
            columnGap: 5,
          }}
        >
          {!!goBack && (
            <IconButton
              iconColor={MD2Colors.black}
              onPress={() => navigation.goBack()}
              icon="chevron-left"
              size={25}
            />
          )}
          {!!title && (
            <Typography
              align="center"
              size={18}
              fontWeight="Medium"
              children={title}
              numberOfLines={2}
            />
          )}
          {!!showLogo && (
            <Image
              style={{ width: 80, height: 50, marginLeft: 10 }}
              resizeMode="contain"
              source={{
                uri: "https://orgaliving.com/wp-content/uploads/2024/01/beautyk-logo.png",
              }}
            />
          )}
          {!!search && (
            <View style={{ flex: 1 }}>
              <SearchBarAutocomplet />
            </View>
          )}
          {!!showCart && <Cart iconColor={MD2Colors.black} />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AppHeader;

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
    color: TEXT_COLOR.primary,
    width: "100%",
    textAlign: "center",
  },
});
