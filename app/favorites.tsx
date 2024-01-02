import {
  View,
  ListRenderItem,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import ProductCard from "./productCard";
import { urlForImage } from "../lib/sanity";
import { Product, useListProductsQuery } from "../components/apollo-components";
import { MaterialIcons } from "@expo/vector-icons";

const favourites = () => {
  const { data: products, loading } = useListProductsQuery();
  const listProducts =
    products && products.allProduct ? products.allProduct : [];
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems);
  const favoriteItemsFilteredData: any[] =
    favoriteItems?.map((itemId) =>
      listProducts?.find((product) => product?._id === itemId)
    ) || [];

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      id={item?._id as string}
      name={item?.name as string}
      price={item?.price as number}
      image={urlForImage(item?.image as string).url()}
      gender={item?.gender?.name as string}
      description={item?.description as string}
      category={item?.category?.name as string}
      sub_category={item?.sub_category as string}
    />
  );
  return (
    <>
      {favoriteItemsFilteredData.length === 0 ? (
        <View className="items-center justify-center flex-1 bg-white">
          <View className="items-center space-y-3">
            <MaterialIcons name="favorite" size={30} color="black" />

            <Text className="text-[16px] text-gray-400">
              Vous n'avez pas de favoris.
            </Text>
          </View>
        </View>
      ) : (
        <>
          {loading ? (
            <View className="items-center justify-center flex-1 bg-white">
              <ActivityIndicator />
            </View>
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default favourites;
