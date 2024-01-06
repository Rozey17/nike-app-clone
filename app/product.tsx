import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { Toast, useToast } from "native-base";
import useCartStore from "../src/store/cartStore";
import Favorite from "../src/components/Favorite";
import { urlForImage } from "../src/lib/sanity";

const Product = () => {
  const toast = useToast();
  const { addProduct } = useCartStore();
  const [selected, setSelected] = useState(false);
  const params = useLocalSearchParams();
  const [size, setSize] = useState(null);
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
  const capSizes = [
    { title: "S/M", value: "S/M" },
    { title: "M/L", value: "M/L" },
    { title: "L/XL", value: "L/XL" },
  ];
  const gloveSizes = [
    { title: "S", value: "S" },
    { title: "M", value: "M" },
    { title: "L", value: "L" },
    { title: "XL", value: "XL" },
  ];
  const clothSizes = [
    { title: "XS", value: "XS" },
    { title: "S", value: "S" },
    { title: "M", value: "" },
    { title: "L", value: "L" },
    { title: "XL", value: "XL" },
    { title: "XXL", value: "XXL" },
    { title: "XXXL", value: "XXXL" },
  ];
  const sockSizes = [
    { title: "EU 34-38", value: "34-38" },
    { title: "EU 38-42", value: "38-42" },
    { title: "EU 42-46", value: "42-46" },
    { title: "EU 46-50", value: "46-50" },
  ];
  const sleevesSizes = [
    { title: "S/M", value: "S/M" },
    { title: "L/XL", value: "L/XL" },
  ];

  const getSizes = (category: string, sub_category: string): any[] => {
    if (category === "shoes") {
      return shoeSizes;
    } else if (sub_category.includes("Chaussettes")) {
      return sockSizes;
    } else if (sub_category.includes("Casquette")) {
      return capSizes;
    } else if (sub_category.includes("Gants")) {
      return gloveSizes;
    } else if (sub_category.includes("Manchons")) {
      return sleevesSizes;
    } else return clothSizes;
  };

  let stringPrice = params?.price.toString().replace(".", ",");

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      {/* Display the name of the product as header title */}

      <Stack.Screen
        options={{
          title: params?.name as string,
        }}
      />
      {/* Product image */}
      <Image
        source={{
          // uri: urlForImage(params?.image).url() as any,
          uri: params?.image as string,
        }}
        className="object-cover h-96"
      />
      <View className="px-6 py-10 space-y-5">
        <View>
          <Text className="text-[16px]">
            {params?.sub_category as string}{" "}
            {params?.gender === "male" && "pour homme"}
            {params?.gender === "female" && "pour femme"}
          </Text>
          <Text className="text-2xl font-bold capitalize">{params?.name}</Text>
        </View>

        <Text className="text-[16px]">{stringPrice} €</Text>
        <Text className="text-[16px]">{params?.description}</Text>
        <View className="pt-5 space-y-3">
          {params.sub_category.includes("Sac") ? (
            <Text className="font-bold text-center uppercase">
              taille unique{" "}
            </Text>
          ) : (
            <SelectDropdown
              defaultValue={"Sélectionner la taille"}
              data={getSizes(
                params?.category as string,
                params?.sub_category as string
              )}
              onSelect={(selectedItem, index) => {
                setSize(selectedItem.value);
              }}
              defaultButtonText={"Sélectionner la taille"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return `Taille ${selectedItem.title} `;
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
                return item.title;
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
          )}

          <TouchableOpacity
            onPress={() => {
              if (
                size === null &&
                params?.sub_category.includes("Sac") === false
              ) {
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
                  _id: params._id as string,
                  description: params.description as string,
                  gender: params.gender as object,
                  image: params.image as object,
                  name: params.name as string,
                  size: size as any,
                  price: params.price as any,
                  category: params.category as object,
                  sub_category: params.sub_category as any,
                }),
                  router.push("/addedToCartModal");
            }}
            className="justify-center bg-black rounded-full h-[65px]"
          >
            <Text className="text-lg font-semibold text-center text-white">
              Ajouter au panier
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center ">
            <TouchableOpacity className="flex-1 justify-center border border-gray-300 rounded-full h-[65px]">
              <Text className="text-lg font-semibold text-center">Acheter</Text>
            </TouchableOpacity>
            <Favorite productId={params.id as string} />
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
