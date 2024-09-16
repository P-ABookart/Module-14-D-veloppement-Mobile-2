import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../styles/globalStyles";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const NearbyRestaurants = () => {
  const [selectedRating, setSelectedRating] = useState("0");
  const [selectedPrice, setSelectedPrice] = useState("0");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    require("../assets/restaurants/cuisineSoutheast.jpg"),
    require("../assets/restaurants/cuisineViet.jpg"),
    require("../assets/restaurants/cuisineGreek.jpg"),
    require("../assets/restaurants/cuisineJapanese.jpg"),
    require("../assets/restaurants/cuisinePasta.jpg"),
    require("../assets/restaurants/cuisinePizza.jpg"),
  ];
  const fetchRestaurants = async () => {
    try {
      const url = `${EXPO_PUBLIC_NGROK_URL}/api/restaurants?rating=${selectedRating}&price_range=${selectedPrice}`;
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error("Error when getting restaurants:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [selectedRating, selectedPrice]);

  const renderRestaurant = ({ item }) => {
    const randomImage = images[Math.floor(Math.random() * images.length)];

    let priceSymbol = "";
    switch (item.price_range) {
      case 1:
        priceSymbol = "$";
        break;
      case 2:
        priceSymbol = "$$";
        break;
      case 3:
        priceSymbol = "$$$";
        break;
      default:
        priceSymbol = "$";
    }

    return (
      <View style={styles.card}>
        <Image source={randomImage} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.restaurantPrice}>{priceSymbol}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>NEARBY RESTAURANTS</Text>

      <View style={styles.row}>
        <Text style={globalStyles.title}>Rating</Text>
        <Text style={globalStyles.title}>Price</Text>
      </View>

      <View style={styles.row}>
        <Picker
          selectedValue={selectedRating}
          style={[styles.picker, globalStyles.listItemText]}
          itemStyle={{ fontSize: 8 }}
          onValueChange={(itemValue) => setSelectedRating(itemValue)}
        >
          <Picker.Item label="-- Select --" value="0" />
          <Picker.Item label="★" value="1" />
          <Picker.Item label="★★" value="2" />
          <Picker.Item label="★★★" value="3" />
          <Picker.Item label="★★★★" value="4" />
          <Picker.Item label="★★★★★" value="5" />
        </Picker>

        <Picker selectedValue={selectedPrice} style={[styles.picker, globalStyles.listItemText]} onValueChange={(itemValue) => setSelectedPrice(itemValue)}>
          <Picker.Item label="-- Select --" value="0" />
          <Picker.Item label="$" value="1" />
          <Picker.Item label="$$" value="2" />
          <Picker.Item label="$$$" value="3" />
        </Picker>
      </View>

      <Text style={globalStyles.title}>RESTAURANTS</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList data={restaurants} renderItem={renderRestaurant} keyExtractor={(item) => item.id.toString()} style={styles.restaurantList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: "46%",
    backgroundColor: "rgb(218, 88, 59)",
    color: "#fff",
    borderRadius: 5,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantPrice: {
    fontSize: 16,
    color: "gray",
  },
  restaurantList: {
    marginTop: 10,
  },
});

export default NearbyRestaurants;
