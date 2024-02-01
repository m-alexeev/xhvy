import { useFilter } from "@app/zustand/filterStore";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import CustomTextInput from "../core/TextInput";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface ExerciseSearchProps {
  onShowFilter: () => void;
}

const ExerciseSearch: FC<ExerciseSearchProps> = ({ onShowFilter }) => {
  const { search, updateSearch } = useFilter();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <CustomTextInput
        containerStyle={{ height: 48 }}
        selectionColor={theme.colors.primary}
        value={search}
        onChangeText={updateSearch}
        placeholder="Search"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        right={
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color={theme.colors.onSurface}
          />
        }
      />
      <IconButton
        style={{ padding: 10, borderRadius: 50 }}
        containerColor={theme.colors.secondaryContainer}
        size={20}
        icon={faList}
        onPress={onShowFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  searchbar: {
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 2,
    height: 48,
    paddingHorizontal: 16,
  },
  filters: {},
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default ExerciseSearch;
