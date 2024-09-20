import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { getPriceSymbol, getRatingSymbol } from "../utils/restaurantUtils";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const NearbyRestaurants = () => {
  const [selectedRating, setSelectedRating] = useState("0");
  const [selectedPrice, setSelectedPrice] = useState("0");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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
      if (!EXPO_PUBLIC_NGROK_URL) {
        console.error("Ngrok url is not defined");
        return;
      }

      let url = `${EXPO_PUBLIC_NGROK_URL}/api/restaurants?`;

      if (selectedRating != 0) {
        url += `rating=${selectedRating}&`;
      }

      if (selectedPrice != 0) {
        url += `price_range=${selectedPrice}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      setRestaurants(result.data);
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

    const priceSymbol = getPriceSymbol(item.price_range);
    const ratingSymbol = getRatingSymbol(item.rating);

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RestaurantsMenu", { restaurant: item })}>
        <Image source={randomImage} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantInfoText}>{item.name}</Text>
          <Text style={styles.restaurantInfoText}>{priceSymbol}</Text>
          <Text style={[styles.restaurantInfoText, styles.ratingStars]}>{ratingSymbol}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>NEARBY RESTAURANTS</Text>

      <View style={globalStyles.row}>
        <View style={globalStyles.column}>
          <Text style={globalStyles.title}>Rating</Text>
        </View>
        <View style={globalStyles.column}>
          <Text style={globalStyles.title}>Price</Text>
        </View>
      </View>

      <View style={globalStyles.row}>
        <View style={globalStyles.column}>
          <Picker selectedValue={selectedRating} style={[styles.picker, globalStyles.listItemText]} onValueChange={(itemValue) => setSelectedRating(itemValue)}>
            <Picker.Item label="-Select-" value="0" />
            <Picker.Item label="★" value="1" />
            <Picker.Item label="★★" value="2" />
            <Picker.Item label="★★★" value="3" />
            <Picker.Item label="★★★★" value="4" />
            <Picker.Item label="★★★★★" value="5" />
          </Picker>
        </View>
        <View style={globalStyles.column}>
          <Picker selectedValue={selectedPrice} style={[styles.picker, globalStyles.listItemText]} onValueChange={(itemValue) => setSelectedPrice(itemValue)}>
            <Picker.Item label="-Select-" value="0" />
            <Picker.Item label="$" value="1" />
            <Picker.Item label="$$" value="2" />
            <Picker.Item label="$$$" value="3" />
          </Picker>
        </View>
      </View>

      <Text style={globalStyles.title}>RESTAURANTS</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id.toString()}
          style={styles.restaurantList}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: "95%",
    backgroundColor: "rgb(218, 88, 59)",
    color: "#fff",
    borderRadius: 5,
  },
  card: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  restaurantImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 18,
    justifyContent: "center",
  },
  restaurantInfoText: {
    fontSize: 18,
    fontFamily: "Oswald-Regular",
    color: "#222126",
  },
  ratingStars: {
    fontSize: 13,
  },
  restaurantList: {
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default NearbyRestaurants;
