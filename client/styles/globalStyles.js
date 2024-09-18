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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  column: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "104%",
    paddingHorizontal: 14,
    paddingVertical: 18,
    backgroundColor: "#222126",
    borderRadius: 8,
    marginBottom: 30,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
  },
  itemText: {
    fontSize: 16,
    color: "#3b3b3b",
  },
  productName: {
    width: "50%",
    textAlign: "left",
  },
  productQuantity: {
    width: "15%",
    textAlign: "right",
  },
  productPrice: {
    width: "35%",
    textAlign: "right",
  },
});
