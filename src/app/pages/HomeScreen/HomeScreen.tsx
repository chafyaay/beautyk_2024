import { ImageBackground, Pressable, ScrollView, View } from "react-native";
import Promotion from "../../components/Promotion/Promotion";
import { useQuery } from "react-query";
import { GET_BANNER_BY_SECTION, GET_TOP_SELLER } from "../../utils/api-calls";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import React from "react";
import Banners from "../../components/Promotion/Banners";
import { deviceWidth } from "../../utils/device";
import { Text } from "react-native-paper";

export default function HomeScreen({ route, navigation }) {
  const { data: promoData, isLoading: promoIsLoading } = useQuery(
    "GET PROMOTION DATA",
    async () => await GET_BANNER_BY_SECTION("promotion")
  );

  const { data, isLoading } = useQuery(
    "GET BANNER SECTION 2 ",
    async () => await GET_BANNER_BY_SECTION("banner_2")
  );

  const { data: NA_data, isLoading: NA_isLoading } = useQuery(
    "GET_TOP_SELLER",
    async () => await GET_TOP_SELLER()
  );

  console.log("------//***-////", NA_data?.data);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <BottomNavBar pageId={route?.name} navigation={navigation} />

      <ScrollView style={{ paddingTop: 130, paddingBottom: 230, flex: 1 }}>
        <View style={{ flex: 1, paddingBottom: 330 }}>
          <Promotion data={promoData?.data} />
          <Banners navigation={navigation} />
          <View>
            <ScrollView horizontal>
              {NA_data?.data.map((item) => (
                <Pressable
                  key={item?.id}
                  onPress={() => {
                    navigation.navigate("ProductListScreen", { ...item });
                  }}
                  style={{
                    width: deviceWidth,
                    height: "auto",
                    padding: 10,
                  }}
                >
                  <Text>{JSON.stringify(item)}</Text>
                  {/*   <ImageBackground
                    resizeMode="contain"
                    style={{ width: "100%", height: 100 }}
                    source={{ uri: item.image.src }}
                  /> */}
                </Pressable>
              ))}
            </ScrollView>
          </View>
          {/* section banner 2 */}
          <View>
            {!isLoading &&
              data?.data?.map((item) => (
                <Pressable
                  key={item?.id}
                  onPress={() => {
                    navigation.navigate("ProductListScreen", { ...item });
                  }}
                  style={{
                    width: deviceWidth,
                    height: "auto",
                    padding: 10,
                  }}
                >
                  <ImageBackground
                    resizeMode="contain"
                    style={{ width: "100%", height: 100 }}
                    source={{ uri: item.image.src }}
                  />
                </Pressable>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
