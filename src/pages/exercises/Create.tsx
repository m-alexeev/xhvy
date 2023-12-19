import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormDropdown from "../../components/core/FormDropdown";
import { Button } from "react-native-paper";
import FormInput from "../../components/core/FormInput";

const ExerciseCreate: FC = () => {
  const { control, handleSubmit } = useForm();
  //TODO: Exercise create form
  //TODO: Update state

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FormInput
        rules={{required: true}}
        placeholder="Name"
        name="name"
        control={control}
      />
      <FormDropdown
        control={control}
        label="Colors"
        name="colors"
        options={[]}
        multiSelect
      />
      <Button onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ExerciseCreate;
