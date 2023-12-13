import { Dialog, useTheme, makeStyles } from "@rneui/themed";
import { FC, useState } from "react";
import { View } from "react-native";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
}

const OptionDialog: FC<DialogProps> = ({ visible, onClose }) => {
  const styles = useStyles();

  return (
    <Dialog isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}></View>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  }
}));

export default OptionDialog
