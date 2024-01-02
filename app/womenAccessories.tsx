import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const womenAccessories = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="px-5 divide-y divide-gray-300">
        <TouchableOpacity
          onPress={() => router.push("/womenAccessoriesList")}
          className="py-8"
        >
          <Text>Tous les accessoires</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default womenAccessories;
