import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";

const SizesModal = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const DATA = [
    { key: "EU 35.5", value: 35.5 },
    { key: "EU 36", value: 36 },
    { key: "EU 36.5", value: 36.5 },
    { key: "EU 37", value: 37 },
    { key: "EU 37.5", value: 37.5 },
    { key: "EU 38", value: 38 },
    { key: "EU 38.5", value: 38.5 },
    { key: "EU 39", value: 39 },
    { key: "EU 39.5", value: 39.5 },
    { key: "EU 40", value: 40 },
    { key: "EU 40.5", value: 40.5 },
    { key: "EU 41", value: 41 },
    { key: "EU 41.5", value: 41.5 },
    { key: "EU 42", value: 42 },
    { key: "EU 42.5", value: 42.5 },
    { key: "EU 43", value: 43 },
    { key: "EU 43.5", value: 43.5 },
    { key: "EU 44", value: 44 },
    { key: "EU 44.5", value: 44.5 },
    { key: "EU 45", value: 45 },
    { key: "EU 45.5", value: 45.5 },
    { key: "EU 46", value: 46 },
  ];
  return (
    <SafeAreaView className="flex-1 overflow-hidden bg-white">
      <View className="p-5 flex-row justify-between items-center border-b border-gray-300">
        <Text>Tailles</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-gray-400">Annuler</Text>
        </Pressable>
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {DATA.map((x) => (
          <Pressable
            key={x.value}
            className="p-5  border-b border-gray-300 "
            onPress={() => {
              setSelected(!selected), router.back();
            }}
          >
            <View className="flex-row justify-between">
              <Text className="uppercase font-semibold">{x.key}</Text>
              {selected ? (
                <Feather name="check" size={24} color="black" />
              ) : null}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SizesModal;
