import { StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { Button, ButtonProps } from "react-native-paper";
import ConfirmationPopup from "./ConfirmationPopup";

interface ConfirmationButtonProps extends ButtonProps {
  popupText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ConfirmationButton: FC<ConfirmationButtonProps> = (
  { children, popupText, onCancel, onConfirm, ...props },
) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const onPopupCancel = () => {
    setModalVisible(false);
    if (onCancel){
      onCancel();
    }
  }
  
  const onPopupConfirm = () => {
    setModalVisible(false);
    if (onConfirm){
      onConfirm();
    }
  }

  return (
    <View>
      <Button {...props} onPress={() => setModalVisible(true)}>{children}</Button>
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
