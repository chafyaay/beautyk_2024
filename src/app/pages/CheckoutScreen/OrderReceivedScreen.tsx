import { View } from "react-native";
import {
  MD2Colors,
  DataTable,
  Text,
  Portal,
  IconButton,
  Button,
  Divider,
} from "react-native-paper";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import { useSelector } from "react-redux";
import AddToCart from "../../components/AddToCart";
import { $primaryColor } from "../../utils/device";
moment.locale("fr");

export const OrderReceivedScreen = ({ navigation, route }) => {
  const { cart } = useSelector((state) => state) as any;
  const {
    number,
    billing,
    shipping,
    total,
    payment_method,
    payment_method_title,
    line_items,
    date_created,
    currency,
  } = route?.params;

  console.log(route?.params);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <Portal>
      <View
        style={{
          flex: 1,
          padding: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <IconButton
          iconColor={MD2Colors.greenA400}
          icon={"check"}
          size={60}
        ></IconButton>
        <Text
          variant="titleMedium"
          style={{
            fontSize: 18,
            textAlign: "center",
            color: $primaryColor,
            margin: 10,
            marginBottom: 60,
          }}
        >
          Merci. Votre commande a été reçue.
        </Text>
        <Text
          style={{
            textAlign: "left",
            margin: 5,
            color: MD2Colors.indigo400,
            width: "100%",
          }}
          variant="titleMedium"
        >
          Détails de la commande
        </Text>
        <DataTable
          style={{
            backgroundColor: MD2Colors.grey100,
            borderRadius: 5,
            marginBottom: 20,
          }}
        >
          <DataTable.Row>
            <DataTable.Title>Numéro de commande</DataTable.Title>
            <DataTable.Title numeric>
              <Text variant="titleSmall">{number}</Text>
            </DataTable.Title>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Date:</DataTable.Title>
            <DataTable.Title numeric>
              <Text variant="titleSmall">
                {moment(date_created).format("LL")}{" "}
              </Text>
            </DataTable.Title>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Total:</DataTable.Title>
            <DataTable.Title numeric>
              <Text variant="titleSmall">
                {total} {currency}
              </Text>
            </DataTable.Title>
          </DataTable.Row>
        </DataTable>

        <AddToCart navigation={navigation} isFinalPage />
      </View>
    </Portal>
  );
};
