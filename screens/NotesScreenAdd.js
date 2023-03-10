import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/notesSlice";

export default function NotesScreenAdd() {
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteName, setNoteName] = useState("");
  const [noteDate, setNoteDate] = useState("");
  const [noteTime, setNoteTime] = useState("");
  const dispatch = useDispatch();

  const canSave = [noteTitle, noteBody, noteName, noteDate].every(Boolean);

  async function savePost() {
    if (canSave) {
      try {
        const post = {
          id: nanoid(),
          title: noteTitle,
          content: noteBody,
          name: noteName,
          date: noteDate,
          time: noteTime,
        };

        await dispatch(addNewPost(post));
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        navigation.goBack();
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </TouchableOpacity>
      <TextInput
        style={styles.noteTitle}
        placeholder={"note title"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
      />
      <TextInput
        style={styles.noteName}
        placeholder={"Add name"}
        value={noteName}
        onChangeText={(text) => setNoteName(text)}
        selectionColor={"gray"}
        multiline={true}
      />
      <TextInput
        style={styles.noteDate}
        placeholder={"Add Task Date"}
        value={noteDate}
        onChangeText={(text) => setNoteDate(text)}
        selectionColor={"gray"}
        multiline={true}
      />
      <TextInput
        style={styles.noteTime}
        placeholder={"Add Task Time"}
        value={noteTime}
        onChangeText={(text) => setNoteTime(text)}
        selectionColor={"gray"}
        multiline={true}
      />

      <TextInput
        style={styles.noteBody}
        placeholder={"Add notes"}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
        selectionColor={"gray"}
        multiline={true}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => await savePost()}
      >
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CEE3F6",
    paddingTop: 60,
    padding: 25,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
  },
  noteBody: {
    fontSize: 15,
    fontWeight: "400",
  },
  noteName: {
    fontSize: 15,
    fontWeight: "400",
  },
  noteDate: {
    fontSize: 15,
    fontWeight: "400",
  },
  noteTime: {
    fontSize: 15,
    fontWeight: "400",
  },

  button: {
    backgroundColor: "blue",
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
