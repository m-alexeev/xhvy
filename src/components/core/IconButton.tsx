import { FC } from "react";
import { ColorValue, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { GestureResponderEvent } from "react-native-modal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MD3Theme, TouchableRipple, useTheme } from "react-native-paper";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IconButtonProps {
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
  icon: IconProp;
  size?: number;
  rippleColor?: ColorValue;
  color?: ColorValue;
  containerColor?: ColorValue;
}

const IconButton: FC<IconButtonProps> = ({
  selected = false,
  disabled = false,
  size = 16,
  rippleColor,
  style,
  onPress,
  icon,
  color,
  containerColor,
}) => {
  const theme = useTheme();

  const selectedStyle = selected ? styles(theme).selected : undefined;

  const backgroundColor = disabled
    ? theme.colors.surfaceDisabled
    : containerColor
    ? containerColor
    : undefined;

  // Typed as a ColorValue but converted to a string
  // as Icon props complain
  const iconColor = disabled
    ? theme.colors.onSurfaceDisabled
    : color
    ? selected ? theme.colors.primary : color
    : theme.colors.onSurface;

  return (
    <TouchableRipple
      borderless
      disabled={disabled}
      rippleColor={rippleColor}
      style={[styles(theme).container, style, {
        backgroundColor: backgroundColor,
      }, selectedStyle]}
      onPress={onPress}
    >
      <FontAwesomeIcon color={iconColor as string} size={size} icon={icon} />
    </TouchableRipple>
  );
};

const styles = (prop: MD3Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 5,
    },
    selected: {
      backgroundColor: prop.colors.secondaryContainer,
      color: prop.colors.onPrimaryContainer,
    },
  });

export default IconButton;
