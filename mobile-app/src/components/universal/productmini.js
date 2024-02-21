import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Alert,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import s from "../../../styles/mainStyle.js";
import { addToCartService } from "../../../utils/services/cart.js";
import { addToWishListService } from "../../../utils/services/wishlist.js";
import { useAtom } from "jotai";
import { cartAtom } from "../../../utils/globalState/cart";
import { wishListAtom } from "../../../utils/globalState/wishlist";
import { getProductsAtom } from "../../../utils/globalState/product.js";
import { Ionicons } from "@expo/vector-icons";
import { userAtom } from "../../../utils/globalState/user.js";

const ProductMini = (props) => {
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
            productDetails: props.product,
            quantity: 1,
          },
        ],
      });
      setAllProduct({
        ...allproduct,
        products: allproduct?.products?.map((i) => {
          if (i?._id === props?.product?._id) {
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
              productDetails: props.product,
            },
          ],
        });
      }

      setAllProduct({
        ...allproduct,
        products: allproduct?.products?.map((i) => {
          if (i?._id === props?.product?._id) {
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
    <TouchableOpacity
      style={[
        {
          width: 150,
          borderRadius: 20,
        },
        !props.vertical && {
          marginLeft: 10,
          marginRight: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: "#fff",
        },
        props.productStyle,
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          props.navigation.navigate("ProductDetailScreen", {
            product: props?.product,
          });
        }}
      >
        <View style={[s.textCenter]}>
          <Image
            source={{ uri: props?.product?.media?.[0]?.url }}
            style={{
              width: "100%",
              height: 100,
              resizeMode: "cover",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          margin: 10,
          marginBottom: 0,
          // paddingVertical: 20,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[s.f14, s.b]}>{props?.product?.name}</Text>
        </View>
        <View>
          <Text style={[s.f14, s.b]} className="text-blue-600">
            ${props?.product?.price}
          </Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            if (!user?._id) {
              Alert.alert("You need to login first!");
              return;
            }
            addToWishlistFun({
              productId: props?.product?._id,
              isAdded: props?.product?.isAddedToWishlist,
            });
          }}
          style={{
            marginRight: 10,
          }}
        >
          <Ionicons
            name={props?.product?.isAddedToWishlist ? "heart" : "heart-outline"}
            size={20}
            color={props?.product?.isAddedToWishlist ? "#aaeebb" : "#ccc"}
          />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text>{props?.product?.description?.substring(0, 25)}...</Text>
      </View>
      <TouchableOpacity
        style={[
          btnStyle.btn,
          {
            backgroundColor: props?.product?.isAddedToCart ? "#ccc" : "#aaeebb",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          },
        ]}
        onPress={() => {
          if (!user?._id) {
            Alert.alert("You need to login first!");
            return;
          }
          props?.product?.isAddedToCart
            ? ""
            : addToCartFunction({ productId: props?.product?._id });
        }}
      >
        <Text style={[s.f14, s.clfff]}>
          {props?.product?.isAddedToCart ? "Added to cart" : "Add to cart"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const btnStyle = StyleSheet.create({
  btn: {
    width: "100%",
    height: 35,
    backgroundColor: "#aaeebb",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductMini;
