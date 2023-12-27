import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const News = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="px-5 divide-y divide-gray-300">
        <TouchableOpacity
          onPress={() => router.push("/productList")}
          className="py-8"
        >
          <Text>Nouveautés cadeaux</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/productList")}
          className="py-8"
        >
          <Text>Nouveautés cadeaux</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/productList")}
          className="py-8"
        >
          <Text>Nouveautés cadeaux</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/productList")}
          className="py-8"
        >
          <Text>Nouveautés cadeaux</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default News;
