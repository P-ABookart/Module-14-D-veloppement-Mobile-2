import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { getPriceSymbol, getRatingSymbol } from "../utils/restaurantUtils";
import OrderConfirmationModal from "../modals/OrderConfirmationModal";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const RestaurantMenuScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const [quantities, setQuantities] = useState({});

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const route = useRoute();
  const { restaurant } = route.params;

  const priceSymbol = getPriceSymbol(restaurant.price_range);
  const ratingSymbol = getRatingSymbol(restaurant.rating);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!EXPO_PUBLIC_NGROK_URL) {
          console.error("Ngrok url is not defined");
          return;
        }

        const url = `${EXPO_PUBLIC_NGROK_URL}/api/products?restaurant=${restaurant.id}`;

        const response = await fetch(url);
        const result = await response.json();

        setProducts(result);
        setLoading(false);
      } catch (error) {
        console.error("Error when getting products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const increaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  const renderProduct = ({ item }) => {
    const quantity = quantities[item.id] || 0;

    return (
      <View style={[globalStyles.row, styles.productCard]}>
        <Image source={require("../assets/RestaurantMenu.jpg")} style={styles.productImage} />
        <View style={styles.productInfoContainer}>
          <View style={globalStyles.column}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>$ {item.cost.toFixed(2)}</Text>
            <Text style={styles.productDescription}>Lorem ipsum dolor sit.</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>RESTAURANT MENU</Text>
      <View style={globalStyles.row}>
        <View style={globalStyles.column}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantInfo}>Price: {priceSymbol}</Text>
          <Text style={styles.restaurantInfo}>Rating: {ratingSymbol}</Text>
        </View>
        <View style={globalStyles.column}>
          <TouchableOpacity style={[globalStyles.button, styles.createOrder]} onPress={openModal}>
            <Text style={globalStyles.buttonText}>Create Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          style={styles.productsList}
          numColumns={1}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      <OrderConfirmationModal
        visible={isModalVisible}
        onClose={closeModal}
        orderItems={Object.entries(quantities)
          .filter(([id, qty]) => qty > 0)
          .map(([id, qty]) => {
            const product = products.find((product) => product.id === parseInt(id));
            return { ...product, quantity: qty };
          })}
        restaurantId={restaurant.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  restaurantInfo: {
    fontSize: 16,
  },
  createOrder: {
    width: "66%",
    alignSelf: "flex-end",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  productCard: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  productInfoContainer: {
    flexDirection: "row",
    flex: 1,
  },
  productName: {
    fontFamily: "Oswald-Regular",
    fontSize: 20,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#222126",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  quantity: {
    fontSize: 16,
  },
});

export default RestaurantMenuScreen;
