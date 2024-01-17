import { useQuery } from "react-query";
import { get_payment_gateways } from "../../utils/api-calls";
import { View } from "react-native";
import {
  MD2Colors,
  MD2LightTheme,
  RadioButton,
  Text,
} from "react-native-paper";
import { useEffect } from "react";
import React from "react";

export const PayementOptions: React.FC<{}> = () => {
  const [checked, setChecked] = React.useState("bacs");

  const { data, isLoading } = useQuery(
    "get_payment_gateways",
    get_payment_gateways
  );

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
        Paiement
      </Text>
      <>
        {!!data &&
          data.map((item) => (
            <View
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
                <Text
                  style={{ color: MD2Colors.indigo400 }}
                  variant="bodySmall"
                >
                  {item.description}
                </Text>
              </View>

              {/*  <Text>{JSON.stringify(item)}</Text> */}
            </View>
          ))}
      </>
    </View>
  );
};
