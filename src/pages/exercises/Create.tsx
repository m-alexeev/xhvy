import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormDropdown from "../../components/core/FormDropdown";
import { Button } from "react-native-paper";
import FormInput from "../../components/core/FormInput";
import { majorMuclesGroups, muscles } from "../../utils/categories";

const ExerciseCreate: FC = () => {
  const { control, handleSubmit } = useForm();
  //TODO: Exercise create form
  //TODO: Update state

  const majorMusclesObj = majorMuclesGroups.map((item) => ({
    label: item,
    value: item,
  }));
  const musclesObj = muscles.map((item) => ({ label: item, value: item }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.form}>
        <FormInput
          style={{marginVertical: 5}}
          control={control}
          rules={{ required: true }}
          placeholder="Name"
          name="name"
        />
        <FormDropdown
          style={{marginVertical: 5}} 
          control={control}
          label="Primary Muscle Group"
          name="primaryMuscleGroups"
          options={majorMusclesObj}
          multiSelect
        />
        <FormDropdown
          style={{marginVertical: 5}} 
          control={control}
          label="Primary Muscles"
          name="primaryMuscles"
          options={musclesObj}
        />
        <FormDropdown
          style={{marginVertical: 5}} 
          control={control}
          label="Secondary Muscle Group"
          name="secondaryMuscleGroups"
          options={majorMusclesObj}
        />
        <FormDropdown
          style={{marginVertical: 5}} 
          control={control}
          label="Secondary Muscles"
          name="secondaryMuscles"
          options={musclesObj}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  form: {
    marginHorizontal: 10,
  }
});

export default ExerciseCreate;
