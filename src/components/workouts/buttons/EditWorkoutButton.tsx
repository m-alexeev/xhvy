import React, { FC } from "react";
import { Button, ButtonProps } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@app/types/navigation";

interface EditWorkoutButtonProps extends ButtonProps {
  workoutId: string;
}

const EditWorkoutButton: FC<EditWorkoutButtonProps> = (
  { workoutId, ...props },
) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Button
      style={{borderRadius: 5}}
      {...props}
      onPress={() =>
        navigation.navigate("WorkoutEditModal", { workoutId: workoutId })}
    >
      {props.children}
    </Button>
  );
};

export default EditWorkoutButton;

