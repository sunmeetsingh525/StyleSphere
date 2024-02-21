import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { wishListAtom } from "../../../utils/globalState/wishlist";
import { useAtom } from "jotai";
import WishListItem from "./WishListItem";
import { userAtom } from "../../../utils/globalState/user";

const WishListScreen = ({ navigation }) => {
  const [user] = useAtom(userAtom);
  const [wishList] = useAtom(wishListAtom);
  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            marginLeft: 10,
            textAlign: "center",
          }}
        >
          WishList
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={wishList?.data}
          renderItem={({ item }) => <WishListItem item={item} />}
          keyExtractor={(item) => item?._id}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                height: Dimensions.get("window").height - 300,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/wishlist.png")}
                style={{ width: 250, height: 250 }}
              />
            </View>
          )}
        />
      </View>
      {user?._id ? null : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AuthRoot");
          }}
          style={{
            backgroundColor: "#000",
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default WishListScreen;
