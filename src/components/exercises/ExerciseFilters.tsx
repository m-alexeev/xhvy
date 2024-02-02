import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { equipment, majorMuclesGroups } from "@app/utils/categories";
import TogglePillButton from "../core/buttons/TogglePill";
import { useFilter } from "@app/zustand/filterStore";

const ExerciseFilters = () => {
  const filterCategories = useFilter((s) => s.filterCategories);
  const updateCategory = useFilter((s) => s.updateCategory);

  return (
    <View>
      <Text variant="titleSmall">Muscle Groups</Text>
      <View style={styles.pillContainer}>
        {majorMuclesGroups.map((muscleGroup, index) => (
          <TogglePillButton
            key={index}
            text={muscleGroup}
            toggled={filterCategories.includes(muscleGroup)}
            onToggle={() => updateCategory(muscleGroup)}
          />
        ))}
      </View>
      <Text variant="titleSmall">Equipment</Text>
      <View style={styles.pillContainer}>
        {equipment.map((eq, index) => (
          <TogglePillButton
            key={index}
            text={eq}
            toggled={filterCategories.includes(eq)}
            onToggle={() => updateCategory(eq)}
          />
        ))}
      </View>
    </View>
  );
};

export default ExerciseFilters;

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
});
