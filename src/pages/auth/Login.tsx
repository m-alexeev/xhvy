import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/core/FormInput";


const Login = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  GoogleSignin.configure({
    webClientId:
      "755490275970-3uaac0dck30bvpi9f6n5uu380gvjcsdt.apps.googleusercontent.com",
  });

  const onGoogleButtonPress = async () => {
    setLoading(true);
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);
    user.then((user) => console.log(user)).catch(console.log);
    // Re-enable button
    setLoading(false);
  };

  const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text variant="displaySmall" style={styles.title}>Login</Text>
          <FormInput
            style={styles.textInput}
            name="email"
            control={control}
            label="Email"
            placeholder="johndoe@email.com"
          />
          <FormInput
            style={styles.textInput}
            name="password"
            control={control}
            secureTextEntry
            label="Password"
            placeholder="********"
          />
          <Button mode="contained-tonal" onPress={handleSubmit(onFormSubmit)}>Login</Button>
        </View>
        <Button
          icon="google"
          mode="contained"
          disabled={loading}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!")
            )}
        >
          Login with Google
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    margin: 10, 
    flex: 1,
  },
  textInput: {
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 20
  },
});
