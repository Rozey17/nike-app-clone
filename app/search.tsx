import { View, ListRenderItem, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../src/lib/sanity.server";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Product } from "../src/components/ApolloComponents";
import ProductCard from "../src/components/ProductCard";
import SearchInput from "../src/components/SearchInput";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [products, setProducts] = useState<Product[]>();

  async function getPosts() {
    const query = `*[_type == "product" && name match $queryString + "*" || sub_category match $queryString +"*"]{
      _id,gender{_id,name},image,name,sub_category
    }`;
    const params = { queryString: searchString };
    const posts = await client.fetch(query, params);
    setProducts(posts);
    // console.log(posts);
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
    return <ProductCard key={item._id} item={item} />;
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
        data={products}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          flexDirection: "row",
          gap: 5,
          paddingVertical: 15,
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
