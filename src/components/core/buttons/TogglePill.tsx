import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import {
  ButtonProps,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface TogglePillButtonProps extends Omit<ButtonProps, "mode" | "children"> {
  mode?: Omit<ButtonProps["mode"], "text" | "outlined">;
  text: string;
  toggled: boolean;
  onToggle: () => void;
}

const TogglePillButton: FC<TogglePillButtonProps> = (
  { toggled, onToggle, text },
) => {
  const { colors } = useTheme();

  return (
    <View style={styles().container}>
      <TouchableRipple
        borderless
        style={styles(colors).button}
        rippleColor={colors.onPrimary}
        underlayColor={colors.primary}
        onPress={onToggle}
      >
        <View
          style={styles(colors).buttonContent}
        >
          <Text style={{ color: colors.onPrimary }} variant="bodyMedium">
            {text}
          </Text>
          {toggled && (
            <FontAwesomeIcon icon={faXmark} color={colors.onPrimary} />
          )}
        </View>
      </TouchableRipple>
    </View>
  );
};

export default TogglePillButton;

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    container: {},
    buttonContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: colors?.onPrimary,
      gap: 5,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: colors?.primary,
    },
  });
