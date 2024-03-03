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
  fontWeight?: "Light" | "Medium" | "Regular" | "SemiBold" | "Bold";
  icon?: string;
  rightIcon?: string;
  align?: "center" | "flex-start" | "flex-end";
  style?: any;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "larg";
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
  iconPosition,
  rightIcon,
}) => {
  const _styles = styles as any;
  let color = !!_styles[disabled ? "disabled" : type]?.color
    ? _styles[disabled ? "disabled" : type]?.color
    : MD2Colors.black;

  const getSize = () => {
    let text = {},
      btn = {};
    switch (size) {
      case "small":
        btn = { height: 33, paddingTop: 3 };
        text = { fontSize: 12 };
        break;
      case "medium":
        btn = { height: 30 };
        text = { fontSize: 9, lineHight: 10 };
        break;
      case "larg":
        btn = { height: 60 };
        text = { fontSize: 9, lineHight: 10 };
        break;
      default:
        btn = {};
        text = 0;
        break;
    }
    return { text, btn };
  };

  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
          maxHeight: 50,
        },
        disabled ? styles["disabled"] : styles[type],
        getSize().btn,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {Children.map(children, (child) => (
        <>
          {!!icon && (
            <Icon allowFontScaling color={color} source={icon} size={24} />
          )}
          <Typography
            align="center"
            fontWeight={fontWeight}
            color={color}
            style={getSize().text}
          >
            {child}
          </Typography>
        </>
      ))}
      {!!isLoading && (
        <ActivityIndicator
          size={16}
          style={{ position: "absolute", right: 10 }}
          color={color}
        />
      )}
      {!!rightIcon && <Icon color={color} size={25} source={rightIcon} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 10,
    color: MD2Colors.white,
  },
  Link: {
    borderRadius: 4,
    backgroundColor: MD2Colors.grey100,
    padding: 10,
    paddingLeft: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    color: MD2Colors.blueA700,
  },
  outlined: {
    borderWidth: 2,
    borderColor: MD2Colors.grey900,
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    borderWidth: 2,
    backgroundColor: MD2Colors.grey900,
    padding: 10,
    borderRadius: 4,
    color: MD2Colors.white,
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
  },
  disabled: {
    backgroundColor: MD2Colors.grey200,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    color: MD2Colors.grey400,
  },

  whatsapp: {
    borderRadius: 4,
    backgroundColor: MD2Colors.green500,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 60,
    overflow: "hidden",
    color: MD2Colors.white,
  },
});
