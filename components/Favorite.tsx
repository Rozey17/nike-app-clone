import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Toast, useToast } from "native-base";

type TFavoriteComp = (props: { productId: string }) => JSX.Element;

const id = "test-toast";
const id2 = "test-toast";

const Favorite: TFavoriteComp = ({ productId }) => {
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems);
  const addToFavorites = useFavoriteStore((state) => state.addToFavorites);
  const removeFromFavorites = useFavoriteStore(
    (state) => state.removeFromFavorites
  );

  const toast = useToast();
  const toastIdRef = React.useRef();
  const toastIdRef2 = React.useRef();

  function addToFavoriteToast() {
    toastIdRef.current = toast.show({
      render: () => {
        return (
          <View className="relative p-6 bg-black rounded-md w-96 opacity-90">
            <Text className="z-20 font-semibold text-center text-[16px] text-white">
              Ajouté aux favoris
            </Text>
          </View>
        );
      },
    });
  }

  function removeFromFavoriteToast() {
    toastIdRef2.current = toast.show({
      render: () => {
        return (
          <View className="p-6 bg-black rounded-md w-96 opacity-90">
            <Text className="font-semibold text-center text-[16px] text-white">
              Supprimé des favoris
            </Text>
          </View>
        );
      },
    });
  }

  // handle favorites
  const handleFavorites = () => {
    const item = favoriteItems.find((itemId) => itemId === productId);
    if (item) {
      removeFromFavorites(productId, favoriteItems);
      if (toastIdRef.current) {
        removeFromFavoriteToast();
        toast.close(toastIdRef.current);
      }
    } else {
      if (toastIdRef2.current) {
        addToFavorites(productId);
        addToFavoriteToast();
        toast.close(toastIdRef2.current);
      } else {
        addToFavorites(productId);
        addToFavoriteToast();
      }
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
