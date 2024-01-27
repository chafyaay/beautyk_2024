import { useEffect, useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Text,
  Drawer,
  Portal,
  Divider,
  MD2Colors,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { $bodyText, deviceHeight, deviceWidth } from "../../utils/device";
import { GET_ORDERS } from "../../utils/api-calls";
import { setCustomer, setUser } from "../../utils/store/actions/user.actions";
import { DefaultButton, LinkButton } from "../../components/UI/Buttons";
import { useQuery } from "react-query";
import { Separator } from "../../components/commun/Separator";

export const ProfileScreen = ({ navigation, onHideModal }) => {
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

  const Welcome = ({ profile }) => {
    const { email, first_name, last_name, avatar_url } = profile;
    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    });
    return (
      <View style={styles.container}>
        <View>
          <Text>Bonjour </Text>
          <Text style={{ color: $bodyText }} variant="titleMedium">
            {first_name + " " + last_name}
          </Text>
          <Text style={{ color: MD2Colors.blue300 }} variant="labelSmall">
            {email}
          </Text>
        </View>

        {!avatar_url ? (
          <Avatar.Text
            size={35}
            label={
              String(first_name).slice(0, 1).toUpperCase() +
              String(last_name).slice(0, 1).toUpperCase()
            }
          />
        ) : (
          <Avatar.Image size={35} source={{ uri: avatar_url }} />
        )}
      </View>
    );
  };

  const MyOrders = () => {
    return (
      <View>
        <LinkButton
          icon="basket-outline"
          onEventHandler={() => {
            onHideModal(false);
            navigation.navigate("MyOrdersListScreen", { orders });
          }}
          title={`Mes Commandes (${orders?.length})`}
        />
        <LinkButton
          icon="account-outline"
          onEventHandler={() => {
            onHideModal(false);
          }}
          title={`Mon compte`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Welcome profile={customer} />
      <Separator size={20} />
      <MyOrders />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
