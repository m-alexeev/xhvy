import { Button, Divider, Text } from "react-native-paper";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import UserDetails from "@app/components/profile/UserDetails";
import OptionsConfigurator from "@app/components/profile/Options";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";
import { MainTabsNavigationProp } from "@app/types/navigation/main";
import { useOptions } from "@app/zustand/optionsStore";

type ProfileScreenProps = MainTabsNavigationProp<"Profile">;

const ProfileScreen: FC<ProfileScreenProps> = () => {
  const theme = useOptions((state) => state.theme);
  const updateOptions = useOptions((state) => state.updateOption);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <UserDetails />
        <Divider />
        <View>
          <Text style={{marginVertical: 10}}variant="titleLarge">Options</Text>
          <OptionsConfigurator />
          <Button
            onPress={() =>
              updateOptions("theme", theme === "dark" ? "light" : "dark")}
          >
            Toggle theme
          </Button>
        </View>
        <Button
          onPress={() => {
            auth().signOut();
          }}
        >
          Sign out
        </Button>
      </View>
      <ActiveWorkoutPopup />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default ProfileScreen;
