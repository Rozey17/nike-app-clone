import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ProductType } from "../store/interfaces";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const subtotal = (price: number, quantity: number) => {
  const sub = price * quantity;
  return sub.toFixed(2);
};

const CartItem = ({
  item,
  addProduct,
  removeProduct,
}: {
  item: ProductType;
  addProduct: (item: ProductType) => void;
  removeProduct: (item: ProductType) => void;
}) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product",
          params: {
            id: item.id,
            name: item.name,
            gender: item?.gender as string,
            price: item.price,
            image: item.image,
            description: item.description,
            category: item.category,
            sub_category: item.sub_category,
          },
        })
      }
      className="py-5 space-y-3 border-b border-gray-200"
    >
      <View className="flex-row space-x-3">
        <Image source={{ uri: item.image }} className="w-28 h-28" />
        <View className="space-y-2">
          <Text className="font-semibold font">{item.name}</Text>
          <Text className="text-gray-400">
            {item.sub_category}
            {item.gender === "male" && "pour homme"}
            {item.gender === "female" && "pour femme"}
          </Text>
          <Text className="text-gray-400">
            {/* {item.sub_category.includes("Sac") &&
            <Text className="font-bold text-center uppercase">
              taille unique{" "}
            </Text>} */}
            {item.category === "shoes"
              ? `Pointure ${item.size}`
              : `Taille ${
                  item.sub_category.includes("Sac") ? "unique" : item.size
                }`}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 border border-gray-200 rounded-md"
            onPress={() => removeProduct(item)}
          >
            {item.quantity === 1 ? (
              <AntDesign name="delete" size={20} color="black" />
            ) : (
              <Text className="text-xl">-</Text>
            )}
          </TouchableOpacity>
          <Text className="font-medium">Qté {item.quantity}</Text>
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 border border-gray-200 rounded-md"
            onPress={() => addProduct(item)}
          >
            <Text className="text-xl">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-medium text-green-700">
          {subtotal(item.price, item.quantity as number)}€
        </Text>
      </View>
    </Pressable>
  );
};

export default CartItem;
