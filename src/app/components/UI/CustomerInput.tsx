import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Dialog,
  MD2Colors,
  MD2LightTheme,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { cities } from "../../utils/models";

export const CustomerInput: React.FC<{
  input: string;
  label: string;
  value: any;
  onBlurHandler: (input) => void;
  onSelectedCityHandler?: (city: string) => void;
  touched?: any;
  errors: any;
}> = ({
  input,
  label,
  value,
  touched,
  errors,
  onBlurHandler,
  onSelectedCityHandler,
}) => {
  const [visible, setVisible] = useState(false);
  const [cityValue, setCityValue] = useState("");

  useEffect(() => {
    onSelectedCityHandler(cityValue);
  }, [cityValue]);
  return (
    <View>
      <TextInput
        style={{ marginTop: 10 }}
        label={label}
        dense
        mode="outlined"
        theme={MD2LightTheme}
        value={value}
        activeOutlineColor={
          touched && errors ? MD2Colors.red800 : MD2Colors.indigo500
        }
        onBlur={() => {
          onBlurHandler(input);
        }}
        onFocus={(e) => {
          if (input === "city") {
            setVisible(true);
            e.target.blur();
          }
        }}
      />

      {touched && errors ? (
        <Text variant="bodySmall" style={{ color: MD2Colors.red800 }}>
          {errors[input] as any}
        </Text>
      ) : (
        ""
      )}
      <Portal>
        <Dialog visible={visible} style={{ backgroundColor: "white" }}>
          <Picker
            selectedValue={cityValue}
            onValueChange={(itemValue, itemIndex) => {
              setCityValue(itemValue);
              setVisible(false);
            }}
            mode="dialog"
          >
            {cities.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </Dialog>
      </Portal>
    </View>
  );
};

/* (e) => {
    setShowPicker(true);
    handleChange(input);
    e.target.blur();
  } */
