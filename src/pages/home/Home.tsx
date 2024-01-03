import { Text, useTheme } from "react-native-paper";
import { FC } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";

const HomeScreen: FC = ({}) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Home</Text>
      </View>

      <ActiveWorkoutPopup />
    </SafeAreaView>
  );
};

export default HomeScreen;
