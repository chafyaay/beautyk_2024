import { View } from "react-native";
import { Divider, MD2Colors, Text } from "react-native-paper";

export const Separator: React.FC<{ size?: number; title?: string }> = ({
  size,
  title,
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Divider
        style={{ marginTop: size || 1, marginBottom: (size || 1) / 2 }}
      ></Divider>
      {title && (
        <Text
          style={{
            position: "absolute",
            backgroundColor: "white",
            paddingRight: 10,
            color: MD2Colors.indigo400,
          }}
          variant="titleMedium"
        >
          {title}
        </Text>
      )}
    </View>
  );
};
