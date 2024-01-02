import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import { MaterialIcons } from "@expo/vector-icons";

type TFavoriteComp = (props: { productId: string }) => JSX.Element;

const ProductCardFavorite: TFavoriteComp = ({ productId }) => {
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems);
  const addToFavorites = useFavoriteStore((state) => state.addToFavorites);
  const removeFromFavorites = useFavoriteStore(
    (state) => state.removeFromFavorites
  );

  // handle favorites
  const handleFavorites = () => {
    const item = favoriteItems.find((itemId) => itemId === productId);
    if (item) {
      removeFromFavorites(productId, favoriteItems);
    } else {
      addToFavorites(productId);
    }
  };
  return (
    <Pressable
      onPress={handleFavorites}
      className="absolute z-10 p-[7px] bg-white rounded-full h-15 w-15 top-3 right-3"
    >
      <MaterialIcons name="favorite-outline" size={20} color="black" />

      {favoriteItems.map((itemId) => {
        if (itemId === productId) {
          return (
            <View key={itemId} className="absolute top-[7px] right-[7px]">
              <MaterialIcons name="favorite" size={20} color="black" />
            </View>
          );
        }
      })}
    </Pressable>
  );
};

export default ProductCardFavorite;
