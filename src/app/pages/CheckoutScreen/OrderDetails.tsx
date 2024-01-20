import { useQuery } from "react-query";
import { GET_SHIPPING_MODES } from "../../utils/api-calls";
import { View } from "react-native";
import { MD2Colors, DataTable, Text } from "react-native-paper";
import { ProductCard } from "../../components/Product/ProductCard";
import { ProductProps } from "../../utils/models";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const OrderDetails: React.FC<{
  city: string;
  getShippingMethod: (shipping: any) => void;
}> = ({ city, getShippingMethod }) => {
  const { cart } = useSelector((state) => state) as any;
  const [shippingMode, setShippingMode] = useState({ name: 0 }) as any;

  const subtotal = cart?.items.reduce(
    (a, b) => (a += b?.quantity * b?.product?.price),
    0
  );

  const { data, isLoading } = useQuery(
    "GET_SHIPPING_MODES",
    GET_SHIPPING_MODES
  );

  useEffect(() => {
    if (!!data && data.length > 0) {
      if (subtotal >= 400)
        setShippingMode(data.find((item: any) => item?.slug === "free"));
      else {
        if (city != "") {
          if (city?.toLocaleLowerCase() === "casablanca")
            setShippingMode(data?.find((item: any) => item?.slug === "paid-1"));
          else
            setShippingMode(data?.find((item: any) => item?.slug === "paid-2"));
        } else setShippingMode({ name: 0 });
      }
    }
  }, [data, cart, city]);

  useEffect(() => {
    getShippingMethod(shippingMode);
  }, [shippingMode]);

  return (
    <View>
      <Text
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          color: MD2Colors.indigo500,
        }}
        variant="titleMedium"
      >
        Details de Ma commande
      </Text>
      {!!cart && (
        <DataTable
          style={{
            borderWidth: 1,
            paddingBottom: 10,
            borderColor: MD2Colors.indigo100,
            borderRadius: 2,
            backgroundColor: MD2Colors.grey100,
          }}
        >
          {cart?.items?.map((item: any, index: number) => {
            const product = item?.product as ProductProps;

            return (
              <>
                <DataTable.Row style={{ backgroundColor: "white" }}>
                  <ProductCard key={index} type="c" product={product} />
                </DataTable.Row>
              </>
            );
          })}

          <DataTable.Row>
            <DataTable.Title textStyle={{ color: MD2Colors.black }}>
              Sous-Total
            </DataTable.Title>
            <DataTable.Title numeric>{subtotal} dhs</DataTable.Title>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title textStyle={{ color: MD2Colors.black }}>
              Frais d'expedition
            </DataTable.Title>
            <DataTable.Title numeric>
              {shippingMode?.name === "free" ? 0 : shippingMode?.name} dhs
            </DataTable.Title>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title
              textStyle={{ color: MD2Colors.black, fontSize: 14 }}
            >
              Total à payer
            </DataTable.Title>
            <DataTable.Title
              textStyle={{ color: MD2Colors.black, fontSize: 14 }}
              numeric
            >
              {subtotal +
                Number(
                  shippingMode?.name === "free" ? 0 : shippingMode?.name
                )}{" "}
              dhs
            </DataTable.Title>
          </DataTable.Row>
        </DataTable>
      )}
    </View>
  );
};
