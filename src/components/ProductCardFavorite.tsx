import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import { MaterialIcons } from "@expo/vector-icons";
import { useToast } from "native-base";

type TFavoriteComp = (props: { productId: string }) => JSX.Element;

const { width } = Dimensions.get("window");
const toastWidth = Math.round(width / 6) * 5;

const ProductCardFavorite: TFavoriteComp = ({ productId }) => {
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
          <View
            className="relative px-5 py-4 bg-black rounded-md opacity-90"
            style={{ width: toastWidth }}
          >
            <Text
              className="z-20 text-white"
              style={{ fontFamily: "HelveticaMedium" }}
            >
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
          <View
            className="px-5 py-4 bg-black rounded-md opacity-90"
            style={{ width: toastWidth }}
          >
            <Text
              className="text-white "
              style={{ fontFamily: "HelveticaMedium" }}
            >
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
