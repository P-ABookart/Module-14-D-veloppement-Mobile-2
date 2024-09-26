import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext.js";
import * as Font from "expo-font";

// Screens
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/RestaurantMenuScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import NearbyRestaurantsScreen from "./screens/NearbyRestaurantsScreen";
import AccountScreen from "./screens/AccountScreen";
import DeliveriesScreen from "./screens/DeliveriesScreen";
import SelectAccountScreen from "./screens/SelectAccountScreen";

import { StatusBar } from "expo-status-bar";
import { globalStyles } from "./styles/globalStyles";

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
      <Image source={require("./assets/AppLogoV1.png")} style={{ width: "45%", height: "100%" }} resizeMode="contain" />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => {
          navigation.replace("Login");
        }}
      >
        <Text style={[globalStyles.buttonText, { fontSize: 12 }]}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

// Account Stack
function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

// Customer Tabs
function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Restaurants") {
            iconName = require("./assets/restaurantIcon.png");
          } else if (route.name === "OrderHistory") {
            iconName = require("./assets/orderHistoryIcon.png");
          } else if (route.name === "Account") {
            iconName = require("./assets/accountIcon.png");
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
      <Tab.Screen name="OrderHistory" component={OrderHistoryStack} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Courier Tabs
function CourierTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Deliveries") {
            iconName = require("./assets/orderHistoryIcon.png");
          } else if (route.name === "Account") {
            iconName = require("./assets/accountIcon.png");
          }
          return <Image source={iconName} style={[styles.icon, { width: size, height: size }, focused ? styles.iconFocused : styles.iconDefault]} />;
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="Deliveries" component={DeliveriesStack} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Stack for Deliveries
function DeliveriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DeliveriesScreen"
        component={DeliveriesScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

// Restaurant Stack
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

// Order History Stack
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

// Account Selection Screen
function AppStack() {
  const initialScreen = getInitialScreen();

  return (
    <Stack.Navigator initialRouteName={initialScreen}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CustomerMain" component={CustomerTabs} options={{ headerShown: false }} />
      <Stack.Screen name="CourierMain" component={CourierTabs} options={{ headerShown: false }} />
      <Stack.Screen name="SelectAccount" component={SelectAccountScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Logic to get initial screen based on user role
function getInitialScreen() {
  const { authData } = useContext(AuthContext);

  if (authData) {
    if (authData.customer_id != 0 && authData.courier_id != 0) {
      return "SelectAccount";
    } else if (authData.customer_id != 0) {
      return "CustomerMain";
    } else if (authData.courier_id != 0) {
      return "CourierMain";
    }
  }

  return "Login";
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
      <RoleProvider>
        <NavigationContainer>{fontLoaded ? <AppStack /> : null}</NavigationContainer>
      </RoleProvider>
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
