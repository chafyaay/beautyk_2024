import { View } from "react-native";
import { getOrderStatusUi } from "../../utils/helpers";
import { TextHolder } from "../UI/TextHolder";
import { Icon } from "react-native-paper";
import { useQuery } from "react-query";
import { getReports } from "../../utils/api-calls";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../AppHeader/AppHeader";
import DataIndex from "../../utils/DataIndex";

const OrderStatus = ({ status }) => {
  const navigation = useNavigation();
  const { data, isLoading } = useQuery("getReports", async () => getReports());

  const { color, icon } = getOrderStatusUi(status);
  const getStatusLabel = () =>
    !isLoading ? data?.find((item) => item.slug === status).name : "";

  useEffect(() => {
    navigation.setOptions({
      header: () => <AppHeader goBack title={DataIndex.orderHistory} />,
    });
  }, []);

  return (
    <View
      style={{
        borderRadius: 5,
        padding: 3,
        backgroundColor: color.bg,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icon source={icon} size={13} color={color.text} />
      <TextHolder
        text={" " + getStatusLabel()}
        weight="bold"
        size={10}
        color={color.text}
      />
    </View>
  );
};

export default OrderStatus;
