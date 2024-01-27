import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { GET_BANNER_BY_SECTION, GET_CATEGORIES } from "../../utils/api-calls";
import { useQuery } from "react-query";
import { deviceWidth } from "../../utils/device";
import { MD2Colors } from "react-native-paper";

export default function Promotion({ data }) {
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: deviceWidth,
          height: 200,
          padding: 10,
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
              }}
            >
              <Text
                style={{ color: "white", padding: 10, textAlign: "center" }}
              >
                Découvrir
              </Text>
            </Pressable>
            <ImageBackground
              style={{ width: 367, height: 167 }}
              resizeMode="contain"
              source={{
                uri: item.image?.src,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <Carousel
      onTouchEnd={(e) => {
        console.log(e);
      }}
      onTouchMove={(e) => {
        console.log(e.target);
      }}
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
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEccc",
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  input: {
    width: 200,
    height: 50,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#CCC",
  },
});
