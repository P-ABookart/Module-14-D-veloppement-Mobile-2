import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import * as Font from "expo-font";

// Screens
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/RestaurantMenuScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import NearbyRestaurantsScreen from "./screens/NearbyRestaurantsScreen";

import { StatusBar } from "expo-status-bar";
import { globalStyles } from "./styles/globalStyles";

const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    "Oswald-Regular": require("./assets/fonts/Oswald-VariableFont_wght.ttf"),
  });
};

function CustomHeader({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        width: "100%",
      }}
    >
      <Image source={require("./assets/AppLogoV1.png")} style={{ width: width * 0.35, height: height * 0.05 }} resizeMode="contain" />

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.replace("Login")}>
        <Text style={[globalStyles.buttonText, { fontSize: 12 }]}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NearbyRestaurants"
        component={NearbyRestaurantsScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="RestaurantsMenu"
        component={MenuScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function OrderHistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Restaurants") {
            iconName = require("./assets/restaurantIcon.png");
          } else if (route.name === "OrderHistoryTab") {
            iconName = require("./assets/orderHistoryIcon.png");
          }

          return <Image source={iconName} style={[styles.icon, { width: size, height: size }, focused ? styles.iconFocused : styles.iconDefault]} />;
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="Restaurants" component={RestaurantStack} options={{ headerShown: false }} />
      <Tab.Screen name="OrderHistoryTab" component={OrderHistoryStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await fetchFonts();
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>{fontLoaded ? <AppStack /> : null}</NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 20,
    padding: 5,
  },
  iconDefault: {
    backgroundColor: "transparent",
  },
  iconFocused: {
    backgroundColor: "#f0f0f0",
  },
  tabBarLabel: {
    fontSize: 12,
  },
  tabBarStyle: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 0,
  },
});
