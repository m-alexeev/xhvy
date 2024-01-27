import { StyleSheet, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { WorkoutExercise } from "@app/types/workouts";
import TemplateExerciseCard from "@app/components/templates/TemplateExerciseCard";
import { TemplateStackNavigationProp } from "@app/types/navigation/templates";
import { getOrCreateTemplate } from "@app/zustand/hooks";
import { useWorkout } from "@app/zustand/workoutStore";
import PreventBack from "@app/components/core/buttons/PreventBack";
import Header from "@app/components/core/Header";
import ConfirmationButton from "@app/components/core/ConfirmationButton";
import { Template } from "@app/types/templates";
import TemplateHeader from "@app/components/templates/TemplateHeader";
import { Exercise } from "@app/types/exercises";

type TemplateCreateNavProps = TemplateStackNavigationProp<"Create">;

const TemplateCreate: FC<TemplateCreateNavProps> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const params = route.params || {};
  const saveTemplate = useWorkout((s) => s.saveTemplate);
  const templateId = route.params.templateId;
  const [localTemplate, setLocalTemplate] = useState(
    getOrCreateTemplate(templateId),
  );

  // Load exercises from params passed by AddExercise page
  useEffect(() => {
    Object.values(params.exercises || {}).forEach((e: Exercise) => {
      const exercisePreviewObj: WorkoutExercise = {
        id: e.id,
        name: e.name,
        user_id: e.user_id,
        modifiable: e.modifiable,
        sets: [],
      };
      handleEditExercise(exercisePreviewObj, "add");
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
        const updatedExercises = { ...prev.exercises };

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
    saveTemplate(localTemplate);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={{ textAlign: "center" }} variant="bodyLarge">
        No Exercises here yet...
      </Text>
    </View>
  );

  const renderListFooter = () => (
    <View style={styles.footerContainer}>
      <Button
        mode="text"
        onPress={handleAdd}
      >
        Add Exercise
      </Button>
      <Button
        textColor={colors.tertiary}
        mode="text"
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
          ListHeaderComponent={
            <TemplateHeader
              localTemplate={localTemplate}
              onUpdate={handleUpdate}
            />
          }
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyList}
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
  emptyContainer: { marginVertical: 20 },
  headerContainer: { marginBottom: 10, gap: 5 },
  contentContainer: {},
  footerContainer: { gap: 10 },
});
