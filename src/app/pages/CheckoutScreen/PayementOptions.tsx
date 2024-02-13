import { useQuery } from "react-query";
import { get_payment_gateways } from "../../utils/api-calls";
import { View } from "react-native";
import {
  ActivityIndicator,
  MD2Colors,
  MD2LightTheme,
  RadioButton,
  Text,
} from "react-native-paper";
import { useEffect } from "react";
import React from "react";
import { BG_LIGHT_COLOR, TEXT_COLOR } from "../../utils/device";

export const PayementOptions: React.FC<{
  getPayementDetailsHandler: (details: any) => void;
}> = ({ getPayementDetailsHandler }) => {
  const [checked, setChecked] = React.useState();

  const { data, isLoading } = useQuery(
    "get_payment_gateways",
    get_payment_gateways
  );

  useEffect(() => {
    if (!isLoading) {
      const payementMethode = data?.find((item) => item.id === checked);
      getPayementDetailsHandler(payementMethode);
    }
  }, [checked]);

  return (
    <View>
      <Text
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          color: TEXT_COLOR.primary,
        }}
        variant="titleMedium"
      >
        Mode de Paiement
      </Text>
      {!!isLoading && <ActivityIndicator color={BG_LIGHT_COLOR.default} />}
      {!isLoading &&
        data?.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 5,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderColor: MD2Colors.indigo400,
                borderWidth: 2,
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <RadioButton
                value="bacs"
                status={checked === item.id ? "checked" : "unchecked"}
                onPress={() => setChecked(item.id)}
                theme={MD2LightTheme}
              />
            </View>
            <View>
              <Text variant="titleMedium">{item.title}</Text>
              <Text style={{ color: MD2Colors.indigo400 }} variant="bodySmall">
                {item.description}
              </Text>
            </View>

            {/*  <Text>{JSON.stringify(item)}</Text> */}
          </View>
        ))}
    </View>
  );
};
