import { useFonts } from "@expo-google-fonts/raleway";
import React from "react";
import { Children } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

export const fontsStyles = (style: any) =>
  StyleSheet.create({
    body1: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 18,
      ...style,
      letterSpacing: 0.16,
      fontFamily: "Gotham-Book",
    },
    body2: {
      fontSize: 14,
      fontWeight: "200",
      lineHeight: 20,
      style,
      letterSpacing: 0.16,
      fontFamily: "Gotham-Book",
    },
    body3: {
      fontSize: 18,
      fontWeight: "200",
      lineHeight: 24,
      style,
      letterSpacing: 0.16,
      fontFamily: "Gotham-Book",
    },
    cta: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 32,
      fontFamily: "Gotham-Book",
      ...style,
    },
    heading1: {
      fontFamily: "Gotham-Bold",
      fontSize: 32,
      lineHeight: 48,
      ...style,
    },
    heading2: {
      fontFamily: "Gotham-Bold",
      fontSize: 28,
      lineHeight: 72,
      ...style,
    },
    heading3: {
      fontFamily: "Gotham-Bold",
      fontSize: 24,
      lineHeight: 48,
      ...style,
    },
    heading4: {
      fontFamily: "Gotham-Bold",
      fontSize: 18,
      lineHeight: 20,
      ...style,
    },
    price: {
      fontFamily: "Oswald-Medium",
      fontSize: 18,
      lineHeight: 20,
      ...style,
    },
    cell: {
      fontFamily: "Cairo-Regular",
      fontSize: 14,
      lineHeight: 24,
      ...style,
    },
  });

export const Typography: React.FC<{
  children: any;
  style?: StyleProp<TextStyle>;
  variant?:
    | "body1"
    | "body2"
    | "body3"
    | "cta"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "price";
  nbrLines?: number;
}> = ({ variant, children, style, nbrLines }) => {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../../assets/fonts/BebasNeue-Regular.ttf"),
    "Cairo-Light": require("../../assets/fonts/Cairo-Light.ttf"),
    "Cairo-Medium": require("../../assets/fonts/Cairo-Medium.ttf"),
    "Cairo-Regular": require("../../assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("../../assets/fonts/Cairo-SemiBold.ttf"),
    "Cairo-Bold": require("../../assets/fonts/Cairo-Bold.ttf"),
    "NotoSerif-Regular": require("../../assets/fonts/NotoSerif-Regular.ttf"),
    "IBMPlexSerif-Regular": require("../../assets/fonts/IBMPlexSerif-Regular.ttf"),
    "IBMPlexSerif-Italic": require("../../assets/fonts/IBMPlexSerif-Italic.ttf"),
    "Gotham-Black": require("../../assets/fonts/Gotham-Black.otf"),
    "Gotham-BlackItalic": require("../../assets/fonts/Gotham-BlackItalic.otf"),
    "Gotham-Bold": require("../../assets/fonts/Gotham-Bold.otf"),
    "Gotham-BoldItalic": require("../../assets/fonts/Gotham-BoldItalic.otf"),
    "Gotham-Book": require("../../assets/fonts/Gotham-Book.otf"),
    "Gotham-BookItalic": require("../../assets/fonts/Gotham-BookItalic.otf"),
    "Gotham-Light": require("../../assets/fonts/Gotham-Light.otf"),
    "Gotham-LightItalic": require("../../assets/fonts/Gotham-LightItalic.otf"),
    "Gotham-Medium": require("../../assets/fonts/Gotham-Medium.otf"),
    "Gotham-MediumItalic": require("../../assets/fonts/Gotham-MediumItalic.otf"),
    "Gotham-Thin": require("../../assets/fonts/Gotham-Thin.otf"),
    "Gotham-ThinItalic": require("../../assets/fonts/Gotham-ThinItalic.otf"),
    "Gotham-Ultra": require("../../assets/fonts/Gotham-Ultra.otf"),
    "Gotham-UltraItalic": require("../../assets/fonts/Gotham-UltraItalic.otf"),
    "Gotham-XLight": require("../../assets/fonts/Gotham-XLight.otf"),
    "Gotham-XLightItalic": require("../../assets/fonts/Gotham-XLightItalic.otf"),
    "Oswald-Medium": require("../../assets/fonts/Oswald-Medium.ttf"),
  });
  return (
    <>
      {Children.map(children, (child) => (
        <Text numberOfLines={nbrLines} style={fontsStyles(style)[variant]}>
          {child}
        </Text>
      ))}
    </>
  );
};
