import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const womenShoes = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="px-5 divide-y divide-gray-300">
        <TouchableOpacity
          onPress={() => router.push("/women/womenShoesList")}
          className="py-8"
        >
          <Text style={{ fontFamily: "HelveticaRegular" }}>
            Toutes les chaussures
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default womenShoes;
