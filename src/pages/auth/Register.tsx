import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '755490275970-3uaac0dck30bvpi9f6n5uu380gvjcsdt.apps.googleusercontent.com',
});

const Register = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Register</Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
