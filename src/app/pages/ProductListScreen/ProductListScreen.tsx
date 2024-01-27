import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { MD2Colors, Text } from "react-native-paper";
import { TEXT_COLOR } from "../../utils/device";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { PrimaryButton } from "../../components/UI/Buttons";
import { ProductList } from "../../components/Product/ProdcutList";
import {
  GET_CATEGORY,
  GET_PRODUCTS_BY_PRODUCTS_PER_PAGE,
} from "../../utils/api-calls";
import { useQueries, useQuery } from "react-query";

export default function ProductListScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productPerPage, setProductPerPage] = useState(0);
  const [total_products, setTotal_products] = useState(0);
  const [total_pages, setTotal_pages] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const itemsPerPage = 3;

  const { cart } = useSelector((state: any) => state);
  const { description, id } = route.params;
  const cartCount = cart?.items?.reduce((a, b) => (a += b.quantity), 0);

  const { data, isLoading: _isLoading } = useQuery(
    "get product count by category",
    async () => await GET_CATEGORY(id)
  );

  const loadhandler = () => {
    setIsLoading(true);
    if (total_pages !== nextPage) {
      setNextPage((p) => p + 1);
    }
  };

  useEffect(() => {
    if (!_isLoading) {
      setTotal_products(data?.data?.count);
    }
  }, [_isLoading]);

  useEffect(() => {
    if (!_isLoading) {
      const p = !!(total_products % itemsPerPage)
        ? Math.floor(total_products / itemsPerPage) + 1
        : total_products / itemsPerPage;

      setTotal_pages(p);
    }
  }, [total_products]);

  useEffect(() => {
    if (total_pages !== nextPage) setProductPerPage(itemsPerPage * nextPage);
    else {
      setProductPerPage(total_products % itemsPerPage);
    }
  }, [nextPage]);

  useEffect(() => {
    if (!!productPerPage) {
      GET_PRODUCTS_BY_PRODUCTS_PER_PAGE(id, productPerPage, 1).then(
        (response) => {
          setIsLoading(false);
          console.log("response?.data.length", response?.data.length);

          const _products = response?.data.slice(
            Math.max(response?.data.length - 3, 0)
          );

          setProducts(products.concat(_products));
        }
      );
    }
  }, [productPerPage]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header search showCart={false} title={""} navigation={navigation} />
      <ScrollView>
        <View style={{ paddingBottom: 100 }}>
          <Text
            style={{
              marginLeft: 15,
              marginRight: 15,
              color: TEXT_COLOR.primary,
            }}
            variant="titleMedium"
          >
            {description}
          </Text>
          <View style={{ flex: 1, padding: 15, paddingTop: 0 }}>
            {!!products.length && (
              <ProductList
                navigation={navigation}
                products={products}
                titleContent={" "}
              />
            )}
          </View>

          <View style={{ padding: 10, paddingLeft: 50, paddingRight: 50 }}>
            <PrimaryButton
              isLoading={isLoading}
              disabled={products.length >= total_products || isLoading}
              onEventHandler={loadhandler}
              title={"Afficher tous les produits"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderColor: MD2Colors.indigo100,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5,
    width: "100%",
    height: 100,
    backgroundColor: "white",
  },
  cover: {
    width: "33%",
    height: 70,
    marginRight: "3%",
    borderRightColor: MD2Colors.indigo100,
    borderRightWidth: 1,
  },
  codePromo: {},
});
