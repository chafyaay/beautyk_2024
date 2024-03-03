import { ImageBackground, StyleSheet, View } from "react-native";

import { ProfileMenu } from "../../components/MyProfile/ProfileMenu";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Separator } from "../../components/commun/Separator";
import { GET_ORDERS } from "../../utils/api-calls";
import { deviceWidth } from "../../utils/device";
import { Welcome } from "../../components/MyProfile/Welcome";
import { useNavigation } from "@react-navigation/native";
import { Avatar, MD2Colors, Text } from "react-native-paper";
import { Typography } from "../../components/UI/Typography";
import { customerSelector, userSelector } from "../../utils/store/selectors";

export const ProfileScreen = () => {
  const customer = useSelector(customerSelector);
  const profile = useSelector(userSelector);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <Typography variant="bodyMedium" size={12}>
            Bonjour
          </Typography>
          <Typography style={{ lineHeight: 20 }} fontWeight="Bold">
            {customer?.first_name + " " + customer?.last_name}
          </Typography>
        </View>
      ),
      headerRight: () => (
        <>
          {!profile?.avatar_url ? (
            <Avatar.Text
              size={35}
              label={
                String(customer?.first_name).slice(0, 1).toUpperCase() +
                String(customer?.last_name).slice(0, 1).toUpperCase()
              }
            />
          ) : (
            <Avatar.Image size={35} source={{ uri: customer?.avatar_url }} />
          )}
        </>
      ),
      headerTitle: () => <></>,
    });
  });
  return (
    <View style={styles.container}>
      <ProfileMenu />
      <ImageBackground
        style={{
          width: deviceWidth - 150,
          height: deviceWidth - 150,
          position: "absolute",
          left: 15,
          bottom: 15,
          opacity: 0.35,
        }}
        source={{
          uri: "https://orgaliving.com/wp-content/uploads/2024/01/zawa9a.png",
        }}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: MD2Colors.white },
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
