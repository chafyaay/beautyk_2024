import { ImageBackground, StyleSheet, View } from "react-native";

import { ProfileMenu, Welcome } from "../../components/MyProfile/ProfileMenu";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Separator } from "../../components/commun/Separator";
import { GET_ORDERS } from "../../utils/api-calls";
import { deviceWidth } from "../../utils/device";

export const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const { customer, user } = useSelector((state: any) => state?.user) as any;

  const getOrders = async () => {
    return await GET_ORDERS();
  };

  useEffect(() => {
    getOrders()
      .then((response) => {
        const id = customer?.id;
        if (!!id) {
          const newOrders = !!(response?.length > 0)
            ? response?.filter((order) => order?.customer_id === id)
            : [];
          setOrders(newOrders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [customer]);

  return (
    <View style={styles.container}>
      <Welcome customer={customer} profile={customer} />
      <Separator size={20} />
      <ProfileMenu isLoggedIn={!!user} ordersCount={orders.length} />
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
  container: { flex: 1 },
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
