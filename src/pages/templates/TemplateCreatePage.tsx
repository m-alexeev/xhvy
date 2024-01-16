import { StyleSheet, View } from "react-native";
import React, { FC, useState } from "react";
import { Template } from "@app/types/templates";
import { Button, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { WorkoutExercise } from "@app/types/workouts";
import TemplateExerciseCard from "@app/components/templates/TemplateExerciseCard";
import uuid from "react-native-uuid";
import { TemplateStackNavigationProp } from "@app/types/navigation/templates";

type TemplateCreateNavProps = TemplateStackNavigationProp<"Create">;

const TemplateCreate: FC<TemplateCreateNavProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [template, setTemplate] = useState<Template>({
    id: uuid.v4().toString(),
    name: "",
    note: "",
    exercises: {},
    template: true,
  });

  const renderTemplateExerciseCard = ({ item }: { item: WorkoutExercise }) => {
    return <TemplateExerciseCard exercise={item} />;
  };

  return (
    <View style={styles.container}>
      <View>
      </View>
      <View style={{ minHeight: 20 }}>
        <FlashList
          data={Object.values(template.exercises)}
          renderItem={renderTemplateExerciseCard}
          estimatedItemSize={120}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          style={{ borderRadius: 10 }}
          mode="contained-tonal"
          onPress={() =>
            navigation.navigate("AddExerciseModal", { mode: "template" })}
        >
          Add Exercise
        </Button>
        <Button style={{ borderRadius: 10 }} mode="elevated">
          Save Template
        </Button>
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
