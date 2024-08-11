import { View } from "react-native";
import { Typography } from "../../Theme/Typography";
import { Text } from "react-native-paper";
import { colors } from "../../Theme/colors";

function ProductPrice(props) {
  const { price, regular_price, sale_price } = props;

  if (sale_price)
    return (
      <>
        <Typography variant="price">{price + " Dh"}</Typography>
        <Typography
          style={{
            textDecorationLine: "line-through",
            color: colors.text["$text-helper"],
            fontSize: 14,
          }}
          variant="price"
        >
          {regular_price + " Dh"}
        </Typography>
      </>
    );

  return <Typography variant="price">{price + " Dh"}</Typography>;
}

export default ProductPrice;
