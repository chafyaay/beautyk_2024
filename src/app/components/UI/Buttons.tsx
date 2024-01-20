import { Button } from "react-native-paper";
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

export const PrimaryButton: React.FC<{
  title: any;
  onEventHandler?: () => void;
  disabled?: boolean;
}> = ({ disabled, onEventHandler, title }) => (
  <Button
    buttonColor={disabled ? $disabledBgColor : $defaultColor}
    textColor={disabled ? $disabledTextColor : $primaryColor}
    mode="contained"
    onPress={onEventHandler}
  >
    {title}
  </Button>
);

export const DefaultButton = ({ onEventHandler, title }) => (
  <Button
    buttonColor={$primaryBgColor}
    textColor={$primaryTextColor}
    mode="contained"
    onPress={onEventHandler}
  >
    {title}
  </Button>
);
