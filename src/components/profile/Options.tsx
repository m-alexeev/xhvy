import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";

import OptionDialog from "./OptionPopup";
import { List, Text } from "react-native-paper";
import { useOptions } from "@app/contexts/OptionsContext";

const OptionsConfigurator: FC = () => {
  const { options, updateOptions } = useOptions();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {Object.keys(options).map((option, index) => (
        <List.Item
          key={index}
          title={`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
          right={() => <Text>{options[option]}</Text>}
          onPress={() => {
            setVisible(true);
          }}
        ></List.Item>
      ))}
      <OptionDialog visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  optionTitleStyle: {},
  optionValueStyle: {},
});

export default OptionsConfigurator;
