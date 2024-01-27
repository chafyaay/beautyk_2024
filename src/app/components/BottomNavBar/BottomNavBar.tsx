import { View, StyleSheet, ImageBackground } from "react-native";
import {
  Badge,
  Divider,
  IconButton,
  MD2Colors,
  MD2DarkTheme,
  Menu,
  Modal,
  Portal,
} from "react-native-paper";
import { useSelector } from "react-redux";
import {
  $defaultColor,
  $defaultTextColor,
  $primaryColor,
  deviceHeight,
  deviceWidth,
} from "../../utils/device";
import { useState } from "react";
import React from "react";
import { ProfileScreen } from "../../pages/ProfileScreen/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Cart from "../Cart/Cart";

export default function BottomNavBar({ pageId, navigation }) {
  const [visible, setVisible] = React.useState(false);

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
        {!!cartCount && <Cart pageId={undefined} navigation={navigation} />}

        <IconButton
          onPress={() => {
            setVisible(true);
          }}
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
      <Portal>
        <Modal
          theme={MD2DarkTheme}
          onDismiss={() => setVisible(false)}
          dismissable
          dismissableBackButton
          visible={visible}
          style={{ backgroundColor: "rgba(0,0,0,.3)" }}
          contentContainerStyle={{
            padding: 10,
            paddingTop: 60,
            backgroundColor: "white",
            width: deviceWidth - 100,
            height: deviceHeight,
            marginTop: -10,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <ProfileScreen onHideModal={setVisible} navigation={navigation} />
          <ImageBackground
            style={{
              width: deviceWidth - 100,
              height: deviceWidth - 100,
              position: "absolute",
              left: -30,
              bottom: 0,

              opacity: 0.175,
            }}
            source={{
              uri: "https://orgaliving.com/wp-content/uploads/2024/01/zwaka.png",
            }}
          ></ImageBackground>
        </Modal>
      </Portal>
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
