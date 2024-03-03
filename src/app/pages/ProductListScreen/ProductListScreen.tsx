import { ProductList } from "../../components/Product/ProdcutList";
import { useRoute } from "@react-navigation/native";

export default function ProductListScreen() {
  const route = useRoute() as any;
  const { id } = route.params;

  return <ProductList showFilterBar apiParams={`products/category=${id}/`} />;
}
