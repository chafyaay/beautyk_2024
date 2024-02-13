import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Icon, MD2Colors } from "react-native-paper";
import { deviceHeight, TEXT_COLOR, BG_COLOR } from "../../utils/device";
import { OrderProps } from "../../utils/models";
import { TextHolder } from "../UI/TextHolder";
import DataIndex from "../../utils/DataIndex";
import Spacer from "../UI/Spacer";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ItemCard = ({ name, quantity, total, image, product_id, hideModal }) => {
  const navigation = useNavigation() as any;
  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        style={{ width: 60, height: 60 }}
        source={{ uri: image.src }}
      />
      <View style={{ flex: 2 }}>
        <TextHolder
          text={quantity + " x " + name}
          nbrLines={2}
          size={13}
          weight="medium"
          color={TEXT_COLOR.link}
        />
        <TextHolder
          text={total + "Dh"}
          size={13}
          weight="bold"
          color={TEXT_COLOR.primary}
        />
      </View>

      <Pressable
        style={{
          flex: 1,
          padding: 5,
          backgroundColor: MD2Colors.greenA100,
          borderRadius: 5,
          height: 30,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.navigate("AddReviewScreen", { id: product_id });
          hideModal();
        }}
        children={
          <TextHolder
            color={MD2Colors.green900}
            style={{ textAlign: "center" }}
            size={13}
            text={DataIndex.evalute_products}
            weight="bold"
          />
        }
      />
    </View>
  );
};

const AddressRender = ({ addressDetails, title }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon size={25} source="map-marker-outline" />
        <TextHolder
          style={{ width: 100 }}
          nbrLines={2}
          text={title}
          size={13}
          weight="bold"
        />
      </View>
      <Spacer size={10} />
      <TextHolder
        text={addressDetails.first_name + " " + addressDetails.last_name}
        weight="bold"
        color={MD2Colors.indigo700}
      />
      <TextHolder
        nbrLines={3}
        text={
          addressDetails.address_1 +
          " " +
          addressDetails.address_2 +
          " " +
          addressDetails.city +
          " " +
          addressDetails.company
        }
        size={12}
        color={MD2Colors.indigo700}
      />
      <TextHolder
        text={addressDetails.phone}
        size={12}
        color={MD2Colors.indigo700}
      />
      <TextHolder
        text={addressDetails.email}
        size={12}
        color={MD2Colors.indigo700}
      />
    </View>
  );
};

const OrderItems: React.FC<{
  order: OrderProps;
  hideModal: (e: string) => void;
}> = ({ order, hideModal }) => (
  <View style={styles.wrapContainer}>
    <View style={styles.container}>
      <Spacer size={20} />
      <ScrollView>
        {order.line_items.map((item) => (
          <ItemCard hideModal={hideModal} {...item} />
        ))}
      </ScrollView>
      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        style={{ width: "100%", height: 30, position: "absolute", bottom: 0 }}
      />
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
        style={{ width: "100%", height: 30, position: "absolute", top: 0 }}
      />
    </View>
    {/* product information */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        borderWidth: 1,
        borderColor: BG_COLOR.primary,
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
        <TextHolder text={DataIndex.sub_total_items} weight="bold" size={13} />
        <TextHolder text={DataIndex.shippins_fees} size="xs" />
      </View>
      <View
        style={{
          width: "50%",
        }}
      >
        <TextHolder
          text={order.total + " Dh"}
          size={13}
          weight="bold"
          style={{ textAlign: "right" }}
        />
        <TextHolder
          text={order.shipping_lines[0].total + " Dh"}
          size="xs"
          style={{ textAlign: "right" }}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: BG_COLOR.primary,
          borderTopWidth: 1,
          marginTop: 10,
          paddingTop: 10,
        }}
      >
        <TextHolder
          text={DataIndex.total}
          size="s"
          weight="bold"
          color={TEXT_COLOR.primary}
        />
        <TextHolder
          text={
            (
              Number(order.total) + Number(order.shipping_lines[0].total)
            ).toFixed(2) + " Dh"
          }
          weight="bold"
          size="s"
          color={TEXT_COLOR.primary}
        />
      </View>
      {order?.refunds.length > 0 && (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopColor: BG_COLOR.primary,
            borderTopWidth: 1,
            marginTop: 10,
            paddingTop: 10,
          }}
        >
          <TextHolder
            text={order.refunds[0]?.reason}
            size="xs"
            color={TEXT_COLOR.error}
          />
          <TextHolder
            text={order?.refunds[0]?.total + " Dh"}
            weight="bold"
            size="xs"
            color={TEXT_COLOR.error}
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
        borderColor: BG_COLOR.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
      }}
    >
      <TextHolder text={DataIndex.payemnt_details} />
      <TextHolder text={order.payment_method_title} weight="bold" />
    </View>
    {/* payement details */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        borderWidth: 1,
        borderColor: BG_COLOR.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        columnGap: 10,
      }}
    >
      <View style={{ flex: 2 }}>
        <AddressRender
          title={DataIndex.billing}
          addressDetails={order.billing}
        />
      </View>
      <View style={{ flex: 2 }}>
        <AddressRender
          title={DataIndex.shipping}
          addressDetails={order.shipping}
        />
      </View>
    </View>
    {/* adress de livraison */}
    <View></View>
  </View>
);

const styles = StyleSheet.create({
  wrapContainer: {},
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: deviceHeight / 2.5,
  },
  adressContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: BG_COLOR.primary,
    borderRadius: 5,
    marginBottom: 15,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: BG_COLOR.primary,
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
  },
});

export default OrderItems;
