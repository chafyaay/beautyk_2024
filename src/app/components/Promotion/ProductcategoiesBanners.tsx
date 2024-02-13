import { View, Pressable, ScrollView, Image } from "react-native";

import { Skelton } from "../UI/Skelton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProductCategoiesBanners = () => {
  const navigation = useNavigation() as any;
  const { homeData } = useSelector((state: any) => state);
  const data = homeData.categoris_slider;

  if (data?.length > 0)
    return (
      <ScrollView horizontal showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 100,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "auto",
            padding: 10,
          }}
        >
          {data?.map((item) => (
            <Pressable
              key={item.id}
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("ProductListScreen", { ...item });
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: item.image?.src,
                }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  else return <Skelton type="BANNER" />;
};

export default ProductCategoiesBanners;
