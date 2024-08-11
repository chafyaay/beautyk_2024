import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Portal, Text, TextInput } from "react-native-paper";
import { colors } from "./colors";

const styles = (style: StyleSheet) =>
  StyleSheet.create({
    primary: {
      fontSize: 18,
      fontWeight: "400",
      ...style,
      letterSpacing: 0.16,
    },
    secondary: { fontSize: 60, fontWeight: "700", lineHeight: 70, ...style },
    disabled: { fontSize: 48, fontWeight: "700", lineHeight: 57, ...style },
    oulined: { fontSize: 32, fontWeight: "700", lineHeight: 40, ...style },
    link: { fontSize: 24, fontWeight: "700", lineHeight: 28, ...style },
  });

export const TextField: React.FC<{
  key?: string;
  label?: string;
  value?: string;
  touched?: boolean;
  error?: string;
  autocomplete?: boolean;
  result?: { id: string; label: string }[];
  hiddenText?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  onBlur?: (e) => void;
  onChange?: (e) => void;
  onFocus?: () => void;
}> = ({
  key,
  label,
  value,
  touched,
  error,
  autocomplete,
  result,
  hiddenText,
  icon,
  iconPosition,
  onBlur,
  onChange,
  onFocus,
}) => (
  <View>
    <TextInput
      label={label}
      value={value}
      secureTextEntry={hiddenText}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      dense
      mode="outlined"
      outlineColor={colors.background["$background-selected-hover"]}
      textColor={colors.text["$text-secondary"]}
      selectionColor="black"
      underlineColor="black"
      activeOutlineColor={colors.background["$background-brand"]}
      style={{ marginTop: 20 }}
    />
    {!!(touched && error) && <Text>{error}</Text>}
    {autocomplete && result?.length > 0 && (
      <Portal>
        <Text>reult</Text>
      </Portal>
    )}

    {icon && <IconButton icon={icon} size={24} />}
  </View>
);
