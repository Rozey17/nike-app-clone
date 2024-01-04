import {
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { urlForImage } from "../lib/sanity";
import {
  Product,
  useListProductsByCategoryQuery,
} from "../components/apollo-components";
import ProductCard from "../components/ProductCard";


const menAccessoriesList = () => {
  const { data: products, loading } = useListProductsByCategoryQuery({
    variables: {
      category: "accessories",
    },
  });

  const listProducts =
    products && products?.allProduct ? products?.allProduct : [];

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      key={item._id}
      id={item._id as string}
      name={item.name as string}
      price={item.price as number}
      image={urlForImage(item.image as string).url()}
      gender={item?.gender?.name as string}
      description={item.description as string}
      category={item?.category?.name as string}
      sub_category={item?.sub_category as string}
    />
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

export default menAccessoriesList;
