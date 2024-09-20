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
    paddingVertical: 16,
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  modalContainer: {
    width: "96%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 35,
  },
  subhead: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
    lineHeight: 20,
  },
  total: {
    fontSize: 16,
    fontFamily: "Oswald-Regular",
    lineHeight: 20,
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
  closeButtonText: {
    color: "gray",
    fontSize: 30,
  },
  topMyOrders: {
    backgroundColor: "#222126",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginLeft: 0,
  },
});
