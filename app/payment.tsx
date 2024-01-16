import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import useCartStore from "../src/store/cartStore";
import LottieView from "lottie-react-native";

const payment = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
      clearCart();
    }, 3000);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <LottieView
        style={{ backgroundColor: "black" }}
        source={require("./../assets/animations/Animation - 1705424644989.json")}
        autoPlay
      />
      <Text
        style={{ fontFamily: "HelveticaBold" }}
        className="text-xl pt-80 text-emerald-500"
      >
        Paiement réussi
      </Text>
    </View>
  );
};

export default payment;
