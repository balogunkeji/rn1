import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View } from "react-native";

import {styles, btnText, btn } from "./tabs.style";
import { SIZES } from "../../../constants";

function TabButton({ name, activeTab, onHandleSearchType }: {name: string, activeTab: string, onHandleSearchType: any}) {
  return (
    <TouchableOpacity
      style={btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

const Tabs = ({ tabs, activeTab, setActiveTab }: {tabs: string[], activeTab: string, setActiveTab: any}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Tabs;