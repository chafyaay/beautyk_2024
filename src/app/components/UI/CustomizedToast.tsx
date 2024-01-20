import { View } from "react-native";
import {
  Button,
  MD2Colors,
  MD2LightTheme,
  Avatar,
  Card,
} from "react-native-paper";
import Toast, { BaseToast } from "react-native-toast-message";
import { DefaultButton, PrimaryButton } from "./Buttons";
import { $defaultColor, $primaryColor } from "../../utils/device";

export const CustomizedToast = () => {
  return (
    <Toast
      config={{
        success: ({ text1, text2, props }) => (
          <BaseToast
            text1={text1}
            text2=""
            {...props}
            style={{
              backgroundColor: MD2Colors.green500,
              borderLeftColor: MD2Colors.green300,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontSize: 15,
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            }}
          />
        ),
        updatedcart: ({ text1, text2, onPress, hide, show, props }) => {
          return (
            <View style={{ margin: 15 }}>
              <Card theme={MD2LightTheme}>
                <Card.Title
                  title={text1}
                  subtitle={text2}
                  left={(props) => (
                    <Avatar.Icon
                      size={20}
                      {...props}
                      style={{ backgroundColor: $defaultColor }}
                      icon="check"
                    />
                  )}
                />

                <Card.Actions>
                  <PrimaryButton
                    title={"Continuer vos achats"}
                    onEventHandler={() => {
                      props.cart();
                      hide();
                    }}
                  />

                  <DefaultButton
                    onEventHandler={() => {
                      props.home();
                      hide();
                    }}
                    title="Panier"
                  />
                </Card.Actions>
              </Card>
            </View>
          );
        },
      }}
    />
  );
};
