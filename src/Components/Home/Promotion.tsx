import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../Theme/Typography";
import { PressableButton } from "../../Theme/PressableButton";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getHomeDataApi } from "../../utils/api-calls";
/* import { useKeenSliderNative } from "../../utils/lib/carousl.js";
 */
import { deviceHeight, deviceWidth } from "../../utils/device";
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";

import React from "react";
import { Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ imgSrc, navigateTo }) => {
  return (
    <Pressable onPress={navigateTo}>
      <Image
        resizeMode="contain"
        source={{
          uri: imgSrc,
        }}
        style={{
          height: 165,
          borderRadius: 10,
        }}
      />
    </Pressable>
  );
};

function Promotion() {
  const navigation = useNavigation() as any;
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const { data, isLoading, error } = useQuery("get promotion", async () =>
    getHomeDataApi("promotion")
  );

  const onNavigateTo = () => navigation?.navigate("ItemDetailsScreen");

  return (
    <View>
      {!isLoading && (
        <>
          <Carousel
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={data.data || []}
            renderItem={(props) => (
              <CarouselCardItem
                imgSrc={props?.item?.image?.src}
                navigateTo={onNavigateTo}
              />
            )}
            sliderWidth={SLIDER_WIDTH - 80}
            itemWidth={ITEM_WIDTH - 0}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
          <Pagination
            dotsLength={data?.data?.length}
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
export default Promotion;
