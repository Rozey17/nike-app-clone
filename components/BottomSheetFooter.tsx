import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const BottomSheetFooter = () => {
  return (
    <View className="p-5 space-y-5 border-t border-gray-100">
      <Text className="text-xs text-neutral-400">{`En cliquant sur 'Soumettre le paiement', j'accepte les Conditions de vente et la Politique de confidentialité `}</Text>
      <TouchableOpacity
        onPress={() => router.push("/payment")}
        className="p-5 bg-black rounded-full"
      >
        <Text className="text-lg font-semibold text-center text-white">
          Soumettre le paiement
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetFooter;
