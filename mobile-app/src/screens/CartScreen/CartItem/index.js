import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { cartAtom } from "../../../../utils/globalState/cart";
import { useAtom } from "jotai";
import { Ionicons } from "@expo/vector-icons";
import { deleteProductService } from "../../../../utils/services/cart";
import { getProductsAtom } from "../../../../utils/globalState/product";

export default function CartItem({ product, addToCartFunction }) {
  const [cart, setCart] = useAtom(cartAtom);
  const [allproduct, setAllProduct] = useAtom(getProductsAtom);

  const deleteProduct = ({ cartId, productId }) => {
    deleteProductService({
      pathParams: {
        id: cartId,
      },
    }).then(() => {
      const updatedCart = cart?.data?.filter((i) => i?._id !== cartId);
      setCart({
        data: updatedCart,
      });
      setAllProduct({
        ...allproduct,
        products: allproduct?.products?.map((i) => {
          if (i?._id === productId) {
            return {
              ...i,
              isAddedToCart: false,
            };
          }
          return i;
        }),
      });
    });
  };
  return (
    <View style={styles.container} key={product?._id}>
      <Image
        source={{ uri: product?.productDetails?.media?.[0]?.url }}
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
              <Text style={styles.title}>{product?.productDetails?.name}</Text>
              <Text style={styles.description}>
                {product?.productDetails?.description} • $
                {product?.productDetails?.price / 100}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                deleteProduct({
                  cartId: product?._id,
                  productId: product?.productDetails?._id,
                });
              }}
            >
              <Ionicons name="trash-outline" size={20} color={"red"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${product?.productDetails?.price}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const updatedQuantity = product?.quantity - 1;
                if (updatedQuantity > 0) {
                  addToCartFunction({
                    productId: product?.productDetails?._id,
                    quantity: updatedQuantity,
                  });
                }
              }}
              style={{
                borderWidth: 1,
                borderColor: "#e6e6e6",
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={styles.quantity}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                padding: 10,
              }}
            >
              {product?.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => {
                const updatedQuantity = product?.quantity + 1;
                addToCartFunction({
                  productId: product?.productDetails?._id,
                  quantity: updatedQuantity,
                });
              }}
              style={{
                borderWidth: 1,
                borderColor: "#e6e6e6",
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={styles.quantity}>+</Text>
            </TouchableOpacity>
          </View>
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
