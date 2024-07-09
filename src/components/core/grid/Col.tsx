import { FC, ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface ColumnProps {
  span: number;
  children?: ReactNode;
  style?: ViewProps;
}

const Col: FC<ColumnProps> = ({ span, children, style }) => {
  return (
    <View style={[styles.col, style, { flex: span }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  col: { flex: 1, marginVertical: 0, marginHorizontal: 0 },

});

export default Col;
