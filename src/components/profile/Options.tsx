import { FC, useState } from "react";
import { OptionsType, useOptions } from "../../contexts/OptionsContext";
import { StyleSheet, View } from "react-native"

import OptionDialog from "./OptionPopup";
import { List, Text } from "react-native-paper";

const OptionsConfigurator: FC = () => {
  const { options, updateOptions } = useOptions();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {Object.keys(options).map((option, index) => (
        <List.Item
          key={index}
          title={`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
          right={props => <Text>options[option as keyof OptionsType]</Text>}
          onPress={() => {setVisible(true)}}
        >
        </List.Item>
      ))}
      <OptionDialog visible={visible} onClose={() => setVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  },
  optionTitleStyle: { 
  },
  optionValueStyle: {
  },
});

export default OptionsConfigurator;
