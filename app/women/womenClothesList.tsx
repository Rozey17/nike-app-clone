import {
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { urlForImage } from "../../lib/sanity";
import {
  Product,
  useListProductsByCategoryAndGenderQuery,
} from "../../components/apollo-components";
import ProductCard from "../../components/ProductCard";

const womenClothesList = () => {
  const { data: products, loading } = useListProductsByCategoryAndGenderQuery({
    variables: {
      category: "clothes",
      gender: "female",
    },
  });

  const listProducts =
    products && products?.allProduct ? products?.allProduct : [];

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard key={item._id} item={item} />
  );

  return (
    <>
      {loading ? (
        <View className="items-center justify-center flex-1 bg-white">
          <ActivityIndicator color="#9ca3af" size="large" />
        </View>
      ) : (
        <View className="flex-1 bg-white">
          <FlatList
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            data={listProducts}
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
  );
};

export default womenClothesList;
