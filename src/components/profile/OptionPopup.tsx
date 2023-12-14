import { Dialog, useTheme } from "react-native-paper";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
}

const OptionDialog: FC<DialogProps> = ({ visible, onClose }) => {
  return (
    <Dialog visible={visible} onDismiss={onClose}>
      <View style={styles.container}></View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OptionDialog;
