import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "react-native-paper";

interface SwipableModalProps {
  visible: boolean;
  toggleModal: () => void;
}

const SwipableModal: FC<SwipableModalProps> = ({ visible, toggleModal }) => {
  const theme = useTheme();

  return (
    <Modal
      isVisible={visible}
      onDismiss={toggleModal}
      onBackdropPress={toggleModal}
      swipeThreshold={50}
      coverScreen={false}
      useNativeDriverForBackdrop
      onSwipeComplete={toggleModal}
      swipeDirection={["down"]}
      backdropColor={theme.colors.surface}
      style={styles.modal}
    >
      <View
        style={[styles.modalContainer, {
          backgroundColor: theme.colors.secondaryContainer,
        }]}
      >
        <View
          style={[styles.modalDragger, {
            backgroundColor: theme.colors.onSecondaryContainer,
          }]}
        >
        </View>
        <View style={styles.modalContent}>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    opacity: 1,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalDragger: {
    alignSelf: "center",
    width: 90,
    height: 3,
    borderRadius: 2,
  },
  modalContent: {},
});

export default SwipableModal;
