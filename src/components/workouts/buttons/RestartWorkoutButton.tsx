import React, { FC } from "react";
import { Button, ButtonProps } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@app/types/navigation";

interface RestartWorkoutButtonProps extends ButtonProps {
  workoutId: string;
}

const RestartWorkoutButton: FC<RestartWorkoutButtonProps> = (
  { workoutId, ...props },
) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Button
      style={{ borderRadius: 5 }}
      {...props}
      mode="contained"
      onPress={() =>
        navigation.navigate("WorkoutCreateModal", { templateId: workoutId })}
    >
      Perform Again
    </Button>
  );
};

export default RestartWorkoutButton;
