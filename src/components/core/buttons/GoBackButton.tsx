import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../IconButton";

interface GoBackButtonProps {
  variant?: "left" | "down";
  size?: number;
}

const GoBackButton: FC<GoBackButtonProps> = (
  { variant = "down", size = 24 },
) => {
  const navigation = useNavigation();

  const icon = `chevron-${variant}`;

  // TODO: add go-back prevention :)

  return (
    <IconButton
      style={{ marginRight: 10 }}
      icon={icon}
      onPress={() => navigation.goBack()}
      size={size}
    />
  );
};

export default GoBackButton;
