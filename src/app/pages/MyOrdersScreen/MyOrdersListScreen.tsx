import React, { useState, useEffect } from "react";
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
};
