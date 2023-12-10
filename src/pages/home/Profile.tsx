import { Button, Divider, makeStyles, Text, useTheme } from "@rneui/themed";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserDetails from "../../components/profile/UserDetails";

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
  const { theme, updateTheme } = useTheme();
  const styles = useStyles();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <UserDetails user={TEMP_USER} />
        <Divider />
        <View>
          <Text h4>Options</Text>
          <Button
            title="Toggle theme"
            onPress={() =>
              updateTheme({ mode: theme.mode === "dark" ? "light" : "dark" })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  profileContainer: {},
}));

export default ProfileScreen;
