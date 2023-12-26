import { FC, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "react-native-paper";

interface ITextInput extends TextInputProps {
  left?: React.JSX.Element;
  right?: React.JSX.Element;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
  border?: boolean;
}

const CustomTextInput: FC<ITextInput> = ({
  left,
  right,
  onLeftPressed,
  ...props
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: focused ? theme.colors.primary : theme.colors.backdrop,
          backgroundColor: theme.colors.backdrop,
        },
      ]}
    >
      <View
        style={[styles.left, { display: left === undefined ? "none" : "flex" }]}
      >
        {left}
      </View>
      <TextInput
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        style={[
          styles.searchbar,
          {
            color: theme.colors.onBackground,
          },
        ]}
        cursorColor={theme.colors.primary}
        {...props}
        placeholderTextColor={theme.colors.onSurfaceVariant}
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
    flex:1,
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 2,
    height: 48,
    alignItems: "center",
  },
  searchbar: {
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
