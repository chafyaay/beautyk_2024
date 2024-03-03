import { View, Pressable, ScrollView, Image } from "react-native";

import { Skelton } from "../UI/Skelton";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getHomeDataApi } from "../../utils/api-calls";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { deviceWidth } from "../../utils/device";
import { useState } from "react";

const ProductCategoiesBanners = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const navigation = useNavigation() as any;

  const { data, isLoading } = useQuery("section-slider", async () =>
    getHomeDataApi("section-slider")
  );
  const Item = ({ item, index }) => {
    return (
      <Pressable
        key={item.id}
        style={{ marginRight: 10, backgroundColor: "red" }}
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
    );
  };

  if (!isLoading)
    return (
      <>
        <Carousel
          layout="default"
          contentOffset={{ x: -191, y: 11 }}
          slideStyle={{ width: 200 }}
          autoplay
          data={data?.data}
          renderItem={Item}
          sliderWidth={deviceWidth}
          itemWidth={150}
          onSnapToItem={setActiveSlide}
        />
        <Pagination
          dotsLength={data?.data?.length}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </>
    );
  else return <Skelton type="BANNER" />;
};

export default ProductCategoiesBanners;
/*  <ScrollView horizontal showsVerticalScrollIndicator={false}>
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
          {data?.data?.map((item) => (
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
      </ScrollView> */
