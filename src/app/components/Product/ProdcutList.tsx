import { View } from "react-native";
import { useState } from "react";
import { Text } from "react-native-paper";
import { ShowAllProductButton } from "../UI/Buttons";
import { ProductProps } from "../../utils/models";
import ProductCard from "./ProductCard";

interface ProductListProps {
  navigation: any;
  products: ProductProps[];
  titleContent?: string;
  showAll?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  navigation,
  products,
  titleContent,
  showAll,
}) => {
  const [listView, setListView] = useState("row");

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 10 }} variant="titleMedium">
          {titleContent}
        </Text>
        {!!showAll && (
          <ShowAllProductButton
            icon={""}
            title=""
            onEventHandler={() => {
              navigation.navigate("ProductListScreen");
            }}
          />
        )}
      </View>

      <View
        style={{
          flexDirection: listView as any,
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {products?.map((product) => (
          <ProductCard navigation={navigation} product={product} />
        ))}
      </View>
    </View>
  );
};
