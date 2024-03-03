import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useQuery } from "react-query";
import { deviceWidth } from "../../utils/device";
import { MD2Colors } from "react-native-paper";
import { Skelton } from "../UI/Skelton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getHomeDataApi } from "../../utils/api-calls";
import { useEffect, useState } from "react";
import { PressableButton } from "../UI/Buttons";

export default function Promotion() {
  const navigation = useNavigation() as any;

  const { data, isLoading } = useQuery("get promotion", async () =>
    getHomeDataApi("promotion")
  );

  const RenderCarouselItems = ({ item, index }) => {
    return (
      <View
        style={{
          width: deviceWidth,
          height: "auto",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!item.image?.src ? (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        ) : (
          <View>
            <Pressable
              style={{
                position: "absolute",
                left: deviceWidth - deviceWidth / 2.5,
                bottom: 10,
                zIndex: 1,
                margin: "auto",
                width: deviceWidth / 3,
                borderRadius: 5,
                backgroundColor: "black",
              }}
              onPress={() => {
                navigation?.navigate("ProductListScreen", { ...item });
              }}
            >
              <Text
                style={{ color: "white", padding: 10, textAlign: "center" }}
              >
                Découvrir
              </Text>
            </Pressable>
            <ImageBackground
              style={{
                width: deviceWidth,
                height: 167,
                overflow: "hidden",
                backgroundColor: "gold",
              }}
              imageStyle={{ width: deviceWidth + 20, marginLeft: -10 }}
              resizeMode="cover"
              source={{
                uri: item.image?.src,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const Item = ({ item, index }) => {
    return (
      <View style={{ width: 100 }}>
        <PressableButton fontWeight="Bold" type="default">
          hello-{index}
        </PressableButton>
      </View>
    );
  };

  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {});

  if (!isLoading)
    return (
      <>
        <Carousel
          layout="default"
          layoutCardOffset={18}
          autoplay
          data={data?.data}
          renderItem={Item}
          sliderWidth={deviceWidth}
          itemWidth={100}
          onSnapToItem={setActiveSlide}
          numColumns={3}
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
  else return <Skelton type="CAROUSEL" />;
}
