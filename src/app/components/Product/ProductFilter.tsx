import { Pressable, StyleSheet, View } from "react-native";
import { Dialog, Icon, IconButton, Portal, Text } from "react-native-paper";
import { TEXT_COLOR } from "../../utils/device";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

interface OrderByProps {
  setOrderByIndex: (id: number) => void;
  setCardView: (T: "GRID" | "LIST") => void;
}

const OrderBy: React.FC<OrderByProps> = ({ setOrderByIndex, setCardView }) => {
  const [visible, setVisible] = useState(false);
  const [cardViewType, setCardViewType] = useState<"GRID" | "LIST">();
  const [selectedValue, setSelectedValue] = useState("");

  const sortByData = process.env.SORT_PRODUCT.split(",");

  useEffect(() => {
    setCardViewType("GRID");
  }, []);

  useEffect(() => {
    if (!!cardViewType) {
      setCardView(cardViewType);
    }
  }, [cardViewType]);

  const setCardViewHandler = (T: "GRID" | "LIST") => {
    setCardViewType(T);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => setVisible(true)} style={styles.sortBySlect}>
          <Text variant="bodyMedium">{selectedValue || sortByData[0]} </Text>
          <Icon size={20} source="chevron-down" />
        </Pressable>
        <View style={styles.sortByContainer}>
          <IconButton
            onPress={() => {
              setCardViewHandler("GRID");
            }}
            mode={cardViewType === "GRID" ? "contained" : "contained-tonal"}
            size={20}
            icon="view-grid-outline"
          />
          <IconButton
            mode={cardViewType === "LIST" ? "contained" : "contained-tonal"}
            onPress={() => {
              setCardViewHandler("LIST");
            }}
            size={20}
            icon="view-agenda-outline"
          />
        </View>
      </View>
      {!!visible && (
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Content>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue: any, itemIndex) => {
                  setOrderByIndex(itemIndex);
                  setSelectedValue(itemValue);
                  setVisible(false);
                }}
                mode="dialog"
              >
                {sortByData?.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </>
  );
};

export default OrderBy;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 10,
    width: "100%",
    marginTop: 10,
  },
  sortByContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortBySlect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: TEXT_COLOR.disabled,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
