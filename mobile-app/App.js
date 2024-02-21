//initial flow
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import Navigation from "./navigation";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};
export default function App() {
  return (
    <SafeAreaView style={[s.fl1, Platform.OS === "android" && s.mgtp30]}>
      <NavigationContainer theme={MyTheme}>
        <Navigation />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  fl1: { flex: 1 },
  mgtp30: { marginTop: 30 },
});
