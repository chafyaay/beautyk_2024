import { StyleSheet, View } from "react-native";
import { TEXT_COLOR } from "../../../utils/device";
import { Typography } from "../../UI/Typography";
import DataIndex from "../../../utils/DataIndex";
import { MD2Colors } from "react-native-paper";

export const PriceText = ({ sale_price, price, cardView, regular_price }) => {
  let newPrice = (!!sale_price ? sale_price : price) as string;
  return (
    <View
      style={{
        flexDirection: cardView === "LIST" ? "row" : "column",
        columnGap: 10,
      }}
    >
      <Typography
        fontWeight="Bold"
        size={20}
        style={{ fontFamily: "BebasNeue" }}
      >
        {newPrice + " " + DataIndex.currency}
      </Typography>

      {sale_price && (
        <Typography fontWeight="Bold" size={16} style={styles.sale_price}>
          {regular_price + " " + DataIndex.currency}
        </Typography>
      )}
    </View>
  );
};

export const SaleText = ({ regular_price, sale_price }) => {
  const salevalue = Math.round(
    ((Number(regular_price) - Number(sale_price)) * 100) / Number(regular_price)
  );
  if (!!sale_price)
    return (
      <Typography style={styles.sale} size={13} fontWeight="Bold">
        {salevalue + "%"}
      </Typography>
    );
};

export const InStockText = ({ stock_status }) => {
  if (!!stock_status)
    return (
      <Typography
        style={{
          ...styles.instock,
          backgroundColor:
            stock_status !== "instock" ? MD2Colors.red500 : "black",
        }}
        size={10}
        fontWeight="Bold"
      >
        {stock_status === "instock" ? "En Stock" : "Epuisé"}
      </Typography>
    );
};

const styles = StyleSheet.create({
  instock: {
    position: "absolute",
    borderRadius: 5,
    overflow: "hidden",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: "uppercase",
    right: 0,
    zIndex: 9,
  },
  sale: {
    position: "absolute",
    backgroundColor: MD2Colors.yellow700,
    borderRadius: 5,
    overflow: "hidden",
    color: MD2Colors.black,
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: "uppercase",
    zIndex: 9,
  },
  regular_price: {
    position: "absolute",
    color: TEXT_COLOR.primary,
    textDecorationLine: "line-through",
    textDecorationColor: TEXT_COLOR.body,
    fontFamily: "BebasNeue",
  },
  sale_price: {
    textDecorationLine: "line-through",
    fontFamily: "BebasNeue",
    opacity: 0.4,
  },
});
