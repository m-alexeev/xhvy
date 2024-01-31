import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import Modal from "react-native-modal";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface ConfirmationPopupProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = (
  { text, visible, onConfirm, onCancel, style },
) => {
  const { colors } = useTheme();

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={visible}
      coverScreen={true}
      onBackdropPress={onCancel}
      style={[styles().modal, style]}
      useNativeDriver
      backdropColor={colors.background}
      backdropOpacity={0.8}
    >
      <View style={styles(colors).container}>
        <View style={styles().headerContainer}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size={32}
            color={colors.error}
          />
          <Text variant="titleLarge" style={styles(colors).header}>
            Are you sure?
          </Text>
        </View>
        <Text style={styles(colors).text}>
          {text}
        </Text>
        <View style={styles().buttonContainer}>
          <Button
            style={[styles().button, {
              backgroundColor: colors.error,
            }]}
            textColor={colors.onError}
            mode="text"
            onPress={onCancel}
          >
            Cancel
          </Button>
          <Button style={styles().button} mode="contained" onPress={onConfirm}>
            Confirm
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationPopup;

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      minWidth: 280,
      backgroundColor: colors?.secondaryContainer,
      margin: 10,
      borderRadius: 10,
      padding: 10,
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    header: {
      marginLeft: 5,
      textAlign: "center",
    },
    text: {
      marginVertical: 10,
      color: colors?.outline,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      borderRadius: 5,
    },
  });
