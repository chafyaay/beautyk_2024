import { useRoute } from "@react-navigation/native";
import { ProductList } from "../../components/Product/ProdcutList";

const SearchProductsScreen = () => {
  const { params } = useRoute() as any;

  return (
    <ProductList
      showFilterBar
      apiParams={`products/search=${params.searchQuery}/`}
    />
  );
};

export default SearchProductsScreen;
