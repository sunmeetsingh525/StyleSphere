import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { userAtom } from "../../../utils/globalState/user";
import { wishListAtom } from "../../../utils/globalState/wishlist";
import { cartAtom } from "../../../utils/globalState/cart";
import { useAtom } from "jotai";
// navigation?.replace("AuthRoot");
const AccountScreen = ({ navigation }) => {
  const [user, setUser] = useAtom(userAtom);
  const [, setWishList] = useAtom(wishListAtom);

  const [, setCart] = useAtom(cartAtom);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user._id ? (
        <>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              setWishList([]);
              setCart([]);
              setUser([]);
              navigation.navigate("AuthRoot");
            }}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: 20,
                paddingHorizontal: 20,
              }}
            >
              Logout <Ionicons name="log-out-outline" size={20} />
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Name:
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              {user?.name}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              {user?.email}
            </Text>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>You need to be authenticated for this action</Text>
          <TouchableOpacity
            className="mt-4 py-3 bg-yellow-400 rounded-xl w-[150]"
            onPress={() => navigation.navigate("AuthRoot")}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login <Ionicons name="log-in-outline" size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
