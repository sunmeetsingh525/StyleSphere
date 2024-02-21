import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import s from "../../../styles/mainStyle.js";
import ProductMini from "./productmini.js";

const Preview = (props) => {
  return (
    <View style={[s.fl1, s.pdtp20, s.pdlt10, s.mgbt20]}>
      <Text style={[s.f18, s.b]}>{props.title}</Text>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 25,
        }}
      >
        {props?.products?.length ? (
          props?.products.map((data, i) => {
            return (
              <ProductMini
                key={i}
                navigation={props.navigation}
                productTitleStyle={props.productTitleStyle}
                productimgheight={props.productimgheight}
                productimgresizemode={props.productimgresizemode || "contain"}
                product={data}
              />
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width,
            }}
          >
            <Image
              source={{
                uri: "data:image/webp;base64,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",
              }}
              style={{
                width: 300,
                height: 150,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              No Products Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Preview;
