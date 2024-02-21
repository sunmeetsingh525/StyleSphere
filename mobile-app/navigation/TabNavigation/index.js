import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Shop from "../../src/screens/shop.js";
import AccountStack from "../AccountStack";
import HomeStack from "../HomeStack";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { Text, View } from "react-native";
import WishListScreen from "../../src/screens/WishListScreen/index.js";
import { wishListAtom } from "../../utils/globalState/wishlist.js";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [wishList] = useAtom(wishListAtom);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#17232d",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: "relative",
              }}
            >
              <Ionicons name="cart" color={color} size={20} />
              {wishList?.data?.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#aaeebb",
                    width: 15,
                    height: 15,
                    borderRadius: 5,
                    top: 0,
                    right: -10,
                    zIndex: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#17232d",
                      fontSize: 10,
                    }}
                  >
                    {wishList?.data?.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={AccountStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={20} />
          ),
          headerShown: false,
          headerTitle: "Account",
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
