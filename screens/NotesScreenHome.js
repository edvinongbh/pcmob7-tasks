import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NOTES_SCREEN, API_STATUS } from "../constants";
import { fetchPosts } from "../features/notesSlice";

export default function NotesScreenHome() {
  const posts = useSelector((state) => state.notes.posts);
  const notesStatus = useSelector((state) => state.notes.status);
  const isLoading = notesStatus === API_STATUS.pending;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (notesStatus === API_STATUS.idle) {
      dispatch(fetchPosts());
    }
  }, [notesStatus, dispatch]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate(NOTES_SCREEN.Details, item)}
      >
        <Text style={styles.noteCardTitle}>{item.title}</Text>
        <Text style={styles.noteCardBodyText}>
          {item.content.substring(0, 120)}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>remember leh!!</Text>

      {isLoading && <ActivityIndicator />}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(NOTES_SCREEN.Add);
        }}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  noteCardTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 7,
  },
  noteCardBodyText: {
    fontSize: 12,
    fontWeight: "300",
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
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
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
