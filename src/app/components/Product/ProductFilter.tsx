import { Pressable, StyleSheet, View } from "react-native";
import {
  Dialog,
  Icon,
  IconButton,
  MD2Colors,
  Portal,
  Text,
} from "react-native-paper";
import { TEXT_COLOR } from "../../utils/device";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Typography } from "../UI/Typography";
import { PressableButton } from "../UI/Buttons";

interface OrderByProps {
  setOrderByIndex: (id: number) => void;
  setCardView: (T: "GRID" | "LIST") => void;
}

const OrderBy: React.FC<OrderByProps> = ({ setOrderByIndex, setCardView }) => {
  const [visible, setVisible] = useState(false);
  const [cardViewType, setCardViewType] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const sortByData = process.env.SORT_PRODUCT.split(",");

  useEffect(() => {
    setCardView(cardViewType ? "LIST" : "GRID");
  }, [cardViewType]);

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => setVisible(true)} style={styles.sortBySlect}>
          <Typography variant="bodyMedium">
            {selectedValue || sortByData[0]}{" "}
          </Typography>
          <Icon size={20} source="chevron-down" />
        </Pressable>

        <PressableButton
          onPress={() => setCardViewType((e) => !e)}
          type="default"
        >
          <Icon size={20} source={cardViewType ? "view-grid" : "view-agenda"} />
        </PressableButton>
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
