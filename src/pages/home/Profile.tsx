import { Button, Divider, Text} from "react-native-paper";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserDetails from "../../components/profile/UserDetails";
import OptionsConfigurator from "../../components/profile/Options";
import { useThemeSwitch } from "../../contexts/ThemeContext";
import auth from "@react-native-firebase/auth";


const ProfileScreen: FC = ({}) => {


  const {toggleTheme} = useThemeSwitch();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <UserDetails />
        <Divider />
        <View>
          <Text >Options</Text>
          <Button onPress={toggleTheme}>Toggle theme</Button>
          <OptionsConfigurator/>
        </View>
        <Button onPress={()=> {auth().signOut()}}>Sign out</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

  }
})

export default ProfileScreen;
