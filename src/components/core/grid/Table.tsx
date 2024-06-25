import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface TableProps {
  style?: ViewProps;
}

const Table: FC<TableProps> = ({ style }) => {
  return <View style={[styles.table, style, {}]}></View>;
};

const styles = StyleSheet.create({
  table: {},
});
