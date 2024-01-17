import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Template } from "@app/types/templates";
import TemplateCard from "@app/components/templates/TemplateCard";
import { TemplateStackNavigationProp } from "@app/types/navigation/templates";
import uuid from "react-native-uuid";
import { useWorkout } from "@app/zustand/workoutStore";

type TemplateHomePageNavProps = TemplateStackNavigationProp<"View">;

const TemplateHomePage: FC<TemplateHomePageNavProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const createTemplate = useWorkout((s) => s.createTemplate);

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

  const handlePress = () => {
    const templateId = uuid.v4().toString();
    // Create template
    createTemplate({
      id: templateId,
      name: "",
      note: "",
      exercises: {},
      template: true,
    });
    navigation.navigate("Create", { templateId: templateId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          Quick Start
        </Text>
        <Button mode="elevated" onPress={handlePress}>
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
            data={Object.values(templates)}
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
