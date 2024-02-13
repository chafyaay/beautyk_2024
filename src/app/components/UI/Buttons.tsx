import {
  ActivityIndicator,
  Button,
  Icon,
  MD2Colors,
  Text,
} from "react-native-paper";
import { Children } from "react";
import { useFonts } from "@expo-google-fonts/raleway/useFonts";
import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import { Typography } from "./Typography";

export const PressableButton: React.FC<{
  children: any;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  fullwidth?: boolean;
  type?:
    | "primary"
    | "default"
    | "outlined"
    | "disabled"
    | "whatsapp"
    | "Link"
    | "menu";
  size?: number;
  fontWeight?: "Light" | "Medium" | "Regular" | "SemiBold" | "Bold";
  icon?: string;
  align?: "center" | "flex-start" | "flex-end";
  style?: any;
}> = ({
  children,
  onPress,
  type,
  size,
  fontWeight,
  disabled,
  isLoading,
  fullwidth,
  icon,
  align,
  style,
}) => {
  const getTextColor = () => {
    switch (type) {
      case "disabled":
        return MD2Colors.grey700;
      case "primary":
      case "whatsapp":
        return MD2Colors.white;
      default:
        return MD2Colors.black;
    }
  };

  return (
    <Pressable
      style={[
        styles[type],
        {
          justifyContent: align,
          ...style,
        },
      ]}
      onPress={onPress}
    >
      {Children.map(children, (child) => (
        <>
          {!!icon && (
            <Icon
              allowFontScaling
              color={getTextColor()}
              source={icon}
              size={24}
            />
          )}
          <Typography
            align="center"
            fontWeight={fontWeight}
            color={getTextColor()}
            size={size}
          >
            {child}
          </Typography>
          {!!isLoading && (
            <ActivityIndicator
              size={20}
              style={{ position: "absolute", right: 10 }}
              color={getTextColor()}
            />
          )}
        </>
      ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 10,
  },
  Link: {
    borderRadius: 4,
    backgroundColor: MD2Colors.grey100,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  outlined: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    borderWidth: 2,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 4,
  },
  default: {
    backgroundColor: MD2Colors.yellowA700,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  disabled: {
    backgroundColor: MD2Colors.grey200,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },

  whatsapp: {
    borderRadius: 4,
    backgroundColor: MD2Colors.green500,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowRadius: 60,
    overflow: "hidden",
  },
});
