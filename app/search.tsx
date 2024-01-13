import {
  View,
  ListRenderItem,
  FlatList,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ListProductsBySearchDocument,
  Product,
} from "../src/components/ApolloComponents";
import ProductCard from "../src/components/ProductCard";
import SearchInput from "../src/components/SearchInput";
import { client } from "../src/lib/graphql";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    const listProducts = await client.query({
      query: ListProductsBySearchDocument,
      variables: {
        searchterm: searchString,
      },
    });
    setProducts(listProducts?.data?.allProduct);
    setLoading(listProducts?.loading);
    // {
    //   listProducts.map((x) => console.log(x.image?.asset?.url));
    // }
  }

  // async function getPosts() {
  //   const query = `*[_type == "product" && name match $queryString + "*" || sub_category match $queryString +"*"]{
  //     _id,name,description,category->,price,gender->,size,sub_category,"image": image.asset ->url
  //   }`;
  //   const params = { queryString: searchString };
  //   const posts = await client.fetch(query, params);
  //   setProducts(posts);
  //   // {
  //   //   posts.map((x: any) => console.log(x.image));
  //   // }
  // }

  const handleClickUser = async () => {
    if (searchString === "" || searchString.trim() === "") return;
    // getPosts();
    getProducts();
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
      {products?.length === 0 ? (
        <View className="p-10">
          <Text
            style={{ fontFamily: "HelveticaRegular" }}
            className="text-center text-[16px]"
          >
            Aucun résultat trouvé
          </Text>
        </View>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator color="#9ca3af" size="large" />
          ) : (
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
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Search;
