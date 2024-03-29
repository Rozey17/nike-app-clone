import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ProductCardFavorite from "./ProductCardFavorite";
import { Product } from "./ApolloComponents";
import { urlForImage } from "../lib/sanity";

const ProductCard = ({ item }: { item: Product }) => {
  const router = useRouter();
  let stringPrice = item.price?.toString().replace(".", ",");

  return (
    <Pressable
      android_ripple={{ color: "#d1d5db", foreground: true }}
      className="relative w-1/2"
      onPress={() =>
        router.push({
          pathname: "/product",
          params: {
            _id: item?._id as string,
            name: item?.name as string,
            gender: item?.gender?.name as string,
            price: item?.price as number,
            images: item?.images?.map((x) => x?.asset?.url) as string[],
            description: item?.description as string,
            category: item?.category?.name as string,
            sub_category: item?.sub_category as string,
            color: item?.color as string,
          },
        })
      }
    >
      <ProductCardFavorite productId={item?._id!} />

      <Image
        source={{
          uri: urlForImage(item?.images?.[0] as string).url(),
        }}
        className="h-52"
      />
      <View className="p-4 space-y-3">
        <View>
          <Text style={{ fontFamily: "HelveticaMedium" }}>{item?.name}</Text>
          <Text
            className="text-neutral-500 "
            style={{ fontFamily: "HelveticaRegular" }}
          >
            {item?.sub_category} {item?.gender?.name === "male" && "pour homme"}
            {item?.gender?.name === "female" && "pour femme"}
          </Text>
        </View>

        <Text style={{ fontFamily: "HelveticaMedium" }}>{stringPrice} €</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
