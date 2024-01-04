import { View, Text, ListRenderItem, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../lib/sanity.server";
import { Product } from "../components/apollo-components";
import ProductCard from "../components/ProductCard";
import { urlForImage } from "../lib/sanity";
import SearchInput from "../components/SearchInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Search = () => {
  const [searchString, setSearchString] = useState("");

  const [products, setProducts] = useState<Product[]>();

  async function getPosts() {
    const query = `*[_type == "product" && name match $queryString || sub_category match $queryString]`;
    const params = { queryString: searchString };
    const posts = await client.fetch(query, params);
    setProducts(posts);
    console.log(posts);
  }

  const handleClickUser = async () => {
    if (searchString === "" || searchString.trim() === "") return;
    getPosts();
  };
  useEffect(() => {
    if (searchString !== "") {
      handleClickUser();
    }
  }, [searchString]);

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <ProductCard
        id={item._id as string}
        name={item.name as string}
        category={item.category?.name as string}
        description={item.description as string}
        price={item.price as number}
        image={urlForImage(item.image as string).url()}
        sub_category={item.sub_category as string}
        gender={item.gender?.name as string}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-row items-center px-5 bg-white"
        // style={{
        //   shadowColor: "#000",
        //   // shadowOffset: {
        //   //   width: 0,
        //   //   height: 1,
        //   // },
        //   shadowOpacity: 0.18,
        //   shadowRadius: 1.0,
        //   elevation: 2,
        // }}
      >
        <View>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </Pressable>
        </View>
        <SearchInput
          value={searchString}
          onChange={(e) => setSearchString(e.nativeEvent.text)}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ columnGap: 10 }}
        data={products}
        renderItem={renderItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Search;
