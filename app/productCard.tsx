import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ProductType } from "../store/interfaces";

const productCard = ({
  id,
  name,
  gender,
  price,
  image,
  description,
  category,
  sub_category,
}: any) => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      className="relative w-1/2"
      onPress={() =>
        router.push({
          pathname: "/product",
          params: {
            id,
            name,
            gender,
            price,
            image,
            description,
            category,
            sub_category,
          },
        })
      }
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
          uri: image,
        }}
        className="h-52"
      />
      <View className="p-4 space-y-3">
        <View>
          <Text className="">{name}</Text>
          <Text className="text-gray-500 ">{sub_category} pour</Text>
        </View>

        <Text className="font-bold ">{price}€</Text>
        {/* <Text className="font-bold ">{category}€</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default productCard;
