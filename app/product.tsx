import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { useToast } from "native-base";
import useCartStore from "../store/cartStore";

const Product = () => {
  const toast = useToast();
  const DATA = [
    "EU 35.5",
    "EU 36",
    "EU 36.5",
    "EU 37",
    "EU 37.5",
    "EU 38",
    "EU 38.5",
    "EU 39",
    "EU 39.5",
    "EU 40",
    "EU 40.5",
    "EU 41",
    "EU 41.5",
    "EU 42",
    "EU 42.5",
    "EU 43",
    "EU 43.5",
    "EU 44",
    "EU 44.5",
    "EU 45",
    "EU 45.5",
    "EU 46",
  ];

  const { addProduct, removeProduct, products } = useCartStore();
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      scrollEventThrottle={5}
    >
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      <Image
        source={{
          uri: params.image as string,
        }}
        className="object-cover h-96"
      />
      <View className="px-5 py-10 space-y-5">
        <View>
          <Text className="text-[16px]">
            Chaussure pour {params.gender === "male" ? "homme" : "femme"}
          </Text>
          <Text className="text-2xl font-bold capitalize">{params.name}</Text>
        </View>

        <Text className="text-[16px]">{params.price}€</Text>
        <Text className="text-[16px]">{params.description}</Text>
        <View className="pt-5 space-y-3">
          <SelectDropdown
            data={DATA}
            // defaultValueByIndex={1} // use default value by index or default value
            // defaultValue={'Canada'} // use default value by index or default value
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={"Taille"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `Taille ${selectedItem} `;
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
              return item;
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
            onPress={() => router.push("/addedToCartModal")}
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
