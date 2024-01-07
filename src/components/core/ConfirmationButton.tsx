import { StyleSheet, View } from "react-native";
import React, { FC, useState } from "react";
import { Button, ButtonProps } from "react-native-paper";
import ConfirmationPopup from "./ConfirmationPopup";

interface ConfirmationButtonProps extends ButtonProps {
  displayPopup?: boolean;
  popupText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

const ConfirmationButton: FC<ConfirmationButtonProps> = ({
  children,
  popupText,
  onCancel,
  onConfirm,
  displayPopup = true,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onPopupCancel = () => {
    setModalVisible(false);
    if (onCancel) {
      onCancel();
    }
  };

  const onPopupConfirm = () => {
    setModalVisible(false);
    if (onConfirm) {
      onConfirm();
    }
  };

  const handlePress = () => {
    if (displayPopup) {
      setModalVisible(true);
    } else {
      onConfirm();
    }
  };

  return (
    <View>
      <Button {...props} onPress={handlePress}>
        {children}
      </Button>
      <ConfirmationPopup
        text={popupText}
        visible={modalVisible}
        onConfirm={onPopupConfirm}
        onCancel={onPopupCancel}
      />
    </View>
  );
};

export default ConfirmationButton;

const styles = StyleSheet.create({});
