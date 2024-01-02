import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ProductType } from "../store/interfaces";
import ProductCardFavorite from "../components/ProductCardFavorite";

const productCard = ({
  id,
  name,
  gender,
  price,
  image,
  description,
  category,
  sub_category,
}: ProductType) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="relative w-1/2"
      onPress={() =>
        router.push({
          pathname: "/product",
          params: {
            id,
            name,
            gender: gender as string,
            price,
            image,
            description,
            category,
            sub_category,
          },
        })
      }
    >
      <ProductCardFavorite productId={id as any} />
      <Image
        source={{
          uri: image,
        }}
        className="h-52"
      />
      <View className="p-4 space-y-3">
        <View>
          <Text className="">{name}</Text>
          <Text className="text-neutral-500 ">
            {sub_category} {gender === "male" && "pour homme"}
            {gender === "female" && "pour femme"}
          </Text>
        </View>

        <Text className="font-bold ">{price}€</Text>
        {/* <Text className="font-bold ">{category}€</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default productCard;
