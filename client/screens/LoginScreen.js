import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { AuthContext } from "../context/AuthContext.js";
import { RoleContext } from "../context/RoleContext.js";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { login } = useContext(AuthContext);
  const { chooseAccount } = useContext(RoleContext);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      if (!EXPO_PUBLIC_NGROK_URL) {
        console.error("Ngrok url is not defined");
        return;
      }

      const url = `${EXPO_PUBLIC_NGROK_URL}/api/auth`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage("Incorrect email or password. Please try again.");
        throw new Error(`Failed to login: ${errorText}`);
      }

      const data = await response.json();

      login(data);

      if (data.customer_id != 0 && data.courier_id != 0) {
        navigation.navigate("SelectAccount");
      } else if (data.customer_id != 0) {
        chooseAccount("Customer");
        navigation.navigate("CustomerMain");
      } else if (data.courier_id != 0) {
        chooseAccount("Courier");
        navigation.navigate("CourierMain");
      } else {
        setErrorMessage("No valid role found for the user. Please contact support.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={globalStyles.entryContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../assets/AppLogoV2.png")} style={styles.logo} />
        </View>

        {/* Welcome text */}
        <View style={styles.formWrapper}>
          <View style={styles.textContainer}>
            <Text style={globalStyles.title}>Welcome Back</Text>
            <Text style={styles.loginText}>Login to begin</Text>
          </View>

          {/* Connexion form */}
          <Text style={globalStyles.subText}>Email</Text>
          <View style={globalStyles.formContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter your primary email here"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={globalStyles.subText}>Password</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="************"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
            />

            {/* Error message */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity style={[globalStyles.button, { marginTop: 20 }]} onPress={() => handleLogin(email, password)}>
              {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={globalStyles.buttonText}>LOG IN</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: "contain",
  },
  textContainer: {
    marginBottom: 20,
    alignItems: "right",
  },
  loginText: {
    fontSize: 16,
  },
  formWrapper: {
    width: "100%",
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
