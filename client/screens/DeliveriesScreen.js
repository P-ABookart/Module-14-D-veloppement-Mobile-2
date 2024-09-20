import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext";
import DeliveriesViewModal from "../modals/DeliveriesViewModal";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const DeliveriesScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { authData } = useContext(AuthContext);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!EXPO_PUBLIC_NGROK_URL) {
          console.error("Ngrok url is not defined");
          return;
        }

        const url = `${EXPO_PUBLIC_NGROK_URL}/api/orders?id=${authData.courier_id}&type=courier`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (!response) {
          throw new Error("This courier has no deliveries history");
        }
        const result = await response.json();

        setOrders(result);
        setLoading(false);
      } catch (error) {
        console.error("Error when getting orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      if (!EXPO_PUBLIC_NGROK_URL) {
        console.error("Ngrok url is not defined");
        return;
      }

      let newStatus = getNewStatus(status);
      if (!newStatus) {
        return; //Do not update if is already on delivered
      }

      const url = `${EXPO_PUBLIC_NGROK_URL}/api/order/${orderId}/status`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Find the updated order in the current orders array
        const updatedOrder = orders.find((order) => order.id === orderId);

        if (updatedOrder) {
          // Update the status locally
          const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order));
          setOrders(updatedOrders);
        }
      } else {
        throw new Error("Changing order status failed");
      }
    } catch (error) {
      console.error("Error when updating order status:", error);
    }
  };

  const renderOrder = ({ item }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[globalStyles.row, styles.heightLimit]}>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text style={styles.address}>{item.customer_address.length > 30 ? item.customer_address.substring(0, 30) + "..." : item.customer_address}</Text>
        <TouchableOpacity style={[styles.statusButton, { backgroundColor: statusColor }]} onPress={() => updateOrderStatus(item.id, item.status)}>
          <Text style={styles.statusText}>{item.status}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.view} onPress={() => openModal(item)}>
          <Image source={require("../assets/view-icon.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#851919";
      case "in progress":
        return "#DA583B";
      case "delivered":
        return "#609475";
      default:
        return "#851919";
    }
  };

  const getNewStatus = (status) => {
    switch (status) {
      case "pending":
        return "in progress";
      case "in progress":
        return "delivered";
      case "delivered":
        return; // if already delivered, do nothing
      default:
        return "pending";
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>MY DELIVERIES</Text>
      <View style={globalStyles.topMyOrders}>
        <View style={globalStyles.row}>
          <Text style={styles.topOrderId}>ORDER</Text>
          <Text style={styles.topAddress}>ADDRESS</Text>
          <Text style={styles.topStatus}>STATUS</Text>
          <Text style={styles.topView}>VIEW</Text>
        </View>
        <Text style={styles.topOrderId}>ID</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
          style={styles.ordersList}
          numColumns={1}
          columnWrapperStyle={styles.columnWrapper}
          initialNumToRender={5}
        />
      )}

      <DeliveriesViewModal visible={isModalVisible} order={selectedOrder} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  orderId: {
    width: "15%",
    textAlign: "center",
    fontSize: 14,
    paddingVertical: 8,
  },
  address: {
    width: "35%",
    textAlign: "center",
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  statusText: {
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Oswald-Regular",
  },
  statusButton: {
    width: "32%",
    textAlign: "left",
    paddingVertical: 8,
    margin: 5,
    borderRadius: 6,
  },
  view: {
    width: "18%",
    alignItems: "center",
    paddingVertical: 8,
  },
  topOrderId: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "15%",
    textAlign: "center",
  },
  topAddress: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "35%",
    textAlign: "center",
  },
  topStatus: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "32%",
    textAlign: "center",
  },
  topView: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "18%",
    textAlign: "center",
  },
  heightLimit: {
    height: 70,
  },
});

export default DeliveriesScreen;
