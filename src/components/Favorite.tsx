import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import { useFavoriteStore } from "../store/wishlistStore";
import { MaterialIcons } from "@expo/vector-icons";
import { useToast } from "native-base";

type TFavoriteComp = (props: { productId: string }) => JSX.Element;

const { width } = Dimensions.get("window");
const toastWidth = Math.round(width / 6) * 5;

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
    <View className="flex-1 ml-2 overflow-hidden rounded-full">
      <Pressable
        android_ripple={{ color: "#d4d4d4", borderless: false }}
        onPress={handleFavorites}
        className="items-center justify-center border border-gray-300 rounded-full h-[65px]"
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
      </Pressable>
    </View>
  );
};

export default Favorite;
