import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../../src/screens/AccountScreen";
import EditProfile from "../../src/screens/AccountScreen/EditProfile";
import TrackOrder from "../../src/screens/AccountScreen/TrackOrder";
const Stack = createNativeStackNavigator();

const AccountStacks = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
      <Stack.Screen name="TrackOrder" component={TrackOrder}></Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AccountStacks;
