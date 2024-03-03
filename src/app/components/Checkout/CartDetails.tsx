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
moment.locale("fr");

export const CartDetails = () => {
  return (
    <Portal>
      <></>
    </Portal>
  );
};
