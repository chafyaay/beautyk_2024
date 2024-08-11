import React, { Children } from "react";
import { Pressable, StyleSheet, Text as Typograpy } from "react-native";
import { Typography } from "./Typography";
import { colors } from "./colors";
import { ActivityIndicator, IconButton } from "react-native-paper";

export const PressableButton: React.FC<{
  children?: string;
  variant?:
    | "primary"
    | "secondary"
    | "disabled"
    | "outlined"
    | "link"
    | "single-icon";
  icon?: string;
  iconPosition?: "left" | "right";
  style?: CssProps;
  isLoading?: boolean;
  onPress?: () => void;
}> = ({ variant, children, style, isLoading, icon, iconPosition, onPress }) => {
  if (variant === "single-icon")
    return <IconButton onPress={onPress} icon={icon} size={24} />;
  return (
    <>
      <Pressable style={styles().container} onPress={onPress}>
        {Children.map(children, (child) => (
          <Typography variant="cta">{child}</Typography>
        ))}
        {isLoading && <ActivityIndicator size={16} />}
      </Pressable>
    </>
  );
};

const styles = (style?: StyleSheet) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: colors.background["$background-brand"],
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      margin: 40,
      borderRadius: 7,
      columnGap: 10,
    },
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
