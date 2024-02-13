import { useEffect, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Avatar, Card, Icon, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { GET_ORDERS } from "../../utils/api-calls";
import { Separator } from "../../components/commun/Separator";
import { TEXT_COLOR, deviceHeight, deviceWidth } from "../../utils/device";
import { TextHolder } from "../UI/TextHolder";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../UI/Typography";
import { PressableButton } from "../UI/Buttons";
import { PATHS } from "../../routing/Routing";

export const Welcome = ({ profile, customer }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Typography variant="bodyMedium" fontWeight="Medium">
          Bonjour
        </Typography>
        <Typography size={24} fontWeight="SemiBold">
          {customer?.first_name + " " + customer?.last_name}
        </Typography>
        <View style={{ position: "absolute", right: 0, top: 0 }}>
          {!profile?.avatar_url ? (
            <Avatar.Text
              size={35}
              label={
                String(profile?.first_name).slice(0, 1).toUpperCase() +
                String(profile?.last_name).slice(0, 1).toUpperCase()
              }
            />
          ) : (
            <Avatar.Image size={35} source={{ uri: profile?.avatar_url }} />
          )}
        </View>
      </View>
    </View>
  );
};

const path: PATHS = "MyOrdersListScreen";

export const ProfileMenu = ({ ordersCount, isLoggedIn }) => {
  const navigation = useNavigation() as any;

  const menu = [
    {
      icon: "basket-outline",
      label: `Mes Commandes (${ordersCount} )`,
      action: () => navigation.navigate("MyOrdersListScreen"),
    },
    {
      icon: "account-outline",
      label: "Mon compte ",
    },
    {
      icon: "heart-outline",
      label: "Votre liste d'envis",
    },
    {
      icon: "history",
      label: "Vu Récemment",
    },
    {
      icon: "home-outline",
      label: "Mes Adresse",
    },
    {
      icon: !!isLoggedIn ? "logout" : "login",
      label: !!isLoggedIn ? "Se déconnecter " : "Se conncter",
    },
  ];
  return (
    <View style={{ padding: 20, height: deviceHeight }}>
      {menu?.map(({ icon, label }, index) => (
        <PressableButton
          style={index === 5 ? { posistion: "absolute", bottom: 0 } : {}}
          fontWeight="Medium"
          icon={icon}
          onPress={() => {
            navigation.navigate("ProfileScreen", { id: index + 1 });
          }}
          children={label}
          type="menu"
          size={18}
        />
      ))}
    </View>
  );
};
