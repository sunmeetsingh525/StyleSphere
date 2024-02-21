import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import CartItem from "./CartItem";
import { getSecretKeyService } from "../../../utils/services/order";
import StripePayment from "../../components/StripePayment";
import { addToCartService, getCartService } from "../../../utils/services/cart";
import { cartAtom } from "../../../utils/globalState/cart";
import { userAtom } from "../../../utils/globalState/user";

const CartScreen = ({ navigation }) => {
  const [user] = useAtom(userAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const getCartFunction = () => {
    getCartService({})
      .then((res) => {
        const updatedCart = res?.data?.map((i) => {
          return {
            ...i,
            quantity: i?.quantity,
          };
        });
        setCart({
          data: updatedCart,
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getCartFunction();
  }, []);

  const addToCartFunction = ({ productId, quantity }) => {
    addToCartService({
      body: {
        productId,
        quantity,
      },
    }).then(() => {
      getCartFunction();
    });
  };

  const total = cart?.data?.reduce((acc, curr) => {
    return acc + curr?.productDetails?.price * curr?.quantity;
  }, 0);
  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            marginLeft: 10,
          }}
        >
          Cart
        </Text>
      </View>

      <FlatList
        data={cart?.data}
        renderItem={({ item }) => (
          <CartItem
            key={item?._id}
            product={item}
            addToCartFunction={addToCartFunction}
          />
        )}
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
              source={{
                uri: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg",
              }}
              style={{ width: 250, height: 250, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontSize: 20,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Your cart is empty
            </Text>
          </View>
        )}
      />

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
      {cart?.data?.length ? (
        <>
          <View>
            <View style={styles.row}>
              <Text style={styles.cartTotalText}>Items</Text>

              <Text
                style={[
                  styles.cartTotalText,
                  {
                    color: "#17232d",
                    fontSize: 20,
                  },
                ]}
              >
                ${total}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cartTotalText}>Discount</Text>
              <Text
                style={[
                  styles.cartTotalText,
                  {
                    color: "#17232d",
                    fontSize: 20,
                  },
                ]}
              >
                $0
              </Text>
            </View>
            <View style={[styles.row, styles.total]}>
              <Text style={styles.cartTotalText}>Total</Text>
              <Text
                style={[
                  styles.cartTotalText,
                  {
                    color: "#17232d",
                    fontSize: 20,
                  },
                ]}
              >
                ${total}
              </Text>
            </View>
          </View>
          <StripePayment cart={cart} total={total} />
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 10,
  },
  total: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: "#E5E5E5",
    marginBottom: 10,
  },
  cartTotalText: {
    color: "#989899",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
