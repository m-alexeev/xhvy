import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { WorkoutExercise } from "@app/types/workouts";
import TemplateExerciseCard from "@app/components/templates/TemplateExerciseCard";
import { TemplateStackNavigationProp } from "@app/types/navigation/templates";
import { getTemplateById } from "@app/zustand/hooks";
import { useWorkout } from "@app/zustand/workoutStore";
import CustomTextInput from "@app/components/core/TextInput";

type TemplateCreateNavProps = TemplateStackNavigationProp<"Create">;

const TemplateCreate: FC<TemplateCreateNavProps> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const saveTemplate = useWorkout((s) => s.saveTemplate);
  const templateId = route.params.templateId;
  const template = getTemplateById(templateId);

  const renderTemplateExerciseCard = ({ item }: { item: WorkoutExercise }) => {
    return <TemplateExerciseCard exercise={item} onDelete={console.log} />;
  };

  const handleAdd = () => {
    navigation.navigate("AddExerciseModal", {
      mode: "template",
      id: templateId,
    });
  };

  const handleSave = () => {
    saveTemplate(templateId);
    navigation.goBack();
  };

  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      <Text variant="titleMedium">{template.name}</Text>
      <CustomTextInput value={template.note} placeholder="Workout Notes" />
      <Text variant="bodySmall">Exercises</Text>
    </View>
  );

  const renderListFooter = () => (
    <View style={styles.footerContainer}>
      <Button
        style={{ borderRadius: 10 }}
        mode="contained-tonal"
        onPress={handleAdd}
      >
        Add Exercise
      </Button>
      <Button
        style={{ borderRadius: 10 }}
        mode="elevated"
        onPress={handleSave}
      >
        Save Template
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
      </View>
      <View style={{ minHeight: 20, flex: 1 }}>
        <FlashList
          data={Object.values(template.exercises)}
          renderItem={renderTemplateExerciseCard}
          estimatedItemSize={120}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
        />
      </View>
    </View>
  );
};

export default TemplateCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerContainer: {},
  contentContainer: {},
  footerContainer: { gap: 10 },
});