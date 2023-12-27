import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const addedToCartModal = () => {
  useEffect(() => {
    setTimeout(() => router.back(), 1500);
  }, []);

  return (
    <View className="justify-center flex-1 bg-black opacity-80">
      <View className="items-center space-y-2">
        <Ionicons name="checkmark-circle-sharp" size={60} color="#84cc16" />
        <Text className="text-white">Ajouté au panier</Text>
        <Text className="text-white">(1 article ajouté)</Text>
      </View>
    </View>
  );
};

export default addedToCartModal;
