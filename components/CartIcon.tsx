import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useCartStore from "../store/cartStore";
import { useRouter } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";

const CartIcon = () => {
  const { items } = useCartStore();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/cart")}
      className="relative ml-4"
    >
      <SimpleLineIcons name="bag" size={24} color="black" />
      <Text
        className={
          items <= 9
            ? `absolute text-[13px] left-2 top-[5px]`
            : `absolute text-[11px] left-[6px] top-[6px]`
        }
      >
        {items <= 9 ? items : "9+"}
      </Text>
    </TouchableOpacity>
  );
};

export default CartIcon;
