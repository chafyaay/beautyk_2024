import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import Promotion from "../../components/Promotion/Promotion";
import ProductList from "../../components/Product/ProdcutList";
import { useQuery } from "react-query";
import { GET_PRODUCTS, GET_RECOMENDED_PRODUCTS } from "../../utils/api-calls";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { $color1, deviceWidth } from "../../utils/device";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";

export default function HomeScreen({ route, navigation }) {
  const { data, isLoading } = useQuery("getProducts", GET_PRODUCTS);
  const currentPageName = route?.name;

  const recomended = data?.data?.filter((item) => item.categories.includes());

  return (
    <View style={{ flex: 1 }}>
      <BottomNavBar currentPageName={currentPageName} navigation={navigation} />

      <ScrollView style={{ paddingTop: 130, paddingBottom: 230, flex: 1 }}>
        <View style={{ flex: 1, paddingBottom: 330 }}>
          <Promotion />
          {isLoading ? (
            <ActivityIndicator animating={true} color={$color1} />
          ) : (
            <View style={{ padding: 15 }}>
              <ImageBackground
                resizeMode="contain"
                style={{
                  width: deviceWidth - 30,
                  height: 90,
                  marginBottom: 20,
                }}
                source={{
                  uri: "https://orgaliving.com/wp-content/uploads/2024/01/cuisine.png",
                }}
              />
              <ImageBackground
                resizeMode="contain"
                style={{
                  width: deviceWidth - 30,
                  height: 90,
                  marginBottom: 20,
                }}
                source={{
                  uri: "https://orgaliving.com/wp-content/uploads/2024/01/beauty-1.png",
                }}
              />
              <ProductList
                titleContent={"Produits en promotion"}
                navigate={navigation?.navigate}
                products={!!data && data?.data}
              />
              <ProductList
                titleContent={"Recommandé pour vous"}
                navigate={navigation?.navigate}
                products={!!data && data?.data}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
