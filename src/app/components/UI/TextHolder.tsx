import { MD2Colors, Text } from "react-native-paper";
import {
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  useFonts,
} from "@expo-google-fonts/raleway";

export const TextHolder: React.FC<{
  text: string;
  style?: any;
  size?: "xs" | "s" | "sm" | "m" | "l" | number;
  color?: string;
  weight?: "bold" | "light" | "regular" | "medium";
  type?: "H" | "B" | "price";
  nbrLines?: number;
}> = ({ size, type, color, text, weight, style, nbrLines }) => {
  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    BebasNeue: require("../../../../assets/fonts/BebasNeue-Regular.ttf"),
    "Cairo-Light": require("../../../../assets/fonts/Cairo-Light.ttf"),
    "Cairo-Medium": require("../../../../assets/fonts/Cairo-Medium.ttf"),
    "Cairo-Regular": require("../../../../assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("../../../../assets/fonts/Cairo-SemiBold.ttf"),
  });

  const getSize = () => {
    switch (size) {
      case "xs":
        return 12;
      case "s":
        return 16;
      case "sm":
        return 20;
      case "m":
        return 24;
      case "l":
        return 28;
      default:
        return size;
    }
  };

  const getFontFamlily = () => {
    let font = "";
    switch (type) {
      case "B":
        font = "Cairo-SemiBold";
        break;
      case "H":
        font = "Cairo-SemiBold";
        break;
      case "price":
        font = "Cairo-SemiBold";
        break;
      default:
        font = "Cairo-SemiBold";
        break;
    }
    if (weight === "bold") return "Cairo-SemiBold";
    else if (weight === "light") return "Cairo-SemiBold";
    else if (weight === "regular") return "Cairo-SemiBold";
    else if (weight === "medium") return "Cairo-SemiBold";
    else return font;
  };

  return (
    <>
      {!!fontsLoaded && (
        <Text
          numberOfLines={nbrLines || 1}
          style={{
            fontSize: getSize(),
            color: color || MD2Colors.indigo700,
            fontFamily: getFontFamlily(),
            letterSpacing: 0.51,
            ...style,
          }}
        >
          {text}
        </Text>
      )}
    </>
  );
};
