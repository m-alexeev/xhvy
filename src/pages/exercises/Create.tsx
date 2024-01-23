import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useExercise} from "@app/zustand/exerciseStore";
import {
  equipment,
  exerciseTypes,
  forces,
  majorMuclesGroups,
  movements,
  muscles,
  tags,
} from "@app/utils/categories";
import { Exercise } from "@app/types/exercises";
import FormInput from "@app/components/core/FormInput";
import FormDropdown from "@app/components/core/FormDropdown";

const ExerciseCreate: FC = () => {
  const user = auth().currentUser!;
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const createExercise = useExercise((state) => state.createExercise);

  const majorMusclesObj = majorMuclesGroups.map((item) => ({
    label: item,
    value: item,
  }));
  const musclesObj = muscles.map((item) => ({ label: item, value: item }));
  const tagsArr = tags.map((item) => ({ label: item, value: item }));
  const forceArr = forces.map((item) => ({ label: item, value: item }));
  const typeArr = exerciseTypes.map((item) => ({ label: item, value: item }));
  const equipmentArr = equipment.map((item) => ({ label: item, value: item }));
  const movementArr = movements.map((item) => ({ label: item, value: item }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newExercise: Exercise = {
      id: data.name,
      name: data.name,
      primaryMuscleGroups: data.primaryMuscleGroups,
      modifiable: true,
      user_id: user.uid,
    };
    createExercise(newExercise);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.form}>
        <FormInput
          style={{ marginVertical: 5 }}
          control={control}
          rules={{ required: true }}
          placeholder="Name"
          name="name"
          mode="outlined"
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Equipment"
          name="equipment"
          options={equipmentArr}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Primary Muscle Group"
          name="primaryMuscleGroups"
          options={majorMusclesObj}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Primary Muscles"
          name="primaryMuscles"
          options={musclesObj}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Secondary Muscle Group"
          name="secondaryMuscleGroups"
          options={majorMusclesObj}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Secondary Muscles"
          name="secondaryMuscles"
          options={musclesObj}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Forces"
          name="forces"
          options={forceArr}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Type"
          name="types"
          options={typeArr}
        />
        <FormDropdown
          style={{ marginVertical: 5 }}
          control={control}
          label="Movement"
          name="movement"
          options={movementArr}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  form: {
    marginHorizontal: 10,
  },
});

export default ExerciseCreate;
