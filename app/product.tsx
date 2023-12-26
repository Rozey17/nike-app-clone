import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";

const product = () => {
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
  return (
    // <SafeAreaView>
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
      alwaysBounceVertical={false}
    >
      <Image
        source={{
          uri: "https://www.snipes.fr/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dw59a79e6c/2280990_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png",
        }}
        className="object-cover h-96"
      />
      <View className="px-5 py-10 space-y-5">
        <View>
          <Text>Chaussure pour femme</Text>
          <Text className="text-xl font-bold capitalize">Nike V2K Run</Text>
        </View>

        <Text>119,99€</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          error, velit eos quaerat facere veritatis minima autem voluptatibus
          nam, eaque non dolor, perspiciatis sunt fugit id corrupti libero!
          Aliquid harum corrupti ex, iusto numquam minus nam accusamus adipisci
          nisi laborum placeat voluptates, debitis obcaecati magnam
          perspiciatis. Ab dolor esse, voluptate error atque enim suscipit dicta
          fuga. Totam, molestias voluptas. Laboriosam, voluptates nulla sapiente
          magni aliquid, nihil quam velit esse modi magnam incidunt. Totam
          repudiandae distinctio odit incidunt temporibus accusantium repellat
          hic neque necessitatibus corporis, officia quisquam at ex
          exercitationem, officiis, amet nulla odio labore facere sit laudantium
          possimus. Quo, corporis.
        </Text>
        <View className="space-y-3">
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
            buttonTextStyle={{ fontSize: 16 }}
            buttonStyle={{
              borderRadius: 9999,

              borderColor: "#d1d5db",
              justifyContent: "space-between",
              borderWidth: 1,
              width: "100%",
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
          />
          {/* <TouchableOpacity className="flex-row justify-center p-4 border border-gray-300 rounded-full">
            <TouchableOpacity
              onPress={() => router.push("/sizesModal")}
              className="flex-row items-center space-x-1"
            >
              <Text className="font-semibold text-center">Taille EU 42</Text>
              <Entypo name="chevron-small-down" size={24} color="black" />
            </TouchableOpacity>

            
          </TouchableOpacity> */}
          <Pressable className="p-4 bg-black rounded-full">
            <Text className="text-center text-white">Ajouter au panier</Text>
          </Pressable>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="flex-1 p-4 border border-gray-300 rounded-full">
              <Text className="font-semibold text-center">Acheter</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center flex-1 p-4 border border-gray-300 rounded-full">
              <MaterialIcons name="favorite-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default product;
