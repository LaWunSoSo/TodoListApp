import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTodoListStore from "../stores/todoListStore";
import styles from "../styles/DashboardScreenStyles";

const DashboardScreen = ({ navigation }) => {
  // Zustand store hooks
  const { todos, selectedId, addOrUpdateTodo, removeTodo, selectTodo } = useTodoListStore();

  // Local state for input text
  const [input, setInput] = useState("");

  // To show alert message when user doesn't type anything to add or update
  const showToast = (message) => {
    Alert.alert("Alert", message, [{ text: "OK" }]);
  };

  // Handler for Add / Update button
  const handleAddOrUpdate = () => {
    if (input.trim() === "") {
      showToast("Please enter item name");
      return;
    }

    addOrUpdateTodo(input);
    setInput("");
  };

  // Handler for selecting a todo
  const handleSelectTodo = (item) => {
    selectTodo(item);
    setInput(item.text);
  };

  // Handler for removing a todo with confirmation if selected
  const handleRemoveTodo = (id) => {
    const isSelected = selectedId === id;

    const removeItem = () => removeTodo(id);

    if (isSelected) {
      Alert.alert(
        "Confirm Delete",
        "Are you sure to remove the selected item?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: removeItem },
        ]
      );
    } else {
      removeItem();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
      >
        <Text style={styles.header}>TODO:</Text>

        {todos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Please add item to display</Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectTodo(item)}>
                <View
                  style={[
                    styles.todoItem,
                    {
                      backgroundColor:
                        selectedId === item.id ? "#d0e1ff" : "#f8f8f8",
                    },
                  ]}
                >
                  <View style={[styles.circle, { backgroundColor: "#0047AB" }]} />
                  <Text style={styles.todoText}>{item.text}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveTodo(item.id)}
                    style={{ paddingHorizontal: 20, paddingVertical: 10 }}
                  >
                    <Text style={styles.remove}>REMOVE</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter here"
            placeholderTextColor="#CDCDCD"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddOrUpdate}>
            <Text style={styles.addText}>{selectedId ? "UPDATE" : "ADD"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
