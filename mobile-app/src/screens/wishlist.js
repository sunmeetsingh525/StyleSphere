import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import s from "../../styles/mainStyle";
import ProductMini from "../components/universal/productmini";
import { getWishListService } from "../../utils/services/wishlist";
const { width, height } = Dimensions.get("window");
export default function WishList(props) {
  const [getWishList, setGetWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWishListFunction = () => {
    getWishListService({})
      .then((res) => {
        setGetWishList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWishListFunction();
  }, []);
  console.log(getWishList);
  return (
    <>
      <View style={[s.fl1, s.pdlt10, s.pdtp10]}>
        <Text style={[s.f28, s.b]}>Saved</Text>
        <Text style={[s.f18]}>
          Products you <Icon name="heart" color={"cornflowerblue"} size={18} />
        </Text>
      </View>
      <View style={[s.row, s.wrapper, s.mgtp30]}>
        {isLoading ? (
          <View style={[s.fl1, s.tocnt, s.mgtp20]}>
            <ActivityIndicator size={"small"} />
          </View>
        ) : (
          <FlatList
            data={getWishList}
            renderItem={({ item }) => (
              <ProductMini
                width={width / 2.3}
                height={250}
                productTitleStyle={props?.productTitleStyle}
                productimgheight={100}
                productimgresizemode={"contain"}
                product={item}
              />
            )}
            ListEmptyComponent={() => <View style={{}}></View>}
            keyExtractor={(item) => item?._id}
          />
        )}
      </View>
    </>
  );
}
