import { Image, Pressable, View } from "react-native";
import { Typography } from "../../Theme/Typography";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getHomeDataApi } from "../../utils/api-calls";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SLIDER_WIDTH, ITEM_WIDTH } from "./Promotion";

const CarouselCardItem = ({ imgSrc, navigateTo }) => {
  return (
    <Pressable onPress={navigateTo}>
      <Image
        resizeMode="contain"
        source={{
          uri: imgSrc,
        }}
        style={{
          height: 90,
          padding: 3,
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    </Pressable>
  );
};

function Categories() {
  const [index, setIndex] = useState(1);
  const navigation = useNavigation() as any;

  const { data, isLoading } = useQuery("section-slider", async () =>
    getHomeDataApi("section-slider")
  );

  const onNavigateTo = () => navigation?.navigate("ItemDetailsScreen");

  return (
    <View>
      {!isLoading && (
        <>
          <Carousel
            layout="default"
            layoutCardOffset={9}
            data={data?.data}
            renderItem={(props) => (
              <CarouselCardItem
                imgSrc={props?.item?.image?.src}
                navigateTo={onNavigateTo}
              />
            )}
            sliderWidth={SLIDER_WIDTH - 80}
            itemWidth={ITEM_WIDTH / 2 - 40}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
          <Pagination
            dotsLength={data.data.length}
            activeDotIndex={index}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </>
      )}
    </View>
  );
}

export default Categories;
