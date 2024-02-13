import React, { useState } from "react";
import { View, ScrollView, Button } from "react-native";
import Spacer from "../UI/Spacer";
import UpdateAddressForm from "./UpdateAddressForm";
import { SegmentedButtons, MD2LightTheme, MD2Colors } from "react-native-paper";
import DataIndex from "../../utils/DataIndex";
import { PressableButton } from "../UI/Buttons";

export const MyAdress = () => {
  const [selectedAddress, setSelectedAddress] = useState<
    "shipping" | "billing"
  >("shipping");

  const [formIndex, setFormIndex] = useState("shipping") as any;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Spacer size={10} />
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          justifyContent: "space-between",
        }}
      >
        <PressableButton
          fontWeight="Medium"
          type={selectedAddress === "billing" ? "Link" : "outlined"}
          children={DataIndex.billing}
          onPress={() => {
            setSelectedAddress("billing");
          }}
        />
        <PressableButton
          fontWeight="Medium"
          type={selectedAddress === "shipping" ? "Link" : "outlined"}
          children={DataIndex.shipping}
          onPress={() => {
            setSelectedAddress("shipping");
          }}
        />
      </View>

      <ScrollView style={{ padding: 20 }}>
        <PressableButton
          fontWeight="Bold"
          type="Link"
          children={DataIndex.billing}
          onPress={() => {
            setFormIndex("shipping");
          }}
        />
        <PressableButton
          fontWeight="Bold"
          type="Link"
          children={DataIndex.billing}
          onPress={() => {
            setFormIndex("billing");
          }}
        />
        <Spacer size={100} />
        <UpdateAddressForm formAddess={formIndex} />
      </ScrollView>
    </View>
  );
};
