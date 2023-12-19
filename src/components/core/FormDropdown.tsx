import { FC, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  label: string;
  name: string;
  options: DropdownOption[];
  control: Control<FieldValues>;
  rules?: RegisterOptions<FieldValues>;
  multiSelect?: boolean;
}

const FormDropdown: FC<DropdownProps> = (
  { name, control, options, multiSelect, label, rules },
) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme()
    
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange },
        fieldState: { error },
      }) => (
          <View>
        <DropDown
          label={label}
          visible={visible}
          value={value}
          showDropDown={() => setVisible(true)}
          onDismiss={() => setVisible(false)}
          setValue={onChange}
          multiSelect={multiSelect}
          list={options}
        />
          {error && (
            <Text style={{color: theme.colors.error}}>{error.message || "Error"}</Text>
          )}
        </View>
      )}
    />
  );
};

export default FormDropdown;
