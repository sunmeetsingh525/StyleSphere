import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import Preview from "../components/universal/horizontalPreview.js";
import Tabs from "../components/universal/tab.js";
import s from "../../styles/mainStyle";
import Banner from "../components/universal/banner.js";
import Header from "../components/universal/header.js";
import { getCategoryService } from "../../utils/services/category";
import { getProductServices } from "../../utils/services/product";
import { getProductsAtom } from "../../utils/globalState/product";
import { getCategoryAtom } from "../../utils/globalState/category";
import { useAtom } from "jotai";
export default function Home({ navigation }) {
  const [allproduct, setAllProduct] = useAtom(getProductsAtom);
  const [isLoading, setisLoading] = useState(true);
  const [categoryData, setCategoryData] = useAtom(getCategoryAtom);
  const getCategory = (url) => {
    getCategoryService({}).then((res) => {
      setCategoryData(res.data);
    });
  };
  const getAllProduct = () => {
    setisLoading(true);
    getProductServices({})
      .then((res) => {
        setAllProduct(res);
        setisLoading(false);
      })
      .catch((e) => setisLoading(false));
  };

  useEffect(() => {
    getAllProduct();
    getCategory();
  }, []);
  return (
    <ScrollView>
      <Header />
      {isLoading ? (
        <View style={[s.fl1, s.tocnt, s.mgtp20]}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        <>
          <Banner
            width="100%"
            height={150}
            image="https://image.freepik.com/free-vector/mega-sale-offers-modern-promotional-banner_501916-61.jpg"
          />
          {/* <Tabs
            data={[{ _id: 1, name: "All" }, ...categoryData]}
            bgcolor="transparent"
            tabVal={activeCat}
            setActiveCat={setActiveCat}
          /> */}
          <Preview
            navigation={navigation}
            title="Flash Sale"
            products={allproduct?.products}
          />
          <Banner
            width="100%"
            height={150}
            // image="https://ecommerce-sunmeet.s3.ca-central-1.amazonaws.com/banner.png"
            image="https://img.freepik.com/premium-vector/teddy-bear-green-hooded-sweatshirt-style-fashionillustration-vector-illustration_76964-18482.jpg?w=1380"
          />
          <Preview title="Recently Viewed" products={allproduct?.products} />
        </>
      )}
    </ScrollView>
  );
}
