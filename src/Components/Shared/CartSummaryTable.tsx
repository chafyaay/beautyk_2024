import { DataTable } from "react-native-paper";
import { fontsStyles } from "../../Theme/Typography";
import { useSelector } from "react-redux";
import { cartSelector } from "../../utils/store/selectors";

const textStyle = fontsStyles({}).cell;

function CartSummaryTable() {
  const cart = useSelector(cartSelector);
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);
  const subTotal = cart?.items?.reduce(
    (a, b) => (a += b.quantity * b.product.price),
    0
  );

  console.log(cart);

  return (
    <DataTable
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 30,
      }}
    >
      <DataTable.Row>
        <DataTable.Title textStyle={textStyle}>Total Produits</DataTable.Title>
        <DataTable.Title textStyle={textStyle} numeric>
          {cartCount}
        </DataTable.Title>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Title textStyle={textStyle}>Sous-Total (Dh)</DataTable.Title>
        <DataTable.Title textStyle={textStyle} numeric>
          {subTotal}{" "}
        </DataTable.Title>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Title textStyle={textStyle}>Sous-Total (Dh)</DataTable.Title>
        <DataTable.Title textStyle={textStyle} numeric>
          {subTotal}{" "}
        </DataTable.Title>
      </DataTable.Row>
    </DataTable>
  );
}

export default CartSummaryTable;
