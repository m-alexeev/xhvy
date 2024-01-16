import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type UnitsType = "metric" | "imperial";

export type MenuOption = {
  leadingIcon?: IconSource;
  title: string;
  onPress: () => void;
  trailingIcon?: IconSource;
};

export type AddMode = "active" | "template" | "workout";

export { UnitsType };
