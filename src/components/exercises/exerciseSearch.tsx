import { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Icon, IconButton, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../core/TextInput";

const ExerciseSearch: FC = () => {
  const [isFocused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <CustomTextInput
        selectionColor={theme.colors.primary}
        value={text}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={setText}
        placeholder="Search"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        isFocused={isFocused}
				right={<Icon size={24} source="magnify"/>}
      />
      <IconButton mode="contained" icon="menu" onPress={console.log} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
		paddingHorizontal: 4,
		paddingVertical: 8,
  },
  searchbar: {
    flex: 1,
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 2,
    height: 48,
    paddingHorizontal: 16,
  },
  filters: {},
});

export default ExerciseSearch;
