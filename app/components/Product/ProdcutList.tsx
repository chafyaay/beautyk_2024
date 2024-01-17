import { View } from "react-native";
import { useState } from "react";
import ProductCard from "./ProductItem";
import { Button, Text } from "react-native-paper";
import { $color2 } from "../../utils/device";

export default function ProductList({ navigate, products, titleContent }) {
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
        <Text
          style={{ marginBottom: 10, color: $color2 }}
          variant="titleMedium"
        >
          {titleContent}
        </Text>
        <Button>Afficher tous</Button>
      </View>

      <View
        style={{
          flexDirection: listView as any,
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {products?.slice(0, 4)?.map((product) => (
          <ProductCard
            onNavigate={() => {
              navigate("ProductScreen", { query: product });
            }}
            product={product}
          />
        ))}
      </View>
    </View>
  );
}
