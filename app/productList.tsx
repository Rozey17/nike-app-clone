import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const ProductList = () => {
  const router = useRouter();
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View className="space-x-1 flex-row">
        <TouchableOpacity
          className=" relative w-1/2 flex-1"
          onPress={() => router.push("/product")}
        >
          <View className="h-15 w-15 rounded-full p-2 absolute top-3 right-3 bg-white z-10">
            <MaterialIcons name="favorite-outline" size={20} color="black" />
          </View>
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
        <TouchableOpacity
          className=" relative w-1/2 flex-1"
          onPress={() => router.push("/product")}
        >
          <View className="h-15 w-15 rounded-full p-2 absolute top-3 right-3 bg-white z-10">
            <MaterialIcons name="favorite-outline" size={20} color="black" />
          </View>
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
