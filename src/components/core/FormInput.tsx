import { FC } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { TextInput, TextInputProps, Text, useTheme} from "react-native-paper";

interface IFormInput extends TextInputProps {
  name: string;
  control: Control<FieldValues>;
  rules: RegisterOptions<FieldValues>;
}

const FormInput: FC<IFormInput> = ({ name, control, rules, ...props }) => {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            placeholderTextColor={theme.colors.secondary}
            {...props}
          />
            {error && (
              <Text style={{color: theme.colors.error}}>{error.message || "Error"}</Text>
            )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default FormInput;
