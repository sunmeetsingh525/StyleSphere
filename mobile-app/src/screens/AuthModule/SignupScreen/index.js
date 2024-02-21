import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { signupnew } from "../../../../images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { registerService } from "../../../../utils/services/auth";

// subscribe for more videos like this :)
export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({});

  const signupFunction = () => {
    registerService({
      body: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    })
      .then((res) => {
        navigation.navigate("LoginScreen");
      })
      .catch((err) => {
        Alert.alert("Error", err.data?.error?.message);
      });
  };
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView>
        <SafeAreaView className="flex">
          <View className="flex-row justify-center">
            <Image
              source={signupnew}
              style={{ width: 300, height: 300, resizeMode: "contain" }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              placeholder="Enter Password"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={() => {
                signupFunction();
              }}
            >
              <Text className="text-xl font-bold text-center text-gray-700">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>

          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
