import { FC, ReactNode } from "react";
import { StyleSheet, TextInputProps, View, TextInput } from "react-native";
import { useTheme } from "react-native-paper";

interface ITextInput extends TextInputProps {
  left?: React.JSX.Element;
  right?: React.JSX.Element;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
  isFocused: boolean;
}

const CustomTextInput: FC<ITextInput> = ({
  left,
  right,
  onLeftPressed,
  onRightPressed,
  isFocused,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused
            ? theme.colors.primary
            : theme.colors.surfaceVariant,
        },
      ]}
      
    >
      <View
        style={[styles.left, { display: left === undefined ? "none" : "flex" }]}
      >
        {left}
      </View>
      <TextInput
        style={[
          styles.searchbar,
          {
            color: theme.colors.onSurface,
          },
        ]}
        cursorColor={theme.colors.primary}
        {...props}
      />
      <View
        style={[
          styles.right,
          { display: right === undefined ? "none" : "flex" },
        ]}
      >
        {right}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 2,
    height: 48,
    alignItems: "center",
  },
  searchbar: {
    flex: 1,
    paddingHorizontal: 16,
  },
  left: {
    marginLeft: 10,
  },
  right: {
    marginRight: 10,
  },
});

export default CustomTextInput;
