import { StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { Button, ButtonProps } from "react-native-paper";
import ConfirmationPopup from "./ConfirmationPopup";

interface ConfirmationButtonProps extends ButtonProps {
  buttonText: string;
  popupText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationButton: FC<ConfirmationButtonProps> = (
  { buttonText, popupText, onCancel, onConfirm, ...props },
) => {
  const [modalVisible, setModalVisible] = useState(false);
  

  return (
    <View>
      <Button {...props}>{buttonText}</Button>
      <ConfirmationPopup
        text={popupText}
        visible={modalVisible}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

export default ConfirmationButton;

const styles = StyleSheet.create({});
