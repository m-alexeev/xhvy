import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { MainTabsNavigationProp } from "@app/types/navigation";
import { getTemplates } from "@app/zustand/hooks";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { IWorkout } from "@app/types/workouts";

type ViewTemplateNavigationProps = MainTabsNavigationProp<"Templates">;

const TemplateHomePage: FC<ViewTemplateNavigationProps> = ({ navigation }) => {
  const templates = getTemplates();
  const { colors } = useTheme();

  const renderTemplateItem = ({ item }: { item: IWorkout }) => {
    return <Text key={item.id}>{item.name}</Text>;
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
        <Button
          mode="elevated"
          onPress={() =>
            navigation.navigate("WorkoutCreateModal", { template: true })}
        >
          Create Workout Template
        </Button>
      </View>
      <View style={styles.content}>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          Saved Templates
        </Text>
        <FlashList
          data={templates}
          ListEmptyComponent={emptyList}
          renderItem={renderTemplateItem}
          estimatedItemSize={200}
        />
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
    marginTop: 10,
    minHeight: 50,
  },
  emptyList: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
