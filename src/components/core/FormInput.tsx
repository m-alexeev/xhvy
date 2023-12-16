import { FC } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

interface IFormInput extends TextInputProps {
  name: string;
  control: Control<FieldValues>;
}


const FormInput: FC<IFormInput> = ({ name, control, ...props }) => {
  const { field } = useController({
    control: control,
    defaultValue: "",
    name: name,
  });

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default FormInput;
