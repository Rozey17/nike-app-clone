import { View, Text } from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";

const favourites = () => {
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems);

  return (
    <View>
      {favoriteItems.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </View>
  );
};

export default favourites;
