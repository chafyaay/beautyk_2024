import {
  Button,
  MD2Colors,
  MD2LightTheme,
  TextInput,
} from "react-native-paper";
import {
  $defaultBgColor,
  $defaultColor,
  $defaultTextColor,
  $disabledBgColor,
  $disabledTextColor,
  $primaryBgColor,
  $primaryColor,
  $primaryTextColor,
} from "../../utils/device";
import { onClearCart } from "../../utils/store/actions/cart.actions";
import { View } from "react-native";

export const PrimaryInputText: React.FC<{
  handleChange: () => void;
  onBlur: () => void;
  value: string;
  label: string;
  title: any;
  disabled?: boolean;
  isValid?: boolean;
  secure?: boolean;
  Icon?: any;
}> = ({
  handleChange,
  onBlur,
  value,
  label,
  disabled,
  isValid,
  secure,
  Icon,
}) => (
  <View>
    <TextInput
      secureTextEntry={secure}
      disabled={disabled}
      style={{ marginTop: 10 }}
      label={label}
      onChangeText={handleChange}
      onBlur={onBlur}
      value={value}
      dense
      mode="outlined"
      theme={MD2LightTheme}
      activeOutlineColor={isValid ? MD2Colors.red800 : MD2Colors.indigo500}
    />
    {Icon && Icon}
  </View>
);
