import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";

const { width, height } = Dimensions.get("window");

const SelectAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/AppLogoV2.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Select Account Type</Text>
      <View style={globalStyles.row}>
        <TouchableOpacity style={styles.accountCard} onPress={() => navigation.navigate("CustomerMain")}>
          <Image source={require("../assets/customerTypeIcon.png")} style={styles.image}></Image>
          <Text style={styles.accountText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountCard} onPress={() => navigation.navigate("CourierMain")}>
          <Image source={require("../assets/courierTypeIcon.png")} style={styles.image}></Image>
          <Text style={styles.accountText}>Courier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Oswald-Regular",
    marginBottom: 30,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: "contain",
  },
  accountCard: {
    width: Dimensions.get("window").width / 2 - 18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 20,
    margin: 12,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  accountText: {
    fontSize: 23,
    textAlign: "center",
  },
});

export default SelectAccountScreen;
