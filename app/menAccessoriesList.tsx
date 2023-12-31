import { View, Text, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { ProductType } from "../store/interfaces";
import { client } from "../lib/sanity.server";
import { urlForImage } from "../lib/sanity";

const menAccessoriesList = () => {
  const [accessories, setAccessories] = useState<any>([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == 'product' && references(*[_type=="category" && name == 'accessories' ]._id)]{
  _id, name,price,image,description,category->,sub_category,
  gender->
}`
      )
      .then((res) => {
        setAccessories(res);
      });
  }, []);
  //   const renderItem: ListRenderItem<ProductType> = ({ item }) => (
  //     <ProductCard
  //       id={item._id}
  //       name={item.name}
  //       price={item.price}
  //       image={item.image}
  //       gender={item.gender}
  //       description={item.description}
  //       category={item.category}
  //       sub_category={item.sub_category}
  //     />
  //   );

  const itemData = accessories.map((item: any) => (
    <ProductCard
      id={item._id}
      name={item.name}
      price={item.price}
      image={urlForImage(item.image).url()}
      gender={item?.gender?.name}
      description={item.description}
      category={item.category.name}
      sub_category={item.sub_category}
    />
  ));

  return (
    <View className="flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={itemData}
        renderItem={({ item }) => item}
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

export default menAccessoriesList;
