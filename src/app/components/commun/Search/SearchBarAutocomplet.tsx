/* ---------- */
/* ---------- */
/* ---------- */
/* ---------- */
/* ---------- */
/* ---------- */
/* ---------- */
/* ---------- */

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Text, View, Platform } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";
import { Button, MD2Colors } from "react-native-paper";
import { deviceWidth } from "../../../utils/device";
import { GET_PRODUCTS, GET_PRODUCTS_TOTAL } from "../../../utils/api-calls";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { ProductProps } from "../../../utils/models";

export const SearchBarAutocomplet = memo(() => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [products, setProducts] = useState<ProductProps[]>();

  const dropdownController = useRef(null);
  const navigation = useNavigation() as any;

  const searchRef = useRef(null);

  const { data: totalData, isLoading: isTotalLoading } = useQuery(
    "GET_PRODUCTS_TOTAL",
    async () => GET_PRODUCTS_TOTAL()
  );

  const totalProducts = useMemo(() => {
    if (!isTotalLoading) {
      return totalData?.data?.reduce((a, b) => a + b.total, 0);
    }
    return 10;
  }, [isTotalLoading]);

  const getSuggestions = useCallback(async (q) => {
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }

    setLoading(true);
    GET_PRODUCTS(null, totalProducts).then((response) => {
      const items = response.data;

      const suggestions = items.map((item) => ({
        id: item.id,
        title: item.name,
      }));

      setSuggestionsList(suggestions);
      setProducts(items);
      setSearchQuery(q);

      setLoading(false);
    });
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  return (
    <AutocompleteDropdownContextProvider headerOffset={45}>
      <AutocompleteDropdown
        ref={searchRef}
        controller={(controller) => {
          dropdownController.current = controller;
        }}
        dataSet={suggestionsList}
        onChangeText={getSuggestions}
        onSelectItem={(item) => {
          const product = products?.filter(
            (product) => product.id === Number(item.id)
          );

          if (item && product.length > 0)
            navigation.navigate("ProductDetailsScreen", {
              product: product[0],
            });
        }}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
        onClear={onClearPress}
        onSubmit={(e) => {
          navigation.navigate("SearchProductsScreen", {
            searchQuery,
            productsPerPage: totalProducts,
          });
        }}
        onFocus={() => {
          setSuggestionsList([]);
        }}
        loading={loading}
        useFilter={false}
        textInputProps={{
          placeholder: "Chercher un produit",
          autoCorrect: false,
          autoCapitalize: "none",
        }}
        emptyResultText=""
        EmptyResultComponent={<></>}
        inputHeight={35}
        showChevron={false}
        closeOnBlur={false}
        showClear={false}
        inputContainerStyle={{
          backgroundColor: MD2Colors.grey200,
        }}
      />
    </AutocompleteDropdownContextProvider>
  );
});
