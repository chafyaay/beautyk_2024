import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { MD2Colors, Text } from "react-native-paper";
import { ProductProps } from "../../utils/models";
import ProductCard from "./ProductCard/ProductCard";
import { deviceWidth } from "../../utils/device";

import ProductFilter from "./ProductFilter";
import { get_products_by_params } from "../../utils/api-calls";
import { Typography } from "../UI/Typography";
import Spacer from "../UI/Spacer";
import { PressableButton } from "../UI/Buttons";
import { useSelector } from "react-redux";
import { productSelector } from "../../utils/store/selectors";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

interface ProductListProps {
  apiParams: string;
  showFilterBar?: boolean;
}

const addBy = 10;

export const ProductList: React.FC<ProductListProps> = ({
  showFilterBar,
  apiParams,
}) => {
  const [cardView, setCardView] = useState<"GRID" | "LIST">();
  const [orderByIndex, set_OrderByIndex] = useState({});
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [count, setcount] = useState(1);
  const [perPage, setPerPage] = useState(addBy);

  const { totalProducst } = useSelector(productSelector);

  const getProductsData = (params: string) => {
    setIsLoading(true);
    get_products_by_params(params)
      .then((res) => {
        setProducts(res?.data);
        setIsLoading(false);
        Toast.hide();
      })
      .catch((error) => {});
  };

  const onLoadMoreProducts = () => {
    setcount((e) => e + 1);
  };

  useEffect(() => {
    setSearchParams(apiParams);
  }, [apiParams]);

  useEffect(() => {
    const params = `${searchParams}/per_page=${perPage}&page=1`
      .split("/")
      .filter((item) => item);

    const fullUrl = `${params[0]}?${
      params.length > 1 ? params.slice(1).join("&") : ""
    }`;

    if (!!searchParams) getProductsData(fullUrl);
  }, [searchParams, perPage]);

  useEffect(() => {
    let newParams = apiParams;
    switch (orderByIndex) {
      case 1:
        newParams += `/on_sale=true`;
        break;
      case 2:
        newParams += `/orderby=date`;
        break;
      case 3:
        newParams += `/orderby=price&order=asc`;
        break;
      case 4:
        newParams += `/orderby=price&order=desc`;
        break;
      case 5:
        newParams += `/orderby=title&order=asc`;
        break;
      default:
        newParams += ``;
        break;
    }
    setSearchParams(newParams);
  }, [orderByIndex]);

  useEffect(() => {
    const currentItems = addBy * count;
    if (totalProducst - perPage <= addBy) {
      setPerPage(totalProducst);
    } else {
      setPerPage(currentItems);
    }
  }, [count]);

  return (
    <ScrollView style={{ padding: 10 }}>
      {/*   <Text>
        <Typography fontWeight="Bold" size={18}>
          {products?.length}{" "}
        </Typography>
        <Typography color={MD2Colors.grey400} fontWeight="Medium" size={18}>
          résultat pour{" "}
        </Typography>
        <Typography fontWeight="Bold" size={18}>
          {searchParams.split("search=")[1]}
        </Typography>
      </Text> */}

      <View style={styles.container}>
        {showFilterBar && (
          <ProductFilter
            setOrderByIndex={set_OrderByIndex}
            setCardView={setCardView}
          />
        )}

        {products?.length === 0 && <Text>Pas de produits</Text>}

        {products?.map((product, index) => (
          <View
            key={product.id}
            style={{
              width: cardView === "GRID" ? deviceWidth / 2 - 20 : "100%",
            }}
          >
            <ProductCard
              key={product.id}
              product={product}
              showAddTocart={true}
              showTitle={true}
              cardView={cardView}
            />
          </View>
        ))}
      </View>

      <Spacer size={20} />

      <PressableButton
        onPress={onLoadMoreProducts}
        type={totalProducst === perPage ? "disabled" : "primary"}
        fontWeight="Bold"
        children="Afficher d'autre elements "
        disabled={totalProducst === perPage}
        isLoading={isLoading}
      />
      <Spacer size={100} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 15,
  },
});
