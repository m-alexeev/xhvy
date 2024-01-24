import { StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { useTheme, Text } from "react-native-paper";
import CustomTextInput from "../core/TextInput";
import { Template } from "@app/types/templates";

interface TemplateHeaderProps {
  localTemplate: Template;
  onUpdate: (field: any, value: any) => void;
}

const TemplateHeader: FC<TemplateHeaderProps> = (
  { localTemplate, onUpdate },
) => {
  const { colors } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={{
          fontSize: 24,
          color: colors.onBackground,
          fontFamily: "Poppins_400Regular",
        }}
        value={localTemplate.name}
        onChangeText={(text) => onUpdate("name", text)}
      >
      </TextInput>
      <CustomTextInput
        value={localTemplate.note}
        placeholder="Workout Notes"
        onChangeText={(text) => onUpdate("note", text)}
      />
      <Text variant="bodySmall">Exercises</Text>
    </View>
  );
};

export default TemplateHeader;

const styles = StyleSheet.create({
  headerContainer: { marginBottom: 10, gap: 5 },
});
