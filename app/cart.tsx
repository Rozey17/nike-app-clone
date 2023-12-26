import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Cart = () => {
  const router = useRouter();
  return (
    <View className="justify-between h-full bg-white px-5 py-2">
      <View></View>
      <View className=" items-center space-y-2">
        <View className="h-14 w-14 rounded-full p-3 border  items-center">
          <SimpleLineIcons name="bag" size={24} color="black" />
        </View>
        <Text className="text-center">Ton panier est vide</Text>
        <Text className="text-center">
          Les produits ajoutés apparaîtront ici.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="bg-black p-5 rounded-full"
      >
        <Text className="text-center text-lg font-semibold text-white">
          Acheter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
