import { FC, ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { StyleProps } from "react-native-reanimated";

interface RowProps {
  children: ReactNode;
  style?: StyleProps;
}

const Row: FC<RowProps> = ({ style, children }) => {
  return (
    <View style={[styles.row, style, {}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
});

export default Row;
