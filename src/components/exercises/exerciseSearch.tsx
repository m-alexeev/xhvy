import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, IconButton, useTheme, Text } from "react-native-paper";
import CustomTextInput from "../core/TextInput";
import { useFilter } from "../../zustand/filterStore";

interface ExerciseSearchProps{
  onShowFilter: () => void;
}

const ExerciseSearch: FC<ExerciseSearchProps> = ({onShowFilter}) => {
  const { search, updateSearch } = useFilter();
  const [isFocused, setFocused] = useState(false);
  const theme = useTheme();


  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <View style={styles.container}>
      <CustomTextInput
        selectionColor={theme.colors.primary}
        value={search}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={updateSearch}
        placeholder="Search"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        isFocused={isFocused}
        right={<Icon size={24} source="magnify" />}
      />
      <IconButton mode="contained" icon="menu" onPress={onShowFilter} />
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});

export default ExerciseSearch;
