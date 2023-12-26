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
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

const product = () => {
  return (
    // <SafeAreaView>
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Image
        source={{
          uri: "https://www.snipes.fr/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dw59a79e6c/2280990_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png",
        }}
        className="object-cover h-96"
      />
      <View className="py-10 px-5 space-y-5">
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
          <TouchableOpacity className="rounded-full p-4 border border-gray-300 flex-row justify-center">
            <View className="flex-row space-x-1 items-center">
              <Text className="text-center font-semibold">Taille EU 42</Text>
              <Entypo name="chevron-small-down" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Pressable className="bg-black p-4 rounded-full">
            <Text className="text-white text-center">Ajouter au panier</Text>
          </Pressable>
          <View className="flex-row space-x-2 items-center">
            <TouchableOpacity className="rounded-full p-4 border border-gray-300 flex-1">
              <Text className="text-center font-semibold">Acheter</Text>
            </TouchableOpacity>
            <View className="rounded-full p-4 border border-gray-300 items-center flex-1">
              <MaterialIcons name="favorite-outline" size={20} color="black" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default product;
