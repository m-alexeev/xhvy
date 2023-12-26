import { FC, ReactNode, useState } from "react";
import { StyleSheet, TextInputProps, View, TextInput } from "react-native";
import { useTheme } from "react-native-paper";

interface ITextInput extends TextInputProps {
  left?: React.JSX.Element;
  right?: React.JSX.Element;
  onLeftPressed?: () => void;
  onRightPressed?: () => void;
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
          borderColor: focused 
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
        onFocus={() => {setFocused(true)}}
        onBlur={() => {setFocused(false)}}
        style={[
          styles.searchbar,
          {
            color: theme.colors.onSurface,
          },
        ]}
        cursorColor={theme.colors.primary}
        {...props}
        placeholderTextColor={theme.colors.outline}
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
    flex: 1,
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
