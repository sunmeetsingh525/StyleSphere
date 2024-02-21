import { DefaultTheme } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import React from "react";
import theme from "../utils/theme";
import SplashScreen from "../src/screens/AuthModule/SplashScreen";
import LoginScreen from "../src/screens/AuthModule/LoginScreen";
import TabNavigation from "./TabNavigation";
import SignUpScreen from "../src/screens/AuthModule/SignupScreen";
import ProductDetailScreen from "../src/screens/productDetail";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
  },
};

export default function Navigation() {
  return <RootNavigator />;
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name="Root" component={TabNavigation} options={{}} />
      <Stack.Screen name="AuthRoot" component={AuthStack} options={{}} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{}}
      />
    </Stack.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
}
