import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import OptionDialog from "./OptionPopup";
import { useOptions } from "@app/zustand/optionsStore";
import BaseMenu from "../core/menus/BaseMenu";
import { MenuOption } from "@app/types/general";
import { OptionsState } from "@app/types/store";
import { camelCase } from "@app/utils/stringParsers";

const OptionComponent = <
  T extends keyof OptionsState,
  K extends OptionsState[T],
>(
  { title, activeOption, options}: {
    title: T;
    activeOption: K;
    options: Array<MenuOption>;
  },
) => {
  const {colors} = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible((prev) => !prev);

  return (
    <View style={[styles.optionContainer, {borderColor: colors.elevation.level2}]}>
      <Text variant="bodyMedium">{camelCase(title)}</Text>
      <BaseMenu
        anchor={<Button onPress={toggleMenu}>{camelCase(activeOption)}</Button>}
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        options={options}
      />
    </View>
  );
};

const OptionsConfigurator: FC = () => {
  const [visible, setVisible] = useState(false);
  const units = useOptions((s) => s.units);
  const updateOption = useOptions((s) => s.updateOption);

  const unitsOptions: Array<MenuOption> = [
    {
      title: "Imperial",
      onPress: () => updateOption("units", "imperial"),
    },
    {
      title: "Metric",
      onPress: () => updateOption("units", "metric"),
    },
  ];

  return (
    <View style={styles.container}>
      <OptionComponent
        title="units"
        activeOption={units}
        options={unitsOptions}
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
    gap: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  optionTitleStyle: {},
  optionValueStyle: {},
});

export default OptionsConfigurator;
