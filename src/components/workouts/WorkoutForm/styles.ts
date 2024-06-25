import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const tableStyles = (
  { theme, width = 1 }: { theme?: MD3Theme; width?: number },
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      opacity: 0.6,
      marginBottom: 5,
      flex: 5,
    },
    headerColumn: {
      flex: 1,
      textAlign: "center",
      flexGrow: width,
    },
    tableRow: {
      backgroundColor: theme?.colors.surfaceVariant,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 5,
      borderRadius: 3,
    },
    tableCol: {
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexGrow: width,
    },
    completeCol: {
      width: 10,
    },
    completedStyle: {
      backgroundColor: theme?.colors.primary,
      borderRadius: 5,
    },
    deleteContainer: {
      flex: 1,
      justifyContent: "center",
    },
    deleteView: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme?.colors.error,
      borderRadius: 3,
      alignItems: "flex-end",
    },
  });
