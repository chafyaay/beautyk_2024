import { ImageBackground, ScrollView, View } from "react-native";
import Promotion from "../../components/Promotion/Promotion";
import ProductList from "../../components/Product/ProdcutList";
import { useQuery } from "react-query";
import { GET_PRODUCTS } from "../../utils/api-calls";
import { ActivityIndicator } from "react-native-paper";
import { $color1, deviceWidth } from "../../utils/device";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";

export default function HomeScreen({ route, navigation }) {
  const { data, isLoading } = useQuery("getProducts", GET_PRODUCTS);

  return (
    <View style={{ flex: 1 }}>
      <BottomNavBar pageId={route?.name} navigation={navigation} />

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
                navigation={navigation}
                products={!!data && data?.data}
              />

              {/*  <ProductList
                titleContent={"Produits en promotion"}
                navigation={navigation}
                products={!!data && data?.data}
              /> */}
              {/*   <ProductList
                titleContent={"Recommandé pour vous"}
                navigation={navigation}
                products={!!data && data?.data}
              /> */}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
