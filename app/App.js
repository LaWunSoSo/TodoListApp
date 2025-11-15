import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardScreen from "./screens/DashboardScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView
      edges={["right", "bottom", "left"]}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
});
