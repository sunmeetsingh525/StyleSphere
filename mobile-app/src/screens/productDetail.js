import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/universal/header";
import { wishListAtom } from "../../utils/globalState/wishlist";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/globalState/user";
import { cartAtom } from "../../utils/globalState/cart";
import { getProductsAtom } from "../../utils/globalState/product";
import { addToCartService } from "../../utils/services/cart";
import { addToWishListService } from "../../utils/services/wishlist";

export default function ProductDetailScreen(
  { route, navigation } // 1. Get the params
) {
  const product = route.params.product;

  const [quantity, setQuantity] = React.useState(1);

  const windowWidth = Dimensions.get("window").width;

  const [user] = useAtom(userAtom);
  const [wishList, setWishList] = useAtom(wishListAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [allproduct, setAllProduct] = useAtom(getProductsAtom);

  const addToCartFunction = ({ productId }) => {
    addToCartService({
      body: {
        productId,
        quantity: 1,
      },
    }).then((res) => {
      setCart({
        data: [
          ...(cart?.data || []),
          {
            _id: res?.cart?._id,
            productDetails: product,
            quantity: 1,
          },
        ],
      });
      setAllProduct({
        ...allproduct,
        products: allproduct?.products?.map((i) => {
          if (i?._id === product?._id) {
            return {
              ...i,
              isAddedToCart: true,
            };
          }
          return i;
        }),
      });
    });
  };
  const addToWishlistFun = ({ productId, isAdded }) => {
    addToWishListService({
      body: {
        productId,
      },
    }).then((res) => {
      if (isAdded) {
        setWishList({
          data: wishList?.data?.filter((i) => i?._id !== res?.data?._id),
        });
      } else {
        setWishList({
          data: [
            ...(wishList?.data || []),
            {
              _id: res?.data?._id,
              productId,
              productDetails: product,
            },
          ],
        });
      }

      setAllProduct({
        ...allproduct,
        products: allproduct?.products?.map((i) => {
          if (i?._id === product?._id) {
            return {
              ...i,
              isAddedToWishlist: isAdded ? false : true,
            };
          }
          return i;
        }),
      });
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Header />
        <Image
          source={{ uri: product?.media?.[0]?.url }}
          className={`h-96 w-full object-cover`}
        />
        <ScrollView className="max-w-full  bg-white h-full">
          <View className="flex flex-row justify-between">
            <Text className="text-sm text-gray-700 tracking-[0.75px] mt-1 font-normal px-4 py-1 mx-3 bg-yellow-400 rounded-xl">
              Free Shipping
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (!user?._id) {
                  Alert.alert("You need to login first!");
                  return;
                }
                addToWishlistFun({
                  productId: product?._id,
                  isAdded: product?.isAddedToWishlist,
                });
              }}
              style={{
                marginRight: 10,
              }}
            >
              <Ionicons
                name={product?.isAddedToWishlist ? "heart" : "heart-outline"}
                size={20}
                color={product?.isAddedToWishlist ? "#aaeebb" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-xl my-1 tracking-[0.75px] font-bold px-3">
            {product.name}
          </Text>
          <Text className="my-1 px-3">{product.description}</Text>

          <View
            className={`
              flex flex-row mt-4 w-full border-b border-gray-200 pb-5  px-3
              ${product.discount ? "justify-between" : "justify-end"} `}
          >
            <Text className="text-2xl text-red-600 tracking-[0.75px] mt-2 font-bold ">
              CAD {product.price}
            </Text>
          </View>

          <View className="flex flex-row mt-6 w-full justify-between items-center p-0 h-16">
            <View
              className="flex flex-row p-0"
              style={{ width: (windowWidth * 3) / 9 }}
            >
              <TextInput
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(Number(text))}
                className="bg-[#F5F5F5] w-full h-16 text-2xl text-center"
              />
            </View>

            <TouchableOpacity
              className="flex items-center justify-center w-3/4 p-1 h-16 
                  border border-black bg-[#333333]"
              style={{ width: (windowWidth * 6) / 9 }}
              onPress={addToCartFunction}
            >
              <Text className="text-white text-xl ">ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
