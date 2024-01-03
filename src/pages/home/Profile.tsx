import { Button, Divider, Text } from "react-native-paper";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  MainBottomTabParamList,
  RootStackParamList,
} from "@app/types/navigation";
import { useThemeSwitch } from "@app/contexts/ThemeContext";
import UserDetails from "@app/components/profile/UserDetails";
import OptionsConfigurator from "@app/components/profile/Options";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainBottomTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen: FC<ProfileScreenProps> = () => {
  const { toggleTheme } = useThemeSwitch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <UserDetails />
        <Divider />
        <View>
          <Text>Options</Text>
          <Button onPress={toggleTheme}>Toggle theme</Button>
          <OptionsConfigurator />
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
  },
});

export default ProfileScreen;
