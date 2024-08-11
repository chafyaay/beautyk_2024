import { MD2Colors } from "react-native-paper";

export const getOrderStatusUi = (status: any, data?: any[]) => {
  let icon = "";
  let color = { text: "", bg: "" };

  switch (status) {
    case "on-hold":
      icon = "clock-time-four-outline";
      color.bg = MD2Colors.orange500;
      color.text = MD2Colors.orange900;
      break;
    case "processing":
      icon = "progress-clock";
      color.bg = MD2Colors.lightBlue500;
      color.text = MD2Colors.blue600;
      break;
    case "pending":
      icon = "update";
      color.bg = MD2Colors.orange500;
      color.text = MD2Colors.orange900;
      break;
    case "completed":
      icon = "check-circle-outline";
      color.bg = MD2Colors.lightGreen500;
      color.text = MD2Colors.green900;
      break;
    case "cancelled":
      icon = "close-octagon-outline";
      color.bg = MD2Colors.red500;
      color.text = MD2Colors.red900;
      break;
    case "refunded":
      icon = "cash-check";
      color.bg = MD2Colors.indigo500;
      color.text = MD2Colors.indigo900;
      break;
    case "failed":
      icon = "close-circle-outline";
      color.bg = MD2Colors.red500;
      color.text = MD2Colors.red900;
      break;
    case "checkout-draft":
      icon = "close-octagon-outline";
      color.bg = MD2Colors.red500;
      color.text = MD2Colors.red900;
      break;
    default:
      icon = "<></>";
  }

  return { icon, color };
};

export const getCustomerShippingLabel = (input: string) => {
  const labels = {
    email: "Email",
    first_name: "Prénom",
    last_name: "Nom",
    username: "Nom d'utulisateur ",
    phone: "Numéro de Téléphone",
    address_1: "Adress 1",
    address_2: "Adress 2",
    city: "Ville",
    state: "Région",
    postcode: "Code postale",
  };
  if (!!input) return labels[input];
  return "";
};
