import { View, Pressable, ImageBackground, StyleSheet } from "react-native";
import { deviceWidth } from "../../utils/device";
import { Skelton } from "../UI/Skelton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function ProductsBanners() {
  const navigation = useNavigation() as any;
  const { homeData } = useSelector((state: any) => state);
  const data = homeData.banner;

  if (data?.length > 0)
    return (
      <View style={styles.container}>
        <View>
          {data?.map((item) => (
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
    );
  else return <Skelton type="CARD_LIST" />;
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
