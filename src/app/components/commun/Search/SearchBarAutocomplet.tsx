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
import { Button, MD2Colors, Searchbar } from "react-native-paper";
import { deviceWidth } from "../../../utils/device";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_TOTAL,
  getProductsTotals,
  retrieveProducts,
} from "../../../utils/api-calls";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { ProductProps } from "../../../utils/models";
import Toast from "react-native-toast-message";
import { TextField } from "../../UI/TextField";
import { Formik } from "formik";
import { useFonts } from "@expo-google-fonts/raleway";

export const SearchBarAutocomplet = memo(() => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [suggestedList, setSuggestedList] = useState([]);
  const navigation = useNavigation() as any;

  const [fontsLoaded] = useFonts({
    "Cairo-Regular": require("../../../../../assets/fonts/Cairo-Regular.ttf"),
  });

  const { data, isLoading: isTotalLoading } = useQuery(
    "getProductsTotals",
    async () => getProductsTotals()
  );

  useEffect(() => {
    Toast.hide();
    setSuggestedList([]);
    setSearchQuery("");
  }, []);

  const totalProducts = useMemo(() => {
    if (!isTotalLoading) {
      return data?.reduce((a, b) => a + b.total, 0);
    }
    return 10;
  }, [isTotalLoading]);

  useEffect(() => {
    if (!!searchQuery) {
      retrieveProducts(`products?search=${searchQuery}`).then((response) => {
        setSearchQuery(searchQuery);

        if (response?.data?.length > 0) {
          const products = response?.data;

          const suggestions = products?.map((item) => ({
            id: item.id,
            title: item.name,
            src: item.images[0].src,
          }));

          setSuggestedList(suggestions);

          Toast.show({
            type: "serach",
            props: {
              data: suggestions,
              onAction: (id) => {
                Toast.hide();

                const product = products?.filter(
                  (product) => `${product.id}` === `${id}`
                );
                if (!!product) {
                  navigation?.navigate("ProductDetailsScreen", {
                    product: product[0],
                  });
                }
                Toast.hide();
              },
            },
            position: "top",
            swipeable: false,
            autoHide: false,
          });
        }
      });
    }
  }, [searchQuery]);

  const onSubmitHandler = (e) => {
    setSearchQuery("");
    navigation.navigate("SearchProductsScreen", {
      searchQuery,
      productsPerPage: totalProducts,
    });

    Toast.hide();
  };

  return (
    <View style={{ flex: 1 }}>
      <AutocompleteDropdown
        onChangeText={setSearchQuery}
        onSubmit={onSubmitHandler}
        debounce={600}
        loading={isloading}
        inputContainerStyle={{
          height: 35,
          width: "100%",
          borderRadius: 5,
          marginBottom: 5,
          backgroundColor: MD2Colors.white,
          borderWidth: 0.2,
          borderColor: MD2Colors.indigo300,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        showChevron={false}
        textInputProps={{
          placeholder: "Rechercher un produit",
          style: {
            fontFamily: "Cairo-Regular",
            color: MD2Colors.indigo800,
          },
        }}
      />
    </View>
  );
});
