import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { deviceHeight } from "../../utils/device";
import { UserProps } from "../../utils/store/reducers/user.reducers";
import AppHeader from "../../components/AppHeader/AppHeader";
import { AccountDetails } from "../../components/MyProfile/AccountDetails";

export const MyAccountScreen = ({ navigation }) => {
  const { customer, user } = useSelector(
    (state: any) => state.user
  ) as UserProps;

  const customerDetails = {
    first_name: customer?.first_name,
    last_name: customer?.last_name,
    name: user.displayName,
    email: customer?.email,
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: true,
      header: () => <AppHeader title="Détails du compte" goBack />,
    });
  });

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={{ padding: 15, height: deviceHeight }}>
        <AccountDetails userId={customer?.id} userDetails={customerDetails} />
      </ScrollView>
    </View>
  );
};
