import { FC, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

interface ITextInput extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  left?: React.JSX.Element;
  right?: React.JSX.Element;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
}

const CustomTextInput: FC<ITextInput> = ({
  containerStyle,
  left,
  right,
  onLeftPressed,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles(theme).container, containerStyle]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {left && (
          <View style={styles(theme).left}>
            {left}
          </View>
        )}
        <TextInput
          {...props}
          style={[styles(theme).searchbar, props.style]}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          cursorColor={theme.colors.primary}
        />
        {right && (
          <View style={styles(theme).right}>
            {right}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backdrop,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center"
    },
    searchbar: {
      flex: 1,
      alignSelf: "stretch",
      color: theme.colors.onBackground,
      paddingHorizontal: 10,
    },
    left: {
      marginLeft: 10,
    },
    right: {
      marginRight: 10,
    },
  });

export default CustomTextInput;
