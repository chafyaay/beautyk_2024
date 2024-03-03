import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Card, Icon, MD2Colors, Modal, Portal, Text } from "react-native-paper";
import { deviceHeight, TEXT_COLOR, BG_COLOR } from "../../utils/device";
import { OrderProps } from "../../utils/models";
import DataIndex from "../../utils/DataIndex";
import Spacer from "../UI/Spacer";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../UI/Typography";
import { PressableButton } from "../UI/Buttons";
import { useState } from "react";
import { AddReviewScreen } from "../../pages/AddReviewScreen/AddReviewScreen";
import AddReviewForm from "../Reviews/AddReviewForm";

const ItemCard = ({
  name,
  quantity,
  total,
  image,
  product_id,
  hideModal,
  canEvalute,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation() as any;
  return (
    <View style={styles.itemContainer}>
      <Card.Cover
        style={{
          width: 60,
          height: 60,
        }}
        source={{ uri: image.src }}
      />

      <View style={{ flex: 2 }}>
        <Typography
          children={quantity + " x " + name}
          numberOfLines={2}
          size={13}
          fontWeight="Medium"
          variant="bodyMedium"
        />
        <Typography children={total + "Dh"} size={13} fontWeight="Bold" />
      </View>
      {canEvalute && (
        <PressableButton
          size="small"
          onPress={() => {
            //navigation.navigate("AddReviewScreen", { id: product_id });
            hideModal();
            setShowModal(true);
          }}
          type="outlined"
          fontWeight="Bold"
          children={DataIndex.evalute_products}
        />
      )}
      <Modal visible={showModal}>
        <AddReviewForm />
      </Modal>
    </View>
  );
};

const AddressRender = ({ addressDetails, title }) => {
  return (
    <View>
      <Typography fontWeight="Bold">{title}</Typography>
      <Typography style={{ lineHeight: 20 }} fontWeight="Medium">
        {addressDetails.first_name + " " + addressDetails.last_name}
      </Typography>
      <Typography style={{ lineHeight: 20 }} fontWeight="Medium">
        {addressDetails.phone}
      </Typography>
      <Typography
        fontWeight="Medium"
        style={{ lineHeight: 20 }}
        numberOfLines={3}
        children={
          addressDetails.address_1 +
          " " +
          addressDetails.address_2 +
          ", " +
          addressDetails.city +
          ", " +
          addressDetails.company
        }
      />
    </View>
  );
};

const OrderItems: React.FC<{
  order: OrderProps;
  hideModal: (e: string) => void;
}> = ({ order, hideModal }) => (
  <View style={styles.wrapContainer}>
    <View style={[styles.container]}>
      <Spacer size={20} />
      <ScrollView>
        {order.line_items.map((item) => (
          <ItemCard
            canEvalute={order.status === "completed"}
            hideModal={hideModal}
            {...item}
          />
        ))}
      </ScrollView>
    </View>

    <View style={{ backgroundColor: MD2Colors.grey100 }}>
      {/* product information */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: 10,
          borderRadius: 5,
          margin: 10,
        }}
      >
        <View
          style={{
            width: "50%",
          }}
        >
          <Typography
            children={DataIndex.sub_total_items}
            fontWeight="Bold"
            size={13}
          />
          <Typography children={DataIndex.shippins_fees} />
        </View>
        <View
          style={{
            width: "50%",
          }}
        >
          <Typography
            children={order.total + " Dh"}
            size={13}
            fontWeight="Bold"
            style={{ textAlign: "right" }}
          />
          <Typography
            children={order.shipping_lines[0].total + " Dh"}
            style={{ textAlign: "right" }}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            marginTop: 10,
            paddingTop: 10,
          }}
        >
          <Typography children={DataIndex.total} fontWeight="Bold" />
          <Typography
            children={
              (
                Number(order.total) + Number(order.shipping_lines[0].total)
              ).toFixed(2) + " Dh"
            }
            fontWeight="Bold"
          />
        </View>
        {order?.refunds.length > 0 && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopWidth: 1,
              marginTop: 10,
              paddingTop: 10,
            }}
          >
            <Typography
              children={order.refunds[0]?.reason}
              color={MD2Colors.pinkA400}
            />
            <Typography
              children={order?.refunds[0]?.total + " Dh"}
              fontWeight="Bold"
              color={MD2Colors.pinkA400}
            />
          </View>
        )}
      </View>
      {/* payement details */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          margin: 10,
        }}
      >
        <Typography children={DataIndex.payemnt_details} />
        <Typography children={order.payment_method_title} fontWeight="Bold" />
      </View>
      {/* payement details */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: 10,
          borderRadius: 5,
          margin: 10,
          columnGap: 10,
        }}
      >
        <View style={{ flex: 2 }}>
          <AddressRender
            title={DataIndex.shipping}
            addressDetails={order.shipping}
          />
        </View>
      </View>
    </View>
  </View>
);

export default OrderItems;

const styles = StyleSheet.create({
  wrapContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    flex: 2,
  },
  adressContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    columnGap: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    minHeight: 60,
    shadowColor: MD2Colors.grey700,
    shadowOffset: { width: -0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 3,
    backgroundColor: "white",
  },
});
