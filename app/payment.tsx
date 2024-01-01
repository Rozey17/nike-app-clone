import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import useCartStore from "../store/cartStore";

const payment = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
      clearCart();
    }, 2000);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Image
        source={{
          uri: "https://www.pngall.com/wp-content/uploads/13/Check-Background-PNG.png",
        }}
        className="w-40 h-40"
      />
      <Text className="text-xl font-semibold text-emerald-500">
        Paiement réussi
      </Text>
    </View>
  );
};

export default payment;
