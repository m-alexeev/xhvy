import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { MainTabsNavigationProp } from "@app/types/navigation/main";
import { Template } from "@app/types/templates";
import TemplateCard from "@app/components/templates/TemplateCard";

type ViewTemplateNavigationProps = MainTabsNavigationProp<"Templates">;

const templates: Template[] = [
  {
    id: "1",
    name: "Basic Template",
    exercises: {
      exercise1: {
        id: "exercise1",
        name: "Push-ups",
        sets: [
          {
            id: "set1",
            type: "rep",
            reps: 10,
            weight: undefined,
            completed: false,
          },
          {
            id: "set2",
            type: "rep",
            reps: 12,
            weight: undefined,
            completed: false,
          },
          // Add more sets as needed
        ],
      },
      exercise2: {
        id: "exercise2",
        name: "Bodyweight Squats",
        sets: [
          {
            id: "set1",
            type: "rep",
            reps: 15,
            weight: undefined,
            completed: false,
          },
          {
            id: "set2",
            type: "rep",
            reps: 20,
            weight: undefined,
            completed: false,
          },
          // Add more sets as needed
        ],
      },
      // Add more exercises as needed
    },
    note: "This is a basic template for your workout",
    template: true,
  },
  {
    id: "2",
    name: "Interval Training",
    exercises: {
      exercise1: {
        id: "exercise1",
        name: "High Knees",
        sets: [
          {
            id: "set1",
            type: "time",
            reps: undefined,
            weight: undefined,
            completed: false,
            bodyweight: true,
            previous: 30,
          },
          {
            id: "set2",
            type: "time",
            reps: undefined,
            weight: undefined,
            completed: false,
            bodyweight: true,
            previous: 45,
          },
          // Add more sets as needed
        ],
      },
      exercise2: {
        id: "exercise2",
        name: "Jumping Jacks",
        sets: [
          {
            id: "set1",
            type: "time",
            reps: undefined,
            weight: undefined,
            completed: false,
            bodyweight: true,
            previous: 60,
          },
          {
            id: "set2",
            type: "time",
            reps: undefined,
            weight: undefined,
            completed: false,
            bodyweight: true,
            previous: 75,
          },
          // Add more sets as needed
        ],
      },
      // Add more exercises as needed
    },
    note: "This template includes interval training exercises",
    template: true,
  },
];

const TemplateHomePage: FC<ViewTemplateNavigationProps> = ({ navigation }) => {
  const { colors } = useTheme();

  const renderTemplateItem = ({ item }: { item: Template }) => {
    return <TemplateCard template={item} />;
  };

  const emptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text variant="bodyLarge" style={{ color: colors.outline }}>
          There is nothing here yet...
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          Quick Start
        </Text>
        <Button mode="elevated">
          Create Workout Template
        </Button>
      </View>
      <View style={styles.content}>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          Saved Templates
        </Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <FlashList
            data={templates}
            ListEmptyComponent={emptyList}
            renderItem={renderTemplateItem}
            estimatedItemSize={200}
          />
        </View>
      </View>
    </View>
  );
};

export default TemplateHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: { gap: 5 },
  content: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },
  emptyList: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
