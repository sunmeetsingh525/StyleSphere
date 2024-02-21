import React from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import s from "../../../styles/mainStyle";
import { useNavigation } from "@react-navigation/native";
import { cartAtom } from "../../../utils/globalState/cart";
import { userAtom } from "../../../utils/globalState/user";
import { useAtom } from "jotai";

const { width, height } = Dimensions.get("window");

export default function Header() {
  const navigation = useNavigation();
  const [cart] = useAtom(cartAtom);
  const [user] = useAtom(userAtom);
  return (
    <View style={[s.row, s.rowflStart, s.pdlt10, s.mgbt20, s.pdtp10, s.pdbt10]}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#17232d",
          }}
        >
          Welcome to StyleSphere
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#17232d",
          }}
        >
          {user?.name}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginRight: 10,
          position: "relative",
        }}
        onPress={() => {
          navigation.navigate("CartScreen");
        }}
      >
        <Text style={[s.textCenter, s.tocnt]}>
          <Icon name="cart" size={32} />
        </Text>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: -4,
            backgroundColor: "red",
            borderRadius: 50,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 13,
            }}
          >
            {cart?.data?.length}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
