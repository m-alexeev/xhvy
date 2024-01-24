import { StyleSheet, View } from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { WorkoutExercise } from "@app/types/workouts";
import TemplateExerciseCard from "@app/components/templates/TemplateExerciseCard";
import { TemplateStackNavigationProp } from "@app/types/navigation/templates";
import { getTemplateById } from "@app/zustand/hooks";
import { useWorkout } from "@app/zustand/workoutStore";
import CustomTextInput from "@app/components/core/TextInput";
import PreventBack from "@app/components/core/buttons/PreventBack";
import Header from "@app/components/core/Header";
import ConfirmationButton from "@app/components/core/ConfirmationButton";
import { Template } from "@app/types/templates";

type TemplateCreateNavProps = TemplateStackNavigationProp<"Create">;

const TemplateCreate: FC<TemplateCreateNavProps> = ({ navigation, route }) => {
  const saveTemplate = useWorkout((s) => s.saveTemplate);
  const cancelTemplate = useWorkout((s) => s.deleteWorkout);
  const templateId = route.params.templateId;
  const template = getTemplateById(templateId);
  const [localTemplate, setLocalTemplate] = useState(template);
  const params = route.params || {};

  useEffect(() => {
    Object.values(params.exercises || {}).forEach((e) => {
      handleEditExercise(e, "add");
    });
  }, [params.exercises]);

  useEffect(() => {
    // Add back button that can handle going back with confirmation
    navigation.setOptions({
      header: () => (
        <Header
          title="New Template"
          backButton={
            <ConfirmationButton
              onConfirm={handleCancel}
              icon={"chevron-left"}
              variant="icon"
              size={32}
              style={{ marginRight: 5 }}
            >
            </ConfirmationButton>
          }
        />
      ),
    });
  }, []);

  const handleUpdate = <T extends keyof Template, K extends Template[T]>(
    field: T,
    value: K,
  ) => {
    setLocalTemplate((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditExercise = (
    exercise: WorkoutExercise,
    mode: "add" | "delete",
  ) => {
    if (mode === "add") {
      setLocalTemplate((prev) => ({
        ...prev,
        exercises: { ...prev.exercises, [exercise.id]: exercise },
      }));
    }
    if (mode === "delete") {
      setLocalTemplate((prev) => {
        const updatedExercises = prev.exercises;
        delete updatedExercises[exercise.id];
        return {
          ...prev,
          exercises: updatedExercises,
        };
      });
    }
  };

  const renderTemplateExerciseCard = ({ item }: { item: WorkoutExercise }) => {
    return (
      <TemplateExerciseCard
        exercise={item}
        updateExercise={handleEditExercise}
      />
    );
  };

  const handleAdd = () => {
    navigation.navigate("AddExerciseModal", {
      selectedExercises: Object.keys(localTemplate.exercises),
      templateId: templateId,
    });
  };

  const handleSave = () => {
    saveTemplate(templateId);
    navigation.goBack();
  };

  const handleCancel = () => {
    if (template.wip) {
      cancelTemplate(templateId, true);
    }
    navigation.goBack();
  };

  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      <Text variant="titleMedium">{localTemplate.name}</Text>
      <CustomTextInput value={localTemplate.note} placeholder="Workout Notes" />
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
      <PreventBack
        canGoBack={false}
        callback={handleCancel}
      />
      <View style={{ minHeight: 20, flex: 1 }}>
        <FlashList
          data={Object.values(localTemplate.exercises)}
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
