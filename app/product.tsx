import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ListRenderItem,
} from "react-native";
import React, { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { Toast } from "native-base";
import useCartStore from "../src/store/cartStore";
import Favorite from "../src/components/Favorite";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BuyProductBottomSheet from "../src/components/BuyProductBottomSheet";

const Product = () => {
  const { addProduct } = useCartStore();
  const params = useLocalSearchParams();
  const pictures = params.images?.toString().split(",");

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

  const modalSheetBottomref = useRef<BottomSheetModal>(null);
  function handlePresentModal() {
    modalSheetBottomref.current?.present();
  }

  const { width } = Dimensions.get("window");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  function updateCurrentSlideIndex(e: any) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  }

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{
        width: width,
        height: 500,
      }}
    />
  );
  return (
    <>
      <ScrollView
        className="bg-white"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        {/* Display the name of the product as header title */}

        <Stack.Screen
          options={{
            title: params?.name as string,
            headerTitleStyle: {
              fontFamily: "HelveticaMedium",
            },
          }}
        />
        {/* Product images */}
        <FlatList
          data={pictures}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          bounces={false}
          renderItem={renderItem}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            top: 470,
            alignSelf: "center",
          }}
        >
          {pictures.map((_, index) => {
            return (
              <View
                key={index}
                className={`h-[2px] w-10 ${
                  currentSlideIndex == index ? "bg-black" : "bg-gray-300"
                }`}
              />
            );
          })}
        </View>
        <View className="px-6 py-10 space-y-5">
          <View>
            <Text
              className="text-[16px] pb-1"
              style={{ fontFamily: "HelveticaRegular" }}
            >
              {params?.sub_category as string}{" "}
              {params?.gender === "male" && "pour homme"}
              {params?.gender === "female" && "pour femme"}
            </Text>
            <Text
              className="text-2xl capitalize "
              style={{
                fontFamily: "HelveticaBold",
              }}
            >
              {params?.name}
            </Text>
          </View>

          <Text
            className="text-[16px]"
            style={{ fontFamily: "HelveticaRegular" }}
          >
            {stringPrice} €
          </Text>
          <Text
            className="text-[16px] leading-7"
            style={{ fontFamily: "HelveticaRegular" }}
          >
            {params?.description}
          </Text>
          <View>
            <Text
              className="text-[16px]"
              style={{ fontFamily: "HelveticaRegular" }}
            >{`\u2022  Présenté en : ${params.color}`}</Text>
            {/* <Text
              className="text-[16px]"
              style={{ fontFamily: "HelveticaRegular" }}
            >{`\u2022  Article : ${params._id}`}</Text> */}
          </View>

          <View className="pt-5 space-y-3">
            {params.sub_category.includes("Sac") ? (
              <Text
                className="text-center uppercase "
                style={{ fontFamily: "HelveticaBold" }}
              >
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
                buttonTextStyle={{
                  fontSize: 18,

                  fontFamily: "HelveticaMedium",
                }}
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
                        <View className="px-5 py-4 bg-black rounded-md w-[360px] opacity-90">
                          <Text
                            className="text-white "
                            style={{
                              fontFamily: "HelveticaMedium",
                            }}
                          >
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
                    gender: {
                      name: params.gender as string,
                    },
                    images: params.images as any,
                    name: params.name as string,
                    size: size as any,
                    price: params.price as any,
                    category: {
                      name: params.category as string,
                    },
                    sub_category: params.sub_category as any,
                    color: params.color as string,
                  }),
                    router.push("/addedToCartModal");
              }}
              className="justify-center bg-black rounded-full h-[65px]"
            >
              <Text
                className="text-lg text-center text-white"
                style={{
                  fontFamily: "HelveticaMedium",
                }}
              >
                Ajouter au panier
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center ">
              <TouchableOpacity
                onPress={() => {
                  if (
                    size === null &&
                    params?.sub_category.includes("Sac") === false
                  ) {
                    Toast.show({
                      render: () => {
                        return (
                          <View className="py-4 px-5 bg-black rounded-md w-[360px] opacity-90">
                            <Text
                              className="text-white "
                              style={{
                                fontFamily: "HelveticaMedium",
                              }}
                            >
                              Veuillez choisir une taille
                            </Text>
                          </View>
                        );
                      },
                    });
                  } else handlePresentModal();
                }}
                className="flex-1 justify-center border border-gray-300 rounded-full h-[65px]"
              >
                <Text
                  className="text-lg text-center"
                  style={{
                    fontFamily: "HelveticaMedium",
                  }}
                >
                  Acheter
                </Text>
              </TouchableOpacity>
              <Favorite productId={params._id as string} />
            </View>
          </View>

          <Text
            style={{ fontFamily: "HelveticaRegular" }}
            className="text-[16px] leading-6 text-center text-gray-400 p-14"
          >
            Ce produit est exclus de toutes les promotions et réductions.
          </Text>
        </View>
      </ScrollView>
      <BuyProductBottomSheet
        item={{
          _id: params._id as string,
          description: params.description as string,
          gender: {
            name: params.gender as string,
          },
          images: params.images as any,
          name: params.name as string,
          size: size as any,
          price: params.price as any,
          category: {
            name: params.category as string,
          },
          sub_category: params.sub_category as any,
          color: params.color as string,
        }}
        ref={modalSheetBottomref}
      />
    </>
  );
};

export default Product;
