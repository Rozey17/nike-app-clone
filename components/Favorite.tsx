import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import { MaterialIcons } from "@expo/vector-icons";

type TFavoriteComp = (props: { productId: string }) => JSX.Element;

const Favorite: TFavoriteComp = ({ productId }) => {
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
    <TouchableOpacity
      onPress={handleFavorites}
      className="items-center flex-1 justify-center border border-gray-300 rounded-full h-[65px] ml-2"
    >
      <View className="absolute inset-1/2">
        <MaterialIcons name="favorite-outline" size={26} color="black" />
      </View>

      {favoriteItems.map((itemId) => {
        if (itemId === productId) {
          return (
            <MaterialIcons
              key={itemId}
              name="favorite"
              size={26}
              color="black"
            />
          );
        }
      })}
    </TouchableOpacity>
  );
};

export default Favorite;
