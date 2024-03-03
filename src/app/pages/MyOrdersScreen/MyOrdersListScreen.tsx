/* import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { IconButton, MD2Colors } from "react-native-paper";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { OrderProps } from "../../utils/models";
import OrderList from "../../components/Order/OrderList";
import OrderItems from "../../components/Order/OrderItem";
import { BG_COLOR } from "../../utils/device";

const _ = require("lodash");

export const MyOrdersListScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState() as any;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const { orders } = useSelector((state: any) => state?.user) as any;

  const myOrders = orders as OrderProps[];

  useEffect(() => {
    if (myOrders?.length > 0) {
      setSelectedOrder(_.groupBy(myOrders, "number"));
    }
  }, [myOrders]);

  return (
    <View style={{ flex: 1 }}>
      <OrderList orderList={orders} setSelectedOrder={setSelected} />

      <Modal
        animationType="slide"
        visible={!!selected}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <IconButton
          onPress={() => {
            setSelected("");
          }}
          icon="close"
          size={25}
        />
        {selected && (
          <OrderItems
            hideModal={setSelected}
            order={selectedOrder[selected][0]}
          />
        )}
      </Modal>
    </View>
  );
};
 */

/* import React, { useState, useEffect } from "react";
import { Modal, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getReports } from "../../utils/api-calls";
import { OrderProps } from "../../utils/models";
import OrderList from "../../components/Order/OrderList";
import OrderItems from "../../components/Order/OrderItem";

const _ = require("lodash");

export const MyOrdersListScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState() as any;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const { orders } = useSelector((state: any) => state?.user) as any;

  const myOrders = orders as OrderProps[];

  useEffect(() => {
    if (myOrders?.length > 0) {
      setSelectedOrder(_.groupBy(myOrders, "number"));
    }
  }, [myOrders]);

  return (
    <View style={{ flex: 1 }}>
      <OrderList orderList={orders} setSelectedOrder={setSelected} />

      <Modal
        animationType="slide"
        visible={!!selected}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <IconButton
          onPress={() => {
            setSelected("");
          }}
          icon="close"
          size={25}
        />
        {selected && (
          <OrderItems
            hideModal={setSelected}
            order={selectedOrder[selected][0]}
          />
        )}
      </Modal>
    </View>
  );
}; */
import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Card, Icon, IconButton, MD2Colors, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { OrderProps } from "../../utils/models";
import OrderList from "../../components/Order/OrderList";
import OrderItems from "../../components/Order/OrderItem";
import { orderSelector, userSelector } from "../../utils/store/selectors";
import moment from "moment";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import OrderStatus from "../../components/Order/OrderStatus";
import { Typography } from "../../components/UI/Typography";
import DataIndex from "../../utils/DataIndex";
import { BG_COLOR } from "../../utils/device";
import { getOrderStatusUi } from "../../utils/helpers";
import { PressableButton } from "../../components/UI/Buttons";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "react-query";
import { getReportsApiCall } from "../../utils/api-calls";
import Spacer from "../../components/UI/Spacer";

const _ = require("lodash");

export const MyOrdersListScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState() as any;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const orders = useSelector(orderSelector);
  const [orderList, setOrderList] = useState<OrderProps[]>([]);
  useEffect(() => {
    if (orders?.length > 0) {
      setOrderList(_.groupBy(orders, "number"));
    }
  }, [orders]);
  useEffect(() => {
    if (orders?.length > 0) {
      setSelectedOrder(_.groupBy(orders, "number"));
    }
  }, [orders]);

  const Item = ({ title, value }) => (
    <View>
      <Typography
        textTrasform="uppercase"
        color={MD2Colors.grey700}
        children={title}
        fontWeight="Bold"
        size={10}
      />
      <Typography
        style={{ lineHeight: 19 }}
        textTrasform="capitalize"
        fontWeight="Medium"
        children={String(value)}
        size={13}
      />
    </View>
  );

  const { data, isLoading } = useQuery(
    "get Reports",
    async () => await getReportsApiCall()
  );

  return (
    <View style={styles.wrapContainer}>
      <ScrollView horizontal>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            columnGap: 10,
            height: 200,
          }}
        >
          {data.map((item) => (
            <Pressable
              style={{
                height: 90,
                width: 90,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: MD2Colors.grey50,
              }}
            >
              <Icon
                color={getOrderStatusUi(item.slug).color.bg}
                size={20}
                source={getOrderStatusUi(item.slug).icon}
              />
              <Typography fontWeight="Bold">{item.name}</Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ScrollView>
        {orders?.map((order: OrderProps) => (
          <Card
            onPress={() => {
              setSelected(order.number);
            }}
            style={{
              marginBottom: 5,
              padding: 10,
              borderLeftWidth: 2,
              borderLeftColor: getOrderStatusUi(order.status).color.bg,
              borderRadius: 3,
              backgroundColor: MD2Colors.white,
              shadowColor: MD2Colors.grey700,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.13,
              shadowRadius: 12,
            }}
            mode="contained"
          >
            <OrderStatus
              orderNumber={order.number}
              data={data}
              status={order.status}
            />
            <View style={styles.body}>
              <Item title={DataIndex.sub_total} value={order.total + " Dh"} />
              <Item title={DataIndex.items} value={order.line_items.length} />
              <Item
                title={DataIndex.order_date}
                value={moment(order.date_created).format("MMMM DD YYYY")}
              />
              {order.date_completed && (
                <Item
                  title={DataIndex.date_completed}
                  value={moment(order.date_completed).format("MMMM DD YYYY")}
                />
              )}
            </View>
          </Card>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        visible={!!selected}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            width: "100%",
            top: 0,
            justifyContent: "center",
            alignContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <IconButton
            onPress={() => {
              setSelected("");
            }}
            icon="close"
            size={25}
          />
        </View>
        {selected && (
          <OrderItems
            hideModal={setSelected}
            order={selectedOrder[selected][0]}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: { backgroundColor: "white", flex: 1, padding: 10 },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 3,
    backgroundColor: MD2Colors.grey50,
    marginTop: 10,
    shadowColor: MD2Colors.grey700,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
    paddingTop: 15,
    width: "100%",
  },
});
