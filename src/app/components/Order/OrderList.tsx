import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { BG_DARK_COLOR, BG_COLOR } from "../../utils/device";
import { OrderProps } from "../../utils/models";
import { TextHolder } from "../UI/TextHolder";
import moment from "moment";
import OrderStatus from "./OrderStatus";
import DataIndex from "../../utils/DataIndex";

const Item = ({ title, value }) => (
  <View>
    <TextHolder text={title} weight="bold" size={10} />
    <TextHolder text={String(value)} size="xs" />
  </View>
);

const OrderList: React.FC<{
  orderList: OrderProps[];
  setSelectedOrder: (orderNumber: string) => void;
}> = ({ setSelectedOrder, orderList }) => {
  return (
    <View style={styles.wrapContainer}>
      <ScrollView style={{ padding: 20 }}>
        {orderList.map((order) => (
          <Pressable
            style={styles.container}
            onPress={() => {
              setSelectedOrder(order.number);
            }}
          >
            <View style={styles.header}>
              <TextHolder text={"n° " + order.number} weight="bold" size="xs" />
              <OrderStatus status={order?.status} />
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
    borderWidth: 1,
    borderColor: BG_COLOR.primary,
    backgroundColor: BG_DARK_COLOR.light,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
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
