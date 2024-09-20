import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const MyModal = ({ visible, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={globalStyles.modalBackground}>
        <View style={[globalStyles.modalContainer, styles.modalContent]}>
          <View style={globalStyles.top}>
            <View style={globalStyles.column}>
              <Text style={styles.title}>DELIVERY DETAILS</Text>
              <Text style={styles.status}>Status: {order.status.toUpperCase()}</Text>
            </View>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={onClose}>
                <Text style={globalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.orderContainer}>
            <Text style={styles.orderInfo}>Delivery Address: {order.customer_address}</Text>
            <Text style={styles.orderInfo}>Restaurant: {order.restaurant_name}</Text>
            <Text style={styles.orderInfo}>Order Date: {order.timestamp.substring(0, 10)}</Text>

            <Text style={styles.orderDetails}>Order Details:</Text>
          </View>

          {/* Show products */}
          {order.products.map((item) => (
            <View style={globalStyles.orderItem} key={item.id}>
              <Text style={[globalStyles.itemText, globalStyles.productName]}>{item.product_name}</Text>
              <Text style={[globalStyles.itemText, globalStyles.productQuantity]}>x {item.quantity}</Text>
              <Text style={[globalStyles.itemText, globalStyles.productPrice]}>$ {item.unit_cost.toFixed(2)}</Text>
            </View>
          ))}

          {/* Dividing line */}
          <View style={globalStyles.separator} />

          {/* Total */}
          <View style={globalStyles.totalContainer}>
            <Text style={globalStyles.subhead}>TOTAL:</Text>
            <Text style={globalStyles.total}>$ {order.total_cost.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 22,
    color: "#DA583B",
    paddingBottom: 8,
    textAlign: "center",
    fontFamily: "Oswald-Regular",
  },
  status: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  orderInfo: {
    fontSize: 13,
    marginVertical: 6,
  },
  orderDetails: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Oswald-Regular",
  },
  closeButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 10,
  },
  orderContainer: {
    alignItems: "flex-start",
  },
});

export default MyModal;
