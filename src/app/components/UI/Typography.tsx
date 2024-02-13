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

  return (
    <>
      {fontsLoaded && (
        <>
          {Children.map(children, (child) => (
            <Text
              variant={variant}
              numberOfLines={numberOfLines}
              style={{
                fontFamily:
                  variant === "bodyMedium"
                    ? "IBMPlexSerif-Italic"
                    : `Cairo-${fontWeight}`,
                fontWeight: "100",
                fontSize: size,
                textAlign: align,
                color: color,
                backgroundColor: type ? MD2Colors.yellow600 : "",
                overflow: type ? "hidden" : "",
                paddingLeft: type ? 5 : 0,
                paddingRight: type ? 5 : 0,
                borderRadius: 3,
                ...style,
              }}
            >
              {child}
            </Text>
          ))}
        </>
      )}
    </>
  );
};
