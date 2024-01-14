import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomTabParamList } from "@app/types/navigation";
import { getTemplates } from "@app/zustand/hooks";
import { Button, Text, useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { IWorkout } from "@app/types/workouts";

type ViewTemplateNavigationProps = NativeStackScreenProps<
  MainBottomTabParamList,
  "Templates"
>;

const TemplateHomePage: FC<ViewTemplateNavigationProps> = () => {
  const templates = getTemplates();
  const { colors } = useTheme();

  const renderTemplateItem = ({ item }: { item: IWorkout }) => {
    return <Text key={item.id}>{item.name}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          Quick Start
        </Text>
        <Button mode="elevated">Create Workout Template</Button>
      </View>
      <View style={styles.content}>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          Saved Templates
        </Text>
        <FlashList
          data={templates}
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
});
