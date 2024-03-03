import { View } from "react-native";
import { getOrderStatusUi } from "../../utils/helpers";

import { Icon, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../AppHeader/AppHeader";
import DataIndex from "../../utils/DataIndex";
import { Typography } from "../UI/Typography";
import { getReportsApiCall } from "../../utils/api-calls";

const OrderStatus = ({ status, data, orderNumber }) => {
  const { color, icon } = getOrderStatusUi(status);
  const getStatusLabel = () =>
    !!data ? data?.find((item) => item.slug === status).name : "...";

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        top: -11,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography children={"# " + orderNumber} fontWeight="Bold" size={16} />
      <Typography
        children={getStatusLabel()}
        fontWeight="Bold"
        size={11}
        color={color.text}
        textTrasform="uppercase"
      />
      {/*  <Icon source={icon} size={13} color={color.bg} />
      <Typography
        children={" " + getStatusLabel()}
        fontWeight="Bold"
        size={16}
        textTrasform="capitalize"
        color={color.bg}
      /> */}
    </View>
  );
};

export default OrderStatus;
