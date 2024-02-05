import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import OptionDialog from "./OptionPopup";
import { useOptions } from "@app/zustand/optionsStore";

const OptionComponent = (
  { title, option, onPress }: { title: string; option: any; onPress: any },
) => {
  return (
    <View style={styles.optionContainer}>
      <Text variant="bodyMedium">{title}</Text>
      <Button
        onPress={onPress}
      >
        {option}
      </Button>
    </View>
  );
};

const OptionsConfigurator: FC = () => {
  const [visible, setVisible] = useState(false);
  const units = useOptions((s) => s.units);
  const updateOption = useOptions((s) => s.updateOption);

  return (
    <View style={styles.container}>
      <OptionComponent
        title="Units"
        option={units}
        onPress={() =>
          updateOption("units", units === "metric" ? "imperial" : "metric")}
      />
      <OptionDialog visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTitleStyle: {},
  optionValueStyle: {},
});

export default OptionsConfigurator;
