import { Button, Divider, Text} from "react-native-paper";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserDetails from "../../components/profile/UserDetails";
import OptionsConfigurator from "../../components/profile/Options";
import { useThemeSwitch } from "../../contexts/ThemeContext";

export type User = {
  name: string;
  email: string;
  gender?: "male" | "female";
  age?: number;
};

const TEMP_USER: User = {
  name: "Mikhail Alexeev",
  email: "malexeev98@gmail.com",
  gender: "male",
  age: 25,
};

const ProfileScreen: FC = ({}) => {
  const {toggleTheme} = useThemeSwitch();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <UserDetails user={TEMP_USER} />
        <Divider />
        <View>
          <Text >Options</Text>
          <Button onPress={toggleTheme}>Toggle theme</Button>
          <OptionsConfigurator/>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

  }
})

export default ProfileScreen;
