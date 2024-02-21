import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

const Tabs = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: 5,
      }}
    >
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: props.bgcolor,
          height: 60,
        }}
      >
        {props?.data?.map((data, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                props.setActiveCat(data?._id);
              }}
              style={[
                styles.item,
                props.tabVal === data._id && styles.itemActive,
              ]}
            >
              <Text style={styles.tab}>{data.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    color: "#17232d",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    backgroundColor: "#d9deea90",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "	rgba(211,211,211,0.5)",
    marginLeft: 10,
    marginRight: 8,
    marginTop: "auto",
    marginBottom: "auto",
  },
  itemActive: {
    paddingBottom: 10,
    borderWidth: 1.4,
    borderColor: "#000",
  },
});

export default Tabs;
