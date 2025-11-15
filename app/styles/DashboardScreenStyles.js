// DashboardScreenStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0047AB",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#808080",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#444",
  },
  remove: {
    fontSize: 14,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    height: 80,
    backgroundColor: "#f8f8f8",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 18,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CDCDCDAD",
    color: "#000",
  },
  addButton: {
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 18,
    backgroundColor: "#0047AB",
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
