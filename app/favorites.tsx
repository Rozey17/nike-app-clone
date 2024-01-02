import { View, Text, ListRenderItem, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import { client } from "../lib/sanity.server";
import { ProductType } from "../store/interfaces";
import ProductCard from "./productCard";
import { urlForImage } from "../lib/sanity";
import { Product, useListProductsQuery } from "../components/apollo-components";

const favourites = () => {
  const { data: products } = useListProductsQuery();
  const listProducts =
    products && products.allProduct ? products.allProduct : [];
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems);
  const favoriteItemsFilteredData: any[] =
    favoriteItems?.map((itemId) =>
      listProducts?.find((product) => product?._id === itemId)
    ) || [];

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      id={item._id as string}
      name={item.name as string}
      price={item.price as number}
      image={urlForImage(item.image as string).url()}
      gender={item?.gender?.name as string}
      description={item.description as string}
      category={item?.category?.name as string}
      sub_category={item.sub_category as string}
    />
  );
  return (
    <View className="flex-1 bg-white">
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        data={favoriteItemsFilteredData}
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
