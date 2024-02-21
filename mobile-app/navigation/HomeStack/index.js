import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../src/screens/home.js";
import CartScreen from "../../src/screens/CartScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="CartScreen" component={CartScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeScreen;
