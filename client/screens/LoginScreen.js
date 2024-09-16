import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";

const EXPO_PUBLIC_NGROK_URL = process.env.EXPO_PUBLIC_NGROK_URL;

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_NGROK_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage("Incorrect email or password. Please try again.");
        throw new Error(`Failed to login: ${errorText}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      navigation.navigate("Main");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
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
          <Text style={styles.subText}>Email</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your primary email here"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.subText}>Password</Text>
            <TextInput style={styles.input} placeholder="************" value={password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry />

            {/* Error message */}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity style={globalStyles.button} onPress={() => handleLogin(email, password)}>
              <Text style={globalStyles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
  subText: {
    fontSize: 12,
    color: "#808080",
    marginBottom: 5,
  },
  formWrapper: {
    width: "100%",
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
