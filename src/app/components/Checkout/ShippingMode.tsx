import { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-paper";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Typography } from "../../components/UI/Typography";
import { getProductsShippingModeApiCall } from "../../utils/api-calls";
import { CustomersProps } from "../../utils/models";
import { customerSelector, cartSelector } from "../../utils/store/selectors";

const ShippingMode = ({ city, onShippingFees }) => {
  const [shippingFees, setShippingFees] = useState({}) as any;
  const { shipping } = useSelector(customerSelector) as CustomersProps;
  const cart = useSelector(cartSelector) as any;

  const { data, isFetched } = useQuery(
    "ListAllShippingMethodsApiCall",
    async () => getProductsShippingModeApiCall()
  );

  useEffect(() => {
    const shippingCity = (city || shipping.city).toLocaleLowerCase();

    if (!!isFetched) {
      let result = {} as any;

      const total = cart.items.reduce(
        (a, b) => (a += b.product.price * b.quantity),
        0
      );

      if (total < 400) {
        if (shippingCity !== "casablanca")
          result = data.find((item) => item.name === "30");
        else result = data.find((item) => item.name === "20");
      } else result = data.find((item) => item.name === "0");

      onShippingFees(result);
      setShippingFees(result);
    }
  }, [data, city]);

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        columnGap: 10,
      }}
    >
      <Icon source="radiobox-marked" size={20} />
      <Typography style={{ flex: 1 }} size={13} fontWeight="Regular">
        {shippingFees?.description}
      </Typography>
    </View>
  );
};

export default ShippingMode;
