import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { Toast, useToast } from "native-base";
import useCartStore from "../store/cartStore";

const Product = () => {
  const toast = useToast();
  const shoeSizes = [
    { title: "EU 35.5", value: 35.5 },
    { title: "EU 36", value: 36 },
    { title: "EU 36.5", value: 36.5 },
    { title: "EU 37", value: 37 },
    { title: "EU 37.5", value: 37.5 },
    { title: "EU 38", value: 38 },
    { title: "EU 38.5", value: 38.5 },
    { title: "EU 39", value: 39 },
    { title: "EU 39.5", value: 39.5 },
    { title: "EU 40", value: 40 },
    { title: "EU 40.5", value: 40.5 },
    { title: "EU 41", value: 41 },
    { title: "EU 41.5", value: 41.5 },
    { title: "EU 42", value: 42 },
    { title: "EU 42.5", value: 42.5 },
    { title: "EU 43", value: 43 },
    { title: "EU 43.5", value: 43.5 },
    { title: "EU 44", value: 44 },
    { title: "EU 44.5", value: 44.5 },
    { title: "EU 45", value: 45 },
    { title: "EU 45.5", value: 45.5 },
    { title: "EU 46", value: 46 },
  ];

  const clothSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const { addProduct } = useCartStore();
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  const [size, setSize] = useState(null);
  let productSize: number;
  if (size !== null) {
    productSize = size;
  }
  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      scrollEventThrottle={5}
    >
      {/* Display the name of the product as header title */}

      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      {/* Product image */}
      <Image
        source={{
          uri: params.image as string,
        }}
        className="object-cover h-96"
      />
      <View className="px-6 py-10 space-y-5">
        <View>
          <Text className="text-[16px]">
            {params.sub_category as string} pour{" "}
            {params.gender === "male" ? "homme" : "femme"}
          </Text>
          <Text className="text-2xl font-bold capitalize">{params.name}</Text>
        </View>

        <Text className="text-[16px]">{params.price}€</Text>
        <Text className="text-[16px]">{params.description}</Text>
        <View className="pt-5 space-y-3">
          <SelectDropdown
            data={params.category === "shoes" ? shoeSizes : clothSizes}
            onSelect={(selectedItem, index) => {
              setSize(
                params.category === "shoes" ? selectedItem.value : selectedItem
              );
            }}
            defaultButtonText={"Taille"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `Taille ${
                params.category === "shoes" ? selectedItem.title : selectedItem
              } `;
            }}
            buttonTextStyle={{ fontSize: 18, fontWeight: "600" }}
            buttonStyle={{
              borderRadius: 9999,
              borderColor: "#d1d5db",
              justifyContent: "space-between",
              borderWidth: 1,
              width: "100%",
              height: 65,
              backgroundColor: "white",
            }}
            dropdownIconPosition={"right"}
            renderDropdownIcon={() => {
              return (
                <Entypo name="chevron-small-down" size={24} color="black" />
              );
            }}
            rowTextForSelection={(item, index) => {
              return params.category === "shoes" ? item.title : item;
            }}
            rowTextStyle={{ textAlign: "left" }}
            // renderCustomizedRowChild={(item, index) => {
            //   return (
            //     <View className="flex-row items-center justify-between">
            //       <Text>{item}</Text>
            //       <Ionicons name="checkmark" size={24} color="black" />
            //     </View>
            //   );
            // }}
          />

          <TouchableOpacity
            onPress={() => {
              if (size === null) {
                Toast.show({
                  render: () => {
                    return (
                      <View className="p-4 bg-gray-800 rounded w-96">
                        <Text className="font-semibold text-white">
                          Veuillez choisir une taille
                        </Text>
                      </View>
                    );
                  },
                });
              } else
                addProduct({
                  id: params.id as any,
                  description: params.description as string,
                  gender: params.gender as string,
                  image: params.image as string,
                  name: params.name as string,
                  size: productSize,
                  price: params.price as any,
                  category: params.category as string,
                  sub_category: params.sub_category as string,
                }),
                  router.push("/addedToCartModal");
            }}
            className="justify-center bg-black rounded-full h-[65px]"
          >
            <Text className="text-lg font-semibold text-center text-white">
              Ajouter au panier
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="flex-1 justify-center border border-gray-300 rounded-full h-[65px]">
              <Text className="text-lg font-semibold text-center">Acheter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(!selected),
                  toast.show({
                    placement: "bottom",
                    render: () => {
                      return (
                        <View className="p-4 bg-gray-800 rounded w-96">
                          {selected ? (
                            <Text className="font-semibold text-white">
                              Supprimé des favoris
                            </Text>
                          ) : (
                            <Text className="font-semibold text-white">
                              Ajouté aux favoris
                            </Text>
                          )}
                        </View>
                      );
                    },
                  });
              }}
              className="items-center flex-1 justify-center border border-gray-300 rounded-full h-[65px]"
            >
              {selected ? (
                <MaterialIcons name="favorite" size={26} color="black" />
              ) : (
                <MaterialIcons
                  name="favorite-outline"
                  size={26}
                  color="black"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-[16px] leading-loose text-center text-gray-400 p-14">
          Ce produit est exclus de toutes les promotions et réductions.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Product;
