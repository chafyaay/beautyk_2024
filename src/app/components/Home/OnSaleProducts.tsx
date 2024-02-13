import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ProductProps } from "../../utils/models";
import {
  BG_DARK_COLOR,
  BG_LIGHT_COLOR,
  TEXT_COLOR,
  deviceWidth,
} from "../../utils/device";
import { IconButton, MD2Colors, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { getOnSaleproducts } from "../../utils/api-calls";
import { Skelton } from "../UI/Skelton";
import ProductCard from "../Product/ProductCard/ProductCard";

interface OnSaleProductsProps {
  products?: ProductProps[];
  isGrid?: boolean;
  navigation?: any;
}

const OnSaleProducts: React.FC<OnSaleProductsProps> = ({ navigation }) => {
  const { data, isLoading } = useQuery("getOnSaleproducts", async () =>
    getOnSaleproducts(4)
  );

  if (isLoading) return <Skelton type="BANNER" />;
  else if (!isLoading && data?.data?.length > 0)
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {data?.data?.map((product) => (
            <View
              key={product.id}
              style={{
                width: deviceWidth / 2,
                padding: 10,
              }}
            >
              <ProductCard
                navigation={navigation}
                product={product}
                showAddTocart={false}
                showTitle={false}
                cardView={"GRID"}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
};

export default OnSaleProducts;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
