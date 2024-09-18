import React, { useState, useContext } from "react";
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const OrderConfirmationModal = ({ visible, onClose, orderItems, restaurantId, customerId }) => {
  const { authData } = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState("idle"); // idle, processing, success, error

  const total = orderItems.reduce((acc, item) => acc + item.cost * item.quantity, 0).toFixed(2);

  const postOrder = async () => {
    setOrderStatus("processing");
    try {
      if (!EXPO_PUBLIC_NGROK_URL) {
        console.error("Ngrok URL is not defined");
        return;
      }

      const url = `${EXPO_PUBLIC_NGROK_URL}/api/orders`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          customer_id: authData.customer_id,
          products: orderItems.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });

      if (response.ok) {
        setOrderStatus("success");
      } else {
        throw new Error("Order failed");
      }
    } catch (error) {
      console.error("Error when placing order:", error);
      setOrderStatus("error");
    }
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={globalStyles.top}>
            <Text style={styles.title}>Order Confirmation</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.orderItem}>
            <Text style={[styles.subhead, globalStyles.productName]}>Order Summary</Text>
          </View>

          {/* Show products */}
          {orderItems.map((item) => (
            <View style={globalStyles.orderItem} key={item.id}>
              <Text style={[globalStyles.itemText, globalStyles.productName]}>{item.name}</Text>
              <Text style={[globalStyles.itemText, globalStyles.productQuantity]}>x {item.quantity}</Text>
              <Text style={[globalStyles.itemText, globalStyles.productPrice]}>$ {item.cost.toFixed(2)}</Text>
            </View>
          ))}

          {/* Dividing line */}
          <View style={styles.separator} />

          {/* Total */}
          <View style={styles.totalContainer}>
            <Text style={styles.subhead}>TOTAL:</Text>
            <Text style={styles.total}>$ {total}</Text>
          </View>

          {orderStatus === "processing" && (
            <View style={[globalStyles.button, styles.confirmOrder, styles.processing]}>
              <Text style={globalStyles.buttonText}>PROCESSING ORDER...</Text>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}

          {orderStatus === "success" && (
            <View style={styles.center}>
              <View style={styles.iconContainerSuccess}>
                <Text style={styles.iconText}>✔</Text>
              </View>
              <Text style={styles.resultText}>Thank you!</Text>
              <Text style={styles.resultText}>Your order has been received.</Text>
            </View>
          )}

          {orderStatus === "error" && (
            <View style={[styles.center, { width: "100%" }]}>
              <TouchableOpacity style={[globalStyles.button, styles.confirmOrder]} onPress={postOrder}>
                <Text style={globalStyles.buttonText}>CONFIRM ORDER</Text>
              </TouchableOpacity>
              <View style={styles.iconContainerError}>
                <Text style={styles.iconText}>✖</Text>
              </View>
              <Text style={styles.resultText}>Your order was not processed successfully.</Text>
              <Text style={styles.resultText}>Please try again.</Text>
            </View>
          )}

          {orderStatus === "idle" && (
            <TouchableOpacity style={[globalStyles.button, styles.confirmOrder]} onPress={postOrder}>
              <Text style={globalStyles.buttonText}>CONFIRM ORDER</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  modalContainer: {
    width: width * 0.95,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Oswald-Regular",
    color: "#FFFFFF",
  },
  closeButtonText: {
    color: "gray",
    fontSize: 25,
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
  confirmOrder: {
    width: "100%",
    marginBottom: 15,
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 35,
  },
  center: {
    alignItems: "center",
  },
  resultText: {
    fontSize: 14,
  },
  iconContainerSuccess: {
    width: 30,
    height: 30,
    backgroundColor: "#609475",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  iconContainerError: {
    width: 30,
    height: 30,
    backgroundColor: "#851919",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingBottom: 2,
  },
  iconText: {
    color: "#FFFFFF",
    fontSize: 20,
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  processing: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderConfirmationModal;
