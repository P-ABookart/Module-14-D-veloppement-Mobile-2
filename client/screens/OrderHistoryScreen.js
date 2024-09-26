import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext";
import OrderViewModal from "../modals/OrderViewModal";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const OrderHistoryScreen = () => {
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

        const url = `${EXPO_PUBLIC_NGROK_URL}/api/orders?id=${authData.customer_id}&type=customer`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
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

  const renderOrder = ({ item }) => {
    return (
      <View style={globalStyles.row}>
        <Text style={styles.order}>{item.restaurant_name}</Text>
        <Text style={styles.status}>{item.status}</Text>
        <TouchableOpacity style={styles.view} onPress={() => openModal(item)}>
          <Image source={require("../assets/view-icon.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>MY ORDERS</Text>
      <View style={[globalStyles.row, globalStyles.topMyOrders]}>
        <Text style={styles.topOrder}>ORDER</Text>
        <Text style={styles.topStatus}>STATUS</Text>
        <Text style={styles.topView}>VIEW</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={globalStyles.loading} size="big" color="#000000" />
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

      <OrderViewModal visible={isModalVisible} order={selectedOrder} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    width: "45%",
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 15,
    paddingVertical: 8,
  },
  status: {
    width: "30%",
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: 14,
    paddingVertical: 8,
  },
  view: {
    width: "25%",
    alignItems: "center",
    paddingVertical: 8,
  },
  topOrder: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "45%",
    textAlign: "left",
  },
  topStatus: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "30%",
    textAlign: "left",
  },
  topView: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: "25%",
    textAlign: "center",
  },
});

export default OrderHistoryScreen;
