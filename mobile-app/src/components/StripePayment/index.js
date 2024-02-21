import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { initStripe, useStripe } from "@stripe/stripe-react-native";

import { useAtom } from "jotai";
import { createOrderservice } from "../../../utils/services/order";

import { useNavigation } from "@react-navigation/native";
import { userAtom } from "../../../utils/globalState/user";
import theme from "../../../utils/theme";
import { cartAtom } from "../../../utils/globalState/cart";

const StripePayment = ({ total }) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const [userData] = useAtom(userAtom);

  const localUrl = "https://sunmeet.upforks.com/api/stripe";
  const buy = async () => {
    setLoading(true);
    try {
      const response = await fetch(localUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer sk_test_51Ol8OMSCVzQJWDR2vfDdS9nNJFiHRkQxq1rWj9zsSZyl8StRrMaggsccrM2wUjBuY17vIohJ7Lrji3ykfrKQDYDQ00seDa2PVK`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userData?.name, amount: total }),
      });

      const data = await response.json();
      setLoading(false);
      if (!!data?.clientSecret === false) {
        return Alert.alert("Error");
      }
      const clientSecret = data.clientSecret;

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        googlePay: true,
        merchantDisplayName: "Demo",
      });

      if (initSheet?.error) {
        console.log(initSheet?.error?.message, "ssss", initSheet);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
        currencyCode: "INR",
        appearance: {
          colors: {
            primary: "red",
          },
          primaryButton: {
            colors: { background: "green" },
          },
        },
        applePay: true,
        googlePay: true,
        merchantCountryCode: "AE",
        merchantDisplayName: "***",
        customFlow: false,
        style: "alwaysDark",
        testEnv: false,
      });
      if (presentSheet.error) {
        // Alert.alert(presentSheet?.error?.message);
      } else {
        createOrderservice({
          body: {
            products: cart?.data?.map((i) => {
              return {
                productId: i?.productId,
                quantity: i?.quantity,
              };
            }),
          },
        })
          .then((res) => {
            console.log(res, "res");
            Alert.alert("Payment Successfull");
            setCart({ data: [], total: 0 });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          buy();
        }}
        style={{
          backgroundColor: theme.colors.button_primary,
          borderRadius: 5,
          backgroundColor: "#000",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Checkout
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default StripePayment;
