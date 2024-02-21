import React, { useState } from "react";
import { Dimensions, View, Text, ScrollView, FlatList } from "react-native";
import Header from "../components/universal/header";
import s from "../../styles/mainStyle";
import Tabs from "../components/universal/tab";
import Preview from "../components/universal/horizontalPreview";
import ProductMini from "../components/universal/productmini";
import { getCategoryAtom } from "../../utils/globalState/category";
import { getProductsAtom } from "../../utils/globalState/product";
import { useAtom } from "jotai";

const { width } = Dimensions.get("window");
export default function Shop(props) {
  const [categoryData] = useAtom(getCategoryAtom);
  const [activeCat, setActiveCat] = useState(1);
  const [allProduct] = useAtom(getProductsAtom);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <View style={s.fl1}>
          <Text style={[s.f18, s.b, s.pdlt10]}>Category</Text>
          <Tabs
            data={[{ _id: 1, name: "All" }, ...categoryData]}
            bgcolor="transparent"
            tabVal={activeCat}
            setActiveCat={setActiveCat}
          />
        </View>
        <View style={{}}>
          <Preview
            title="New Years Deals"
            width={width / 1.2}
            productimgheight={150}
            productimgresizemode="cover"
            productTitleStyle={[{ fontSize: 22 }, s.b]}
            bigBanner={true}
            products={allProduct?.products?.filter((i) => {
              if (activeCat != 1) {
                return i?.category?._id === activeCat;
              }
              return true;
            })}
          />
        </View>
        <View style={[s.fl1, s.mgtp20]}>
          <View style={[s.row, s.spacedBw, s.pdlt10, s.pdrt10]}>
            <Text style={[s.f22, s.b]}>New Arrivals</Text>
          </View>

          <View style={[s.row, s.wrapper, s.mgtp30, s.pdlt10]}>
            <FlatList
              data={allProduct?.products}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <ProductMini
                  height={250}
                  productTitleStyle={props.productTitleStyle}
                  productimgheight={100}
                  productimgresizemode={"contain"}
                  product={item}
                />
              )}
              keyExtractor={(item) => item?._id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
