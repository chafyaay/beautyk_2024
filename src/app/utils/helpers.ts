import { MD2Colors } from "react-native-paper";

export const getOrderStatusUi = (status: any, data?: any[]) => {
  let icon = "";
  let color = { text: "", bg: "" };

  switch (status) {
    case "on-hold":
      icon = "clock-time-four-outline";
      color.bg = MD2Colors.orange100;
      color.text = MD2Colors.orange700;
      break;
    case "processing":
      icon = "progress-clock";
      color.bg = MD2Colors.lightBlue100;
      color.text = MD2Colors.blue600;
      break;
    case "pending":
      icon = "update";
      color.bg = MD2Colors.orange100;
      color.text = MD2Colors.orange700;
      break;
    case "completed":
      icon = "check-circle-outline";
      color.bg = MD2Colors.lightGreen100;
      color.text = MD2Colors.greenA700;
      break;
    case "cancelled":
      icon = "close-octagon-outline";
      color.bg = MD2Colors.red100;
      color.text = MD2Colors.red700;
      break;
    case "refunded":
      icon = "cash-check";
      color.bg = MD2Colors.indigo100;
      color.text = MD2Colors.indigo700;
      break;
    case "failed":
      icon = "close-circle-outline";
      color.bg = MD2Colors.red100;
      color.text = MD2Colors.red700;
      break;
    case "checkout-draft":
      icon = "close-octagon-outline";
      color.bg = MD2Colors.red100;
      color.text = MD2Colors.red700;
      break;
    default:
      icon = "<></>";
  }

  return { icon, color };
};
