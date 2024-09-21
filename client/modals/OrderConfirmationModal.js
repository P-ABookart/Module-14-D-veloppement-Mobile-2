import React, { useState, useContext } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Switch } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const OrderConfirmationModal = ({ visible, onClose, orderItems, restaurantId, customerId }) => {
  const { authData } = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState("idle"); // idle, processing, success, error
  const [sendSMS, setSendSMS] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

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
          sendEmail: sendEmail,
          sendSMS: sendSMS,
        }),
      });

      if (response.ok) {
        setOrderStatus("success");
      } else {
        const errorResponse = await response.json();
        throw new Error(`Order failed: ${errorResponse.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error when placing order:", error);
      setOrderStatus("error");
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={globalStyles.modalBackground}>
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.top}>
            <Text style={styles.title}>Order Confirmation</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={globalStyles.closeButtonText}>✖</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.orderItem}>
            <Text style={[globalStyles.subhead, globalStyles.productName]}>Order Summary</Text>
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
          <View style={globalStyles.separator} />

          {/* Total */}
          <View style={globalStyles.totalContainer}>
            <Text style={globalStyles.subhead}>TOTAL:</Text>
            <Text style={globalStyles.total}>$ {total}</Text>
          </View>

          <Text style={styles.confirmationText}>Would you like to receive your order confirmation by email and/or text?</Text>
          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Switch value={sendEmail} onValueChange={(newValue) => setSendEmail(newValue)} />
              <Text style={styles.sendByText}>By Email</Text>
            </View>
            <View style={styles.switchRow}>
              <Switch value={sendSMS} onValueChange={(newValue) => setSendSMS(newValue)} />
              <Text style={styles.sendByText}>By Phone</Text>
            </View>
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
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Oswald-Regular",
    color: "#FFFFFF",
  },
  confirmOrder: {
    width: "100%",
    marginBottom: 15,
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
  confirmationText: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 8,
    width: "100%",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  sendByText: {
    fontSize: 18,
    marginLeft: 8,
  },
});

export default OrderConfirmationModal;
