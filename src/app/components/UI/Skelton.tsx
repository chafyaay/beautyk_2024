import { ActivityIndicator, Icon } from "react-native-paper";

import { StyleSheet, View } from "react-native";
import { BG_LIGHT_COLOR, BG_DARK_COLOR, deviceWidth } from "../../utils/device";

export const Skelton: React.FC<{
  type: "CAROUSEL" | "CARD_LIST" | "SLIDER" | "BANNER" | "CARD_GRID";
}> = ({ type }) => {
  const Indicator = () => (
    <ActivityIndicator
      style={{ position: "absolute", zIndex: 9 }}
      color={BG_LIGHT_COLOR.primary}
      size={20}
    />
  );

  if (type === "CAROUSEL")
    return (
      <View style={[styles.conatiner, styles.carousel]}>
        <Indicator />
        <Icon color={BG_DARK_COLOR.light} source={"image"} size={90} />
        <View style={{ position: "absolute", bottom: -20 }}>
          <Icon
            color={BG_LIGHT_COLOR.disabled}
            size={60}
            source="dots-horizontal"
          />
        </View>
      </View>
    );
  else if (type === "SLIDER")
    return (
      <View style={styles.conatiner}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.banner}>
            <Indicator />
            <Icon color={BG_DARK_COLOR.light} source={"image"} size={90} />
          </View>
        ))}
      </View>
    );
  else if (type === "BANNER")
    return (
      <View style={styles.conatiner}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.banner}>
            <Indicator />
            <Icon color={BG_DARK_COLOR.light} source={"image"} size={90} />
          </View>
        ))}
      </View>
    );
  else if (type === "CARD_GRID")
    return (
      <View style={[styles.conatiner, { flexWrap: "wrap", gap: 5 }]}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.card_grid}>
            <Indicator />
            <View>
              <Icon
                color={BG_DARK_COLOR.light}
                source={"image-area"}
                size={130}
              />
              <Icon
                color={BG_DARK_COLOR.light}
                source={"text-short"}
                size={100}
              />
            </View>
          </View>
        ))}
      </View>
    );
  else if (type === "CARD_LIST")
    return (
      <View
        style={[
          styles.conatiner,
          {
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 5,
          },
        ]}
      >
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card_list}>
            <Indicator />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Icon
                color={BG_DARK_COLOR.light}
                source={"image-area"}
                size={60}
              />
              <Icon
                color={BG_DARK_COLOR.light}
                source={"text-short"}
                size={60}
              />
            </View>
          </View>
        ))}
      </View>
    );
};

const styles = StyleSheet.create({
  conatiner: {
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth - 20,
    flexDirection: "row",
    margin: 10,
  },
  carousel: {
    width: deviceWidth - 20,
    height: 150,
    borderColor: BG_DARK_COLOR.light,
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
  },
  banner: {
    width: 100,
    height: 100,
    borderColor: BG_DARK_COLOR.light,
    borderWidth: 3,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card_grid: {
    width: (deviceWidth - 30) / 2,
    height: 250,
    borderColor: BG_DARK_COLOR.light,
    borderWidth: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card_list: {
    width: deviceWidth - 20,
    height: 100,
    borderColor: BG_DARK_COLOR.light,
    borderWidth: 3,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});
