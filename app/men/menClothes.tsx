import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const menClothes = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="px-5 divide-y divide-gray-300">
        <TouchableOpacity
          onPress={() => router.push("/men/menClothesList")}
          className="py-8"
        >
          <Text style={{ fontFamily: "HelveticaRegular" }}>
            Tous les vêtements
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default menClothes;
