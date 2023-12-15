import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Button } from "react-native-paper";


const Login = () => {
  GoogleSignin.configure({
    webClientId:"755490275970-3uaac0dck30bvpi9f6n5uu380gvjcsdt.apps.googleusercontent.com",
  });
  
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);
    user.then((user) => console.log(user)).catch(console.log);
  }
  
  return (
    <SafeAreaView>
      <View>
        <Button
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!")
            )}
        >Google Signin</Button>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
