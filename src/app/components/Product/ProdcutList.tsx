import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors, Portal, Text } from "react-native-paper";
import { ProductProps } from "../../utils/models";
import ProductCard from "./ProductCard/ProductCard";
import { deviceHeight, deviceWidth } from "../../utils/device";

import ProductFilter from "./ProductFilter";
import { get_products_by_params } from "../../utils/api-calls";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../AppHeader/AppHeader";

interface ProductListProps {
  showFilterBar?: boolean;
  params?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  showFilterBar,
  params,
}) => {
  const [cardView, setCardView] = useState<"GRID" | "LIST">();
  const [orderByIndex, set_OrderByIndex] = useState({});
  const [products, setProducts] = useState<ProductProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");

  const navigation = useNavigation();

  const getProductsData = (params: string) => {
    setIsLoading(true);
    get_products_by_params(params)
      .then((res) => {
        setProducts(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setSearchParams(params);
  }, [params]);

  useEffect(() => {
    if (!!searchParams) getProductsData(searchParams);
  }, [searchParams]);

  useEffect(() => {
    let newParams = params;
    switch (orderByIndex) {
      case 1:
        newParams += `&on_sale=true`;
        break;
      case 2:
        newParams += `&orderby=date`;
        break;
      case 3:
        newParams += `&orderby=price&order=asc`;
        break;
      case 4:
        newParams += `&orderby=price&order=desc`;
        break;
      case 5:
        newParams += `&orderby=title&order=asc`;
        break;
      default:
        newParams += ``;
        break;
    }
    setSearchParams(newParams);
  }, [orderByIndex]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={styles.container}>
        {!isLoading ? (
          <>
            {showFilterBar && (
              <ProductFilter
                setOrderByIndex={set_OrderByIndex}
                setCardView={setCardView}
              />
            )}

            {products?.length === 0 && <Text>Pas de produits</Text>}

            {products?.map((product) => (
              <View
                style={{
                  width: cardView === "GRID" ? deviceWidth / 2 - 20 : "100%",
                }}
              >
                <ProductCard
                  key={product.id}
                  navigation={navigation}
                  product={product}
                  showAddTocart={true}
                  showTitle={true}
                  cardView={cardView}
                />
              </View>
            ))}
          </>
        ) : (
          <Portal>
            <View
              style={{
                height: deviceHeight,
                width: deviceWidth,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.75)",
              }}
            >
              <ActivityIndicator size={30} color={MD2Colors.black} />
            </View>
          </Portal>
        )}
      </View>
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
