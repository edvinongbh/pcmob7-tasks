import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_SCREEN, API, API_WHOAMI, CAMERA_SCREEN } from "../constants";
import axios from "axios";

const imgPlaceholder = "https://picsum.photos/200";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("loading...");
  const [photoUri, setPhotoUri] = useState(null);

  async function loadPhoto() {
    const photo = await AsyncStorage.getItem("photo_uri");
    setPhotoUri(photo);
  }

  async function loadUsername() {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      loadUsername();
      loadPhoto();
    });

    loadUsername();
    loadPhoto();
    return () => {
      removeListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>profile</Text>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
        your user name: {username}
      </Text>
      <Image
        source={{ uri: photoUri ?? imgPlaceholder }}
        style={{ height: 250, width: 250, borderRadius: 5, marginBottom: 50 }}
      />

      <TouchableOpacity
        style={styles.outlinedButton}
        onPress={() => navigation.navigate(CAMERA_SCREEN)}
      >
        <Text style={styles.outlinedButtonText}>Upload Photo</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(AUTH_SCREEN);
          AsyncStorage.removeItem("token");
          setUsername("loading...");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  outlinedButton: {
    backgroundColor: "red",
    borderRadius: 3,
    borderWidth: 1,
    width: 250,
  },
  outlinedButtonText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 12,
    padding: 15,
    color: "white",
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
