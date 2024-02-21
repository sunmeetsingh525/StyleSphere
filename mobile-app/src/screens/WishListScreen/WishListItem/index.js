import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { useAtom } from "jotai";
import { Ionicons } from "@expo/vector-icons";
import { getProductsAtom } from "../../../../utils/globalState/product";
import { wishListAtom } from "../../../../utils/globalState/wishlist";
import { addToWishListService } from "../../../../utils/services/wishlist.js";

export default function WishListItem({ item }) {
  const [wishList, setWishList] = useAtom(wishListAtom);

  const [allproduct, setAllProduct] = useAtom(getProductsAtom);
  const deleteWishList = ({ productId }) => {
    addToWishListService({
      body: {
        productId,
      },
    }).then((res) => {
      setWishList({
        data: wishList?.data?.filter((i) => i?._id !== res?.data?._id),
      });

      setAllProduct({
        ...allproduct,
        products: allproduct?.products?.map((i) => {
          if (i?._id === item?.productDetails?._id) {
            return {
              ...i,
              isAddedToWishlist: false,
            };
          }
          return i;
        }),
      });
    });
  };
  return (
    <View style={styles.container} key={item?._id}>
      <Image
        source={{ uri: item?.productDetails?.media?.[0]?.url }}
        style={styles.image}
      />
      <View style={styles.info}>
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.title}>{item?.productDetails?.name}</Text>
              <Text style={styles.description}>
                {item?.productDetails?.description} • $
                {item?.productDetails?.price / 100}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                deleteWishList({ productId: item?.productDetails?._id });
              }}
              style={{
                marginRight: 10,
              }}
            >
              <Ionicons name={"heart"} size={26} color={"#aaeebb"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${item?.productDetails?.price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
    width: widthToDp("90%"),
  },
  image: {
    width: widthToDp(30),
    height: heightToDp(30),
    borderRadius: 10,
  },
  title: {
    fontSize: widthToDp(4),
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    marginLeft: widthToDp(3),
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: heightToDp(2),
    width: widthToDp(50),
  },
  description: {
    fontSize: widthToDp(3.5),
    color: "#8e8e93",
    marginTop: heightToDp(2),
  },

  price: {
    fontSize: widthToDp(4),
  },
  quantity: {
    fontSize: widthToDp(4),
  },
});
