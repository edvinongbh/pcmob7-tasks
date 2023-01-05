import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, API_LOGIN, API_SIGNUP, HOME_STACK } from "../constants";

export default function AuthScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    return () => setLoading(true);
  }, []);

  async function signUp() {
    setLoading(true);
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.");
    } else {
      try {
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
        } else {
          login();
        }
      } catch (error) {
        console.log("Failed logging in. Error: ", error.response);
        setErrorText(error.response.data.description);
      }
    }
  }
  async function login() {
    setErrorText("");
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      await AsyncStorage.setItem("token", response.data.access_token);
      navigation.navigate(HOME_STACK);
    } catch (error) {
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.LogoPic}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/12/28/12/31/sketch-3045125_960_720.jpg",
        }}
      />

      <Text style={styles.title}>
        {isLoginScreen ? "Family member login account" : "Register new account"}
      </Text>

      <TextInput
        style={styles.inputView}
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />

      <TextInput
        style={styles.inputView}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(pw) => setPassword(pw)}
      />

      {!isLoginScreen && (
        <TextInput
          style={styles.inputView}
          placeholder="Password Confirm"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(pw) => setConfirmPassword(pw)}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          isLoginScreen ? await login() : await signUp();
        }}
      >
        {loading ? (
          <ActivityIndicator style={styles.buttonText} />
        ) : (
          <Text style={styles.buttonText}>
            {isLoginScreen ? "Login" : "Register"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsLoginScreen(!isLoginScreen);
          setErrorText("");
        }}
      >
        <Text style={styles.switchText}>
          {isLoginScreen
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>

      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switchText: {
    fontSize: 12,
    marginTop: 10,
    color: "gray",
  },
  errorText: {
    marginTop: 20,
    fontSize: 15,
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30,
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "200",
    fontSize: 17,
    padding: 20,
    color: "white",
  },

  LogoPic: {
    height: 200,
    width: 200,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 2,
  },
});
