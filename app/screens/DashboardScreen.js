import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/DashboardScreenStyles";

const DashboardScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([
    { id: "1", text: "First Item" },
    { id: "2", text: "Second Item" },
    { id: "3", text: "Third Item" },
    { id: "4", text: "Fourth Item" },
  ]);
  const [input, setInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const showToast = (message) => {
    if (Platform.OS === "android") ToastAndroid.show(message, ToastAndroid.SHORT);
    else Alert.alert("", message);
  };

  const addOrUpdateTodo = () => {
    if (input.trim() === "") {
      showToast("Please enter item name");
      return;
    }

    if (selectedId) {
      setTodos((prev) =>
        prev.map((item) =>
          item.id === selectedId ? { ...item, text: input } : item
        )
      );
      setSelectedId(null);
    } else {
      setTodos([...todos, { id: Date.now().toString(), text: input }]);
    }

    setInput("");
  };

  const removeTodo = (id) => {
    const isSelected = selectedId === id;

    const removeItem = () => {
      setTodos(todos.filter((item) => item.id !== id));
      if (isSelected) {
        setSelectedId(null);
        setInput("");
      }
    };

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

  const selectTodo = (item) => {
    if (selectedId === item.id) {
      setSelectedId(null);
      setInput("");
    } else {
      setSelectedId(item.id);
      setInput(item.text);
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
              <TouchableOpacity onPress={() => selectTodo(item)}>
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
                    onPress={() => removeTodo(item.id)}
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={addOrUpdateTodo}
          >
            <Text style={styles.addText}>
              {selectedId ? "UPDATE" : "ADD"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
