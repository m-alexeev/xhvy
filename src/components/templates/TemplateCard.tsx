import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Template } from "@app/types/templates";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { WorkoutExercise } from "@app/types/workouts";
import { FlashList } from "@shopify/flash-list";
import TemplateMenuOptions from "./TemplateMenuOptions";
import { useNavigation } from "@react-navigation/native";
import { TemplateNavProp } from "@app/types/navigation/templates";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: FC<TemplateCardProps> = ({ template }) => {
  const navigation = useNavigation<TemplateNavProp>();
  const { colors } = useTheme();
  const exercises = Object.values(template.exercises);

  const renderExerciseItem = ({ item }: { item: WorkoutExercise }) => {
    return (
      <View style={{ marginLeft: 10 }}>
        <Text variant="bodyMedium">{item.name}</Text>
      </View>
    );
  };

  const handlePress = () => {
    navigation.navigate("Create", { templateId: template.id });
  };

  return (
    <View>
      <TouchableRipple
        style={styles(colors).outerContainer}
        borderless
        onPress={handlePress}
      >
        <View style={styles().innerContainer}>
          <View style={styles().header}>
            <Text variant="titleMedium">
              {template.name}
            </Text>
            <TemplateMenuOptions templateId={template.id} />
          </View>
          <View style={styles().content}>
            <Text variant="labelMedium" style={{ color: colors.outline }}>
              Exercises
            </Text>
            <View style={{ minHeight: 20 }}>
              <FlashList
                data={exercises}
                estimatedItemSize={50}
                renderItem={renderExerciseItem}
              />
            </View>
          </View>
          <View style={styles().footer}>
            <Button mode="elevated" style={{ borderRadius: 10 }}>
              Use Template
            </Button>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default TemplateCard;

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: colors?.elevation.level4,
      overflow: "hidden",
      padding: 10,
      justifyContent: "center",
    },
    innerContainer: {},
    header: { flexDirection: "row", flex: 1, justifyContent: "space-between" },
    headerText: {},
    headerOptions: {},
    content: {},
    footer: { marginTop: 10 },
  });
