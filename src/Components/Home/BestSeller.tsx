import { ImageBackground, Pressable, View } from "react-native";
import { Typography } from "../../Theme/Typography";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getHomeDataApi } from "../../utils/api-calls";
import { deviceWidth } from "../../utils/device";

function BestSeller() {
  const navigation = useNavigation() as any;

  const { data, isLoading } = useQuery("banner_2", async () =>
    getHomeDataApi("banner_2")
  );

  return (
    <View>
      <Typography variant="heading1">BestSeller</Typography>
      <View>
        {data?.data?.map((item) => (
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
}

export default BestSeller;
