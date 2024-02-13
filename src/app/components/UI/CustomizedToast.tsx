import { ScrollView, View } from "react-native";
import { MD2Colors, Avatar } from "react-native-paper";
import Toast from "react-native-toast-message";

import { PressableButton } from "./Buttons";
import { deviceWidth, TEXT_COLOR } from "../../utils/device";
import RenderHTML from "react-native-render-html";
import { Typography } from "./Typography";

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
                borderRadius: 8,
                borderColor: MD2Colors.deepOrange500,
                backgroundColor: MD2Colors.deepOrange100,
              }}
            >
              <RenderHTML
                source={{
                  html: `<p style="color:${TEXT_COLOR.error}" >${props.msg}</p>`,
                }}
              />
            </View>
          );
        },

        success: ({ text1, text2, props }) => (
          <View
            style={{
              padding: 10,
              margin: 0,
              width: deviceWidth - 20,
              borderRadius: 8,
              borderColor: MD2Colors.green100,
              backgroundColor: MD2Colors.green400,
            }}
          >
            <Typography
              fontWeight="SemiBold"
              align="center"
              color={MD2Colors.white}
              children={props?.msg?.replace(/<[^>]*>?/gm, "")}
            />
          </View>
        ),
        updatedcart: ({ text1, text2, onPress, hide, show, props }) => {
          return (
            <View
              style={{
                width: deviceWidth - 20,
                borderWidth: 3,
                borderRadius: 8,
                borderColor: MD2Colors.green500,
                backgroundColor: "white",
                justifyContent: "space-between",
                padding: 10,
                alignItems: "center",
              }}
            >
              <Avatar.Icon
                size={40}
                {...props}
                style={{ backgroundColor: MD2Colors.green500 }}
                icon="check"
              />
              <Typography fontWeight="Bold" children={text1} />
              <Typography fontWeight="Medium" children={text2} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  columnGap: 10,
                }}
              >
                <PressableButton
                  fontWeight="Bold"
                  children={"Continuer vos achats"}
                  onPress={() => {
                    hide();
                  }}
                  disabled={undefined}
                  type={"primary"}
                  fullwidth
                />

                <PressableButton
                  fontWeight="Bold"
                  onPress={() => {
                    props.cart();
                    hide();
                  }}
                  children="Panier"
                  type="default"
                  fullwidth
                />
              </View>
            </View>
          );
        },
      }}
    />
  );
};
