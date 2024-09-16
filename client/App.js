import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
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
      }}
    >
      <Image
        source={require("./assets/AppLogoV1.png")}
        style={{ width: width * 0.35, height: height * 0.05, marginRight: width * 0.35 }}
        resizeMode="contain"
      />

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
    <Tab.Navigator>
      <Tab.Screen
        name="Restaurants"
        component={RestaurantStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => <Image source={require("./assets/restaurantIcon.png")} style={{ width: size, height: size }} />,
        }}
      />
      <Tab.Screen
        name="OrderHistoryTab"
        component={OrderHistoryStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => <Image source={require("./assets/orderHistoryIcon.png")} style={{ width: size, height: size }} />,
        }}
      />
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

  if (!fontLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
