import { View, Text, ListRenderItem, FlatList } from "react-native";
import React from "react";
import useWishlistStore from "../store/wishlistStore";
import { ProductType } from "../store/interfaces";
import ProductCard from "./productCard";
import { urlForImage } from "../lib/sanity";

const favourites = () => {
  const { favourites } = useWishlistStore();

  const renderItem: ListRenderItem<ProductType> = ({ item }) => (
    <ProductCard
      id={item.id}
      name={item.name}
      price={item.price}
      image={item.image}
      gender={item.gender}
      description={item.description}
      category={item.category}
      sub_category={item.sub_category}
    />
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={favourites}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          flexDirection: "row",
          gap: 5,
          paddingVertical: 15,
        }}
      />
    </View>
  );
};

export default favourites;
