import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";

import { onClearCart } from "../../utils/store/actions/cart.actions";
import { Pressable } from "react-native";
import { BG_LIGHT_COLOR, TEXT_COLOR, BG_DARK_COLOR } from "../../utils/device";

export const PrimaryButton: React.FC<{
  title: any;
  onEventHandler?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}> = ({ disabled, isLoading, onEventHandler, title }) => (
  <Button
    disabled={disabled}
    buttonColor={disabled ? BG_LIGHT_COLOR?.disabled : BG_DARK_COLOR?.default}
    textColor={disabled ? TEXT_COLOR?.disabled : BG_DARK_COLOR?.primary}
    mode="contained"
    onPress={onEventHandler}
  >
    {title} {!!isLoading && <ActivityIndicator size={15} />}
  </Button>
);

export const DefaultButton = ({ disabled, onEventHandler, title }) => (
  <Button
    disabled={disabled}
    buttonColor={disabled ? BG_LIGHT_COLOR?.disabled : BG_DARK_COLOR?.default}
    textColor={disabled ? TEXT_COLOR?.disabled : BG_DARK_COLOR?.primary}
    mode="contained"
    onPress={onEventHandler}
  >
    {title}
  </Button>
);

export const LinkButton = ({ onEventHandler, title, icon }) => (
  <Pressable
    style={{
      borderBottomColor: BG_LIGHT_COLOR?.disabled,
      borderBottomWidth: 1,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    }}
    onPress={onEventHandler}
  >
    {icon && <Icon source={icon} size={20} />}
    <Text
      style={{ color: TEXT_COLOR?.body, paddingLeft: 10 }}
      variant="titleSmall"
    >
      {title}
    </Text>
  </Pressable>
);

export const ShowAllProductButton = ({ onEventHandler, title, icon }) => (
  <Pressable
    style={{
      borderBottomColor: BG_LIGHT_COLOR?.disabled,
      borderBottomWidth: 1,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    }}
    onPress={onEventHandler}
  >
    <Text
      style={{ color: TEXT_COLOR?.default, paddingLeft: 10 }}
      variant="titleSmall"
    >
      Afficher tous
    </Text>
    {icon && <Icon source={icon} size={20} />}
  </Pressable>
);
