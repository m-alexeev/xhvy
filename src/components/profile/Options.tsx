import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";

import OptionDialog from "./OptionPopup";

const OptionsConfigurator: FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
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
