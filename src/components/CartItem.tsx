import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Product } from "./ApolloComponents";

const subtotal = (price: number, quantity: number) => {
  const sub = price * quantity;
  return sub.toFixed(2);
};

const CartItem = ({
  item,
  addProduct,
  removeProduct,
}: {
  item: Product;
  addProduct: (item: Product) => void;
  removeProduct: (item: Product) => void;
}) => {
  return (
    <Pressable
      // onPress={() =>
      //   router.push({
      //     pathname: "/product",
      //     params: {
      //       id: item?._id as string,
      //       name: item?.name as string,
      //       gender: item?.gender?.name as string,
      //       price: item?.price as number,
      //       image: item?.image as any,
      //       description: item?.description as string,
      //       category: item?.category?.name as string,
      //       sub_category: item?.sub_category as string,
      //     },
      //   })
      // }
      className="py-5 space-y-3 border-b-[0.6px] border-gray-200 "
    >
      <View className="flex-row space-x-3">
        <Image
          source={{ uri: item?.images?.[0] as string }}
          className="w-28 h-28"
        />
        <View className="space-y-1">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ fontFamily: "HelveticaBold" }}
          >
            {item.name}
          </Text>
          <Text
            className="text-neutral-400"
            style={{ fontFamily: "HelveticaRegular" }}
          >
            {item?.sub_category} {item?.gender?.name === "male" && "pour homme"}
            {item?.gender?.name === "female" && "pour femme"}
          </Text>
          <Text className="text-neutral-400">
            {/* {item.sub_category.includes("Sac") &&
            <Text className="font-bold text-center uppercase">
              taille unique{" "}
            </Text>} */}
            {item.category?.name === "shoes" ? (
              <Text style={{ fontFamily: "HelveticaRegular" }}>
                {`Pointure ${item?.size?.value}`}
              </Text>
            ) : (
              <Text style={{ fontFamily: "HelveticaRegular" }}>
                {`Taille ${
                  item?.sub_category?.includes("Sac")
                    ? "unique"
                    : item.size?.value
                }`}
              </Text>
            )}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 border border-gray-200 rounded-md"
            onPress={() => removeProduct(item)}
          >
            {item.quantity === 1 ? (
              <AntDesign name="delete" size={20} color="black" />
            ) : (
              <Text className="text-xl">-</Text>
            )}
          </TouchableOpacity>
          <Text style={{ fontFamily: "HelveticaMedium" }}>
            Qté {item.quantity}
          </Text>
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 border border-gray-200 rounded-md"
            onPress={() => addProduct(item)}
          >
            <Text className="text-xl">+</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontFamily: "HelveticaMedium" }}
          className="text-green-700"
        >
          {subtotal(item.price!, item.quantity as number)
            .toString()
            .replace(".", ",")}{" "}
          €
        </Text>
      </View>
    </Pressable>
  );
};

export default CartItem;
