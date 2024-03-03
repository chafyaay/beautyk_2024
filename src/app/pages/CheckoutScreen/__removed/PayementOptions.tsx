import { useQuery } from "react-query";
import { get_payment_gateways } from "../../../utils/api-calls";
import { Pressable, View } from "react-native";
import {
  ActivityIndicator,
  Icon,
  MD2Colors,
  MD2LightTheme,
  Paragraph,
  RadioButton,
  Text,
} from "react-native-paper";
import { useEffect } from "react";
import React from "react";
import { BG_LIGHT_COLOR, TEXT_COLOR } from "../../../utils/device";
import { Typography } from "../../../components/UI/Typography";

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

  if (!isLoading)
    return (
      <View>
        {data?.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setChecked(item.id)}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 5,
              shadowColor: MD2Colors.grey700,
              shadowOffset: { width: -0, height: 0 },
              shadowOpacity: 0.32,
              shadowRadius: 3,
              backgroundColor: MD2Colors.white,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <RadioButton
              value="bacs"
              status={checked === item.id ? "checked" : "unchecked"}
              theme={MD2LightTheme}
            />
            <View style={{ flex: 1 }}>
              <Typography fontWeight="Bold" variant="titleMedium">
                {item.title}
              </Typography>
              <Typography color={MD2Colors.grey700} size={13}>
                {item.description}
              </Typography>
            </View>
          </Pressable>
        ))}
      </View>
    );

  return <ActivityIndicator color={BG_LIGHT_COLOR.default} />;
};
