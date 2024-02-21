import React, { useEffect } from "react";
import { SafeAreaView, Image, Text } from "react-native";
import { useAtom } from "jotai";
import { getCurrentUser } from "../../../../utils/services/user";
import { userAtom } from "../../../../utils/globalState/user";
import { getCartService } from "../../../../utils/services/cart";
import { cartAtom } from "../../../../utils/globalState/cart";
import { wishListAtom } from "../../../../utils/globalState/wishlist";
import { getWishListService } from "../../../../utils/services/wishlist";
import Logo from "../../../../assets/sanam-logo.png";

const SplashScreen = ({ navigation }) => {
  const [, setUser] = useAtom(userAtom);
  const [, setWishList] = useAtom(wishListAtom);
  const [, setCart] = useAtom(cartAtom);
  const getCartFunction = () => {};
  useEffect(() => {
    getCartFunction();
  }, []);
  useEffect(() => {
    getCurrentUser()
      .then(async (res) => {
        setUser(res?.data);
        const [cartRes, wishListRes] = await Promise.all([
          getCartService({}),
          getWishListService({}),
        ]);
        setCart(cartRes);
        setWishList(wishListRes);
        // navigation?.replace("Root");
      })
      .catch((err) => {
        // navigation?.replace("AuthRoot");
        // navigation?.replace("Root");
      });
    setTimeout(() => {
      navigation?.replace("Root");
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#17232d",
      }}
    >
      <Image
        source={Logo}
        style={{
          height: 200,
          width: 200,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {" "}
        StyleSphere{" "}
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
