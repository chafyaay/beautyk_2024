import { MD2Colors, Text } from "react-native-paper";
import { Children } from "react";
import { useFonts } from "@expo-google-fonts/raleway/useFonts";
import { StyleProp, StyleSheet } from "react-native";

export const Typography: React.FC<{
  children: any;
  align?: "left" | "right" | "center";
  size?: number;
  color?: any;
  fontWeight?: "Light" | "Medium" | "Regular" | "SemiBold" | "Bold";
  style?: any;
  numberOfLines?: number;
  variant?: "headlineMedium" | "bodyMedium" | "titleMedium" | "bodyMedium";
  type?: "default" | "primary";
  textTrasform?: "uppercase" | "capitalize" | "lowercase";
}> = ({
  children,
  size,
  align,
  fontWeight,
  style,
  numberOfLines,
  variant,
  color,
  type,
  textTrasform,
}) => {
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

  const fw = fontWeight || "Light";

  const styles = StyleSheet.create({
    style: {
      fontFamily:
        variant === "bodyMedium" ? "IBMPlexSerif-Italic" : `Cairo-${fw}`,
      fontWeight: "100",
      fontSize: size,
      textAlign: align,
      // backgroundColor: type ? MD2Colors.yellow600 : "",
      overflow: type ? "hidden" : "visible",
      paddingLeft: type ? 5 : 0,
      paddingRight: type ? 5 : 0,
      borderRadius: 3,
      textTransform: textTrasform,
      lineHeight: !!size ? size + 5 : size,
      paddingTop: size ? size / 2 : size,
    },
  });

  return (
    <>
      {fontsLoaded && (
        <>
          {Children.map(children, (child) => (
            <Text
              variant={variant}
              numberOfLines={numberOfLines}
              style={[
                styles.style,
                !!style ? style : {},
                !!color ? { color: color } : {},
              ]}
            >
              {child}
            </Text>
          ))}
        </>
      )}
    </>
  );
};
