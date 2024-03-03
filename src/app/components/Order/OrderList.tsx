import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { BG_DARK_COLOR, BG_COLOR } from "../../utils/device";
import { OrderProps } from "../../utils/models";

import moment from "moment";
import OrderStatus from "./OrderStatus";
import DataIndex from "../../utils/DataIndex";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderSelector } from "../../utils/store/selectors";
import { IconButton, MD2Colors, Text } from "react-native-paper";
import { Typography } from "../UI/Typography";
const _ = require("lodash");

const Item = ({ title, value }) => (
  <View>
    <Typography children={title} fontWeight="Bold" size={10} />
    <Typography children={String(value)} />
  </View>
);

const OrderList = ({ setSelectedOrder }) => {
  const orders = useSelector(orderSelector);
  const [orderList, setOrderList] = useState<OrderProps[]>([]);

  useEffect(() => {
    if (orders?.length > 0) {
      setOrderList(_.groupBy(orders, "number"));
    }
  }, [orders]);

  return (
    <View style={styles.wrapContainer}>
      <ScrollView style={{ padding: 20 }}>
        {orders.map((order) => (
          <Pressable
            style={styles.container}
            onPress={() => {
              setSelectedOrder(order.number);
            }}
          >
            <View style={styles.header}>
              <Typography
                children={"N° " + order.number}
                fontWeight="Bold"
                size={12}
              />
            </View>
            <View style={styles.body}>
              <Item title={DataIndex.sub_total} value={order.total + " Dh"} />
              <Item title={DataIndex.items} value={order.total + " Dh"} />
              <Item
                title={DataIndex.order_date}
                value={moment(order.date_created).format("MMMM DD YYYY")}
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

/*  ****************  */
/*  styles  */
/*  ****************  */

const styles = StyleSheet.create({
  wrapContainer: { backgroundColor: "white", flex: 1 },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 3,
    backgroundColor: MD2Colors.white,
    marginTop: 10,
    shadowColor: MD2Colors.grey700,
    shadowOffset: { width: -0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: BG_COLOR.primary,
    padding: 4,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    width: "100%",
  },
});

export default OrderList;
