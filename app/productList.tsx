import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const ProductList = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View className="flex-row space-x-1">
        <TouchableOpacity
          className="relative w-48 "
          onPress={() => router.push("/product")}
        >
          <Pressable
            onPress={() => setSelected(!selected)}
            className="absolute z-10 p-[7px] bg-white rounded-full h-15 w-15 top-3 right-3"
          >
            {selected ? (
              <MaterialIcons name="favorite" size={20} color="black" />
            ) : (
              <MaterialIcons name="favorite-outline" size={20} color="black" />
            )}
          </Pressable>
          <Image
            source={{
              uri: "https://www.snipes.fr/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dw59a79e6c/2280990_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png",
            }}
            className="h-52"
          />
          <View className="p-4 space-y-3">
            <View>
              <Text>Nike V2K Run</Text>
              <Text className="text-gray-500">Chaussure pour femme</Text>
            </View>

            <Text className="font-bold">119.99€</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductList;
