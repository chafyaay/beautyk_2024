import { View } from "react-native";
import {
  Button,
  MD2Colors,
  MD2LightTheme,
  Avatar,
  Card,
  Divider,
} from "react-native-paper";
import Toast, { BaseToast } from "react-native-toast-message";
import { DefaultButton, PrimaryButton } from "./Buttons";
import {
  BG_DARK_COLOR,
  BG_LIGHT_COLOR,
  TEXT_COLOR,
  deviceWidth,
} from "../../utils/device";

export const CustomizedToast = () => {
  return (
    <Toast
      config={{
        error: ({ text1, text2, props }) => {
          return (
            <View
              style={{
                padding: 10,
                margin: 0,
                width: deviceWidth - 20,
                borderWidth: 3,
                borderRadius: 8,
                borderColor: BG_LIGHT_COLOR.a_error,
              }}
            >
              <Card.Title
                titleStyle={{ textAlign: "center", color: TEXT_COLOR.a_error }}
                subtitleStyle={{ textAlign: "center", color: TEXT_COLOR.error }}
                title={text1}
                subtitle={text2}
                left={() => (
                  <Avatar.Icon
                    size={36}
                    {...props}
                    style={{ backgroundColor: BG_LIGHT_COLOR.a_error }}
                    icon="alert"
                  />
                )}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></View>
            </View>
          );
        },
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
            <View
              style={{
                padding: 0,
                margin: 0,
                width: deviceWidth,
                borderWidth: 3,
                borderRadius: 8,
                borderColor: BG_DARK_COLOR.default,
              }}
            >
              <Card theme={MD2LightTheme}>
                <Avatar.Icon
                  size={20}
                  {...props}
                  style={{ backgroundColor: BG_DARK_COLOR.default }}
                  icon="check"
                />
                <Card.Title
                  titleStyle={{ textAlign: "center" }}
                  subtitleStyle={{ textAlign: "center" }}
                  title={text1}
                  subtitle={text2}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <DefaultButton
                    title={"Continuer vos achats"}
                    onEventHandler={() => {
                      props.cart();
                      hide();
                    }}
                  />

                  <PrimaryButton
                    onEventHandler={() => {
                      props.home();
                      hide();
                    }}
                    title="Panier"
                  />
                </View>
              </Card>
            </View>
          );
        },
      }}
    />
  );
};
