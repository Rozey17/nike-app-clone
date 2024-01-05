import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ProductCardFavorite from "./ProductCardFavorite";
import { Product } from "./ApolloComponents";
import { urlForImage } from "../lib/sanity";

const ProductSearchResultCard = ({ item }: { item: Product }) => {
  const router = useRouter();
  let stringPrice = item.price?.toString().replace(".", ",");

  return (
    <TouchableOpacity
      className="relative w-1/2"
      onPress={() =>
        router.push({
          pathname: "/product",
          params: {
            id: item?._id as string,
            name: item?.name as string,
            gender: item?.gender?.name as string,
            price: item?.price as number,
            //@ts-ignore
            image: item?.image?.asset?._ref as string,
            description: item?.description as string,
            category: item?.category?.name as string,
            sub_category: item?.sub_category as string,
          },
        })
      }
    >
      <ProductCardFavorite productId={item?._id!} />
      <Image
        source={{
          uri: urlForImage(item?.image as string).url(),
        }}
        className="h-52"
      />
      <View className="p-4 space-y-3">
        <View>
          <Text className="font-medium">{item?.name}</Text>
          <Text className="text-neutral-500 ">
            {item?.sub_category} {item?.gender?.name === "male" && "pour homme"}
            {item?.gender?.name === "female" && "pour femme"}
          </Text>
        </View>

        <Text className="font-medium ">{stringPrice} €</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductSearchResultCard;
