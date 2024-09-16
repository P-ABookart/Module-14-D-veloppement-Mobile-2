import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(218, 88, 59)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Oswald-Regular",
    color: "#fff",
  },
  listItem: {
    backgroundColor: "rgb(218, 88, 59)",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  listItemText: {
    fontSize: 4,
    fontFamily: "Oswald-Regular",
    color: "#fff",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Oswald-Regular",
  },
});
