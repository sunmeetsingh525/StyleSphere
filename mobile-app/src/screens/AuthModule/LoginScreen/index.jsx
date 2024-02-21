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
import { loginnew } from "../../../../images";
import { loginService } from "../../../../utils/services/auth";
import { userAtom } from "../../../../utils/globalState/user";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCartService } from "../../../../utils/services/cart";
import { getWishListService } from "../../../../utils/services/wishlist";
import { wishListAtom } from "../../../../utils/globalState/wishlist";
import { cartAtom } from "../../../../utils/globalState/cart";

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({});
  const [, setUser] = useAtom(userAtom);
  const [, setWishList] = useAtom(wishListAtom);

  const [, setCart] = useAtom(cartAtom);
  const loginFunction = () => {
    loginService({
      body: {
        email: form.email,
        password: form.password,
      },
    })
      .then(async (res) => {
        setUser(res?.data);
        await AsyncStorage.setItem("accessToken", res?.accessToken);
        const [cartRes, wishListRes] = await Promise.all([
          getCartService({}),
          getWishListService({}),
        ]);
        setCart(cartRes);
        setWishList(wishListRes);
        navigation.navigate("Root");
      })
      .catch((err) => {
        console.log("error: ", err);
        Alert.alert("Error", err?.data?.error?.message);
      });
  };
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#fff" }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-center">
          <Image source={loginnew} style={{ width: 200, height: 200 }} />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            value={form.email}
            onChangeText={(value) => {
              setForm({ ...form, email: value });
            }}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value={form.password}
            onChangeText={(value) => {
              setForm({ ...form, password: value });
            }}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={() => {
              loginFunction();
            }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
