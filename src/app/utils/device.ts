import { Dimensions } from "react-native";
import { MD2Colors } from "react-native-paper";

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export const BG_DARK_COLOR = {
  primary: MD2Colors.indigo500,
  default: MD2Colors.greenA400,
  error: MD2Colors.red500,
  a_error: MD2Colors.redA400,
  disabled: MD2Colors.grey500,
};

export const BG_LIGHT_COLOR = {
  primary: MD2Colors.indigo100,
  default: MD2Colors.greenA100,
  error: MD2Colors.red100,
  a_error: MD2Colors.redA100,
  disabled: MD2Colors.grey100,
};

export const TEXT_COLOR = {
  primary: MD2Colors.indigo500,
  default: MD2Colors.green500,
  error: MD2Colors.red500,
  a_error: MD2Colors.redA700,
  disabled: MD2Colors.grey500,
  title: MD2Colors.indigo500,
  body: MD2Colors.indigo800,
};
