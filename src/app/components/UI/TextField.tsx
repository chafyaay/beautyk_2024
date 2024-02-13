import { IconButton, MD2Colors, Text, TextInput } from "react-native-paper";
import { BG_COLOR, TEXT_COLOR } from "../../utils/device";

import {
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  useFonts,
} from "@expo-google-fonts/raleway";
import { TextHolder } from "./TextHolder";
import { useState } from "react";
import { View } from "react-native";
import Spacer from "./Spacer";
import { Typography } from "./Typography";

type TextFieldProps = {
  value: string;
  label: string;
  touched?: boolean;
  hidden?: boolean;
  multiline?: boolean;
  error?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  handleChange: (e: string) => void;
  handleBlur?: (e) => void;
  onFocus?: (e) => void;
};

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  secureTextEntry,
  touched,
  error,
  multiline,
  hidden,
  disabled,
  handleChange,
  handleBlur,
  onFocus,
}) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../../../../assets/fonts/BebasNeue-Regular.ttf"),
    "Cairo-Light": require("../../../../assets/fonts/Cairo-Light.ttf"),
    "Cairo-Medium": require("../../../../assets/fonts/Cairo-Medium.ttf"),
    "Cairo-Regular": require("../../../../assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("../../../../assets/fonts/Cairo-SemiBold.ttf"),
    "Cairo-Bold": require("../../../../assets/fonts/Cairo-Bold.ttf"),
    "NotoSerif-Regular": require("../../../../assets/fonts/NotoSerif-Regular.ttf"),
    "IBMPlexSerif-Regular": require("../../../../assets/fonts/IBMPlexSerif-Regular.ttf"),
    "IBMPlexSerif-Italic": require("../../../../assets/fonts/IBMPlexSerif-Italic.ttf"),
  });

  return (
    <>
      {!!fontsLoaded && (
        <View>
          <TextInput
            value={value}
            dense
            mode="outlined"
            label={label}
            onChangeText={handleChange}
            onBlur={handleBlur}
            multiline={multiline}
            secureTextEntry={hidePassword}
            textColor={MD2Colors.black}
            placeholderTextColor={MD2Colors.black}
            disabled={hidden}
            onFocus={onFocus}
            outlineColor={
              touched && error ? MD2Colors.redA400 : MD2Colors.black
            }
            activeOutlineColor={
              touched && error ? MD2Colors.redA400 : MD2Colors.black
            }
            style={{
              color: MD2Colors.redA400,
              height: multiline ? 80 : "auto",
              position: hidden ? "absolute" : "relative",
              zIndex: hidden ? 0 : 1,
              opacity: hidden ? 0 : 1,
              marginBottom: 10,
            }}
            contentStyle={{
              fontFamily: multiline ? "IBMPlexSerif-Italic" : "Cairo-Regular",
              fontSize: 13,
              color: MD2Colors.grey900,
            }}
          />

          {secureTextEntry && (
            <IconButton
              onPress={() => {
                setHidePassword((e) => !e);
              }}
              size={25}
              icon={!hidePassword ? "eye-off-outline" : "eye-outline"}
              style={{ position: "absolute", right: 0 }}
            />
          )}

          {touched && error && (
            <Typography
              fontWeight="Light"
              children={error}
              color={MD2Colors.redA400}
            />
          )}
        </View>
      )}
    </>
  );
};
