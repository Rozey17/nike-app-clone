import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const news = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-white">
      <View className="p-10 divide-y divide-gray-400">
        <TouchableOpacity onPress={() => router.push("/productList")}>
          <Text>Nouveautés cadeaux</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/productList")}>
          <Text>Nouveautés cadeaux</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default news;
