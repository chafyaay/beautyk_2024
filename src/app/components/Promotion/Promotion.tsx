import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useQuery } from "react-query";
import { deviceWidth } from "../../utils/device";
import { MD2Colors } from "react-native-paper";
import { Skelton } from "../UI/Skelton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function Promotion() {
  const navigation = useNavigation() as any;
  const { homeData } = useSelector((state: any) => state);
  const data = homeData.promotion;

  const _renderItem = ({ item, index }) => {
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

  if (data?.length > 0)
    return (
      <Carousel
        layout="default"
        autoplay
        pagingEnabled
        hasParallaxImages
        data={data}
        renderItem={_renderItem}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth}
      />
    );
  else return <Skelton type="CAROUSEL" />;
}
