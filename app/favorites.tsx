import {
  View,
  ListRenderItem,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Product,
  useListProductsQuery,
} from "../src/components/ApolloComponents";
import { useFavoriteStore } from "../src/store/wishlistStore";
import ProductCard from "../src/components/ProductCard";

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
    <ProductCard key={item._id} item={item} />
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
