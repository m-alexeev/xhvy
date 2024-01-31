import { View } from "react-native";
import React, { FC, useState } from "react";
import { Button, ButtonProps } from "react-native-paper";
import ConfirmationPopup from "./ConfirmationPopup";
import IconButton, { IconButtonProps } from "./IconButton";

interface ConfirmationTextButtonProps extends ButtonProps {
  variant: "text";
}

interface ConfirmationIconButtonProps extends IconButtonProps {
  variant: "icon";
}

type ConfirmationButtonProps =
  & (
    | ConfirmationTextButtonProps
    | ConfirmationIconButtonProps
  )
  & {
    onCancel?: () => void;
    onConfirm: () => void;
    displayPopup?: boolean;
    popupText?: string;
  };

const ConfirmationButton: FC<ConfirmationButtonProps> = ({
  popupText,
  onCancel,
  onConfirm,
  displayPopup = true,
  variant = "text",
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

  if (variant === "icon") {
    const iconProps = props as IconButtonProps;
    return (
      <View>
        <IconButton
          {...iconProps}
          icon={iconProps.icon}
          onPress={handlePress}
        />
        <ConfirmationPopup
          text={popupText}
          visible={modalVisible}
          onConfirm={onPopupConfirm}
          onCancel={onPopupCancel}
        />
      </View>
    );
  }
  const buttonProps = props as ButtonProps;
  return (
    <View>
      <Button {...buttonProps} onPress={handlePress}>
        {buttonProps.children}
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
