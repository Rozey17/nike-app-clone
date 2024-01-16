import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

const addedToCartModal = () => {
  useEffect(() => {
    setTimeout(() => router.back(), 2000);
  }, []);

  return (
    <View className="justify-center flex-1 bg-black opacity-80 space-y-80">
      <LottieView
        source={require("./../assets/animations/Animation - 1705424644989.json")}
        autoPlay
      />
      <View className="items-center space-y-2">
        <Text className="text-white">Ajouté au panier</Text>
        <Text className="text-white">(1 article ajouté)</Text>
      </View>
    </View>
  );
};

export default addedToCartModal;
