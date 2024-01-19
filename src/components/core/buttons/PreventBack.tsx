import { BackHandler } from "react-native";
import React, { FC, useEffect, useState } from "react";
import ConfirmationPopup from "../ConfirmationPopup";

interface PreventBackProps {
  canGoBack: boolean;
  callback: () => void;
}

//NOTE: only works on android
const PreventBack: FC<PreventBackProps> = ({ callback, canGoBack }) => {
  const [visible, setVisible] = useState(false);

  const handleBackButtonPress = (): boolean | undefined | null => {
    if (!canGoBack) {
      setVisible(true);
    }
    return true;
  };

  const onCancel = () => setVisible(false);
  const onConfirm = () => {
    setVisible(false);
    callback();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ConfirmationPopup
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
      text="Are you sure you want to leave without saving changes?"
    />
  );
};

export default PreventBack;
