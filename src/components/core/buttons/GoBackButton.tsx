import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../IconButton";

interface GoBackButtonProps {
  variant?: "left" | "down";
}

const GoBackButton: FC<GoBackButtonProps> = ({ variant = "down" }) => {
  const navigation = useNavigation();

  const icon = `chevron-${variant}`;

  return <IconButton icon={icon} onPress={() => navigation.goBack()} />;
};

export default GoBackButton;
