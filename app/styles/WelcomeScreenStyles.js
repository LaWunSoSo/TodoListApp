// WelcomeScreenStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#0047AB",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
