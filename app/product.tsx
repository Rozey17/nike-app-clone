import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ListRenderItem,
  Pressable,
  Modal,
  TouchableHighlight,
} from "react-native";
import React, { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Toast } from "native-base";
import useCartStore from "../src/store/cartStore";
import Favorite from "../src/components/Favorite";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BuyProductBottomSheet from "../src/components/BuyProductBottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";

type Size = {
  name: string;
  value: string | number;
};

const Product = () => {
  const { addProduct } = useCartStore();
  const params = useLocalSearchParams();
  const pictures = params.images?.toString().split(",");

  const handleSizeChange = (value: Size) => {
    setSize(value);
    setModalVisible(false);
  };

  const renderSizeItem = ({ item }: { item: Size }) => (
    <TouchableOpacity
      className="px-5 py-8 border-b border-neutral-300 "
      onPress={() => handleSizeChange(item)}
    >
      <View className="flex-row justify-between">
        <Text
          className="uppercase "
          style={{
            fontFamily: "HelveticaMedium",
          }}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const [size, setSize] = useState<Size>();
  const shoeSizes = [
    { name: "EU 35.5", value: 35.5 },
    { name: "EU 36", value: 36 },
    { name: "EU 36.5", value: 36.5 },
    { name: "EU 37", value: 37 },
    { name: "EU 37.5", value: 37.5 },
    { name: "EU 38", value: 38 },
    { name: "EU 38.5", value: 38.5 },
    { name: "EU 39", value: 39 },
    { name: "EU 39.5", value: 39.5 },
    { name: "EU 40", value: 40 },
    { name: "EU 40.5", value: 40.5 },
    { name: "EU 41", value: 41 },
    { name: "EU 41.5", value: 41.5 },
    { name: "EU 42", value: 42 },
    { name: "EU 42.5", value: 42.5 },
    { name: "EU 43", value: 43 },
    { name: "EU 43.5", value: 43.5 },
    { name: "EU 44", value: 44 },
    { name: "EU 44.5", value: 44.5 },
    { name: "EU 45", value: 45 },
    { name: "EU 45.5", value: 45.5 },
    { name: "EU 46", value: 46 },
  ];
  const capSizes = [
    { name: "S/M", value: "S/M" },
    { name: "M/L", value: "M/L" },
    { name: "L/XL", value: "L/XL" },
  ];
  const gloveSizes = [
    { name: "S", value: "S" },
    { name: "M", value: "M" },
    { name: "L", value: "L" },
    { name: "XL", value: "XL" },
  ];
  const clothSizes = [
    { name: "XS", value: "XS" },
    { name: "S", value: "S" },
    { name: "M", value: "" },
    { name: "L", value: "L" },
    { name: "XL", value: "XL" },
    { name: "XXL", value: "XXL" },
    { name: "XXXL", value: "XXXL" },
  ];
  const sockSizes = [
    { name: "EU 34-38", value: "34-38" },
    { name: "EU 38-42", value: "38-42" },
    { name: "EU 42-46", value: "42-46" },
    { name: "EU 46-50", value: "46-50" },
  ];
  const sleevesSizes = [
    { name: "S/M", value: "S/M" },
    { name: "L/XL", value: "L/XL" },
  ];

  const getSizes = (category: string, sub_category: string): Size[] => {
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

  const [isModalVisible, setModalVisible] = useState(false);

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

        {/* Images of the product */}

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
                  currentSlideIndex == index ? "bg-black" : "bg-neutral-300"
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

          {/* Select product size */}

          <View className="pt-5 space-y-3">
            {params.sub_category.includes("Sac") ? (
              <Text
                className="text-center uppercase "
                style={{ fontFamily: "HelveticaBold" }}
              >
                taille unique{" "}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="justify-center flex-row items-center bg-white rounded-full h-[65px] border border-neutral-300"
              >
                {size?.value === undefined ? (
                  <>
                    <Text
                      className="text-lg text-center "
                      style={{
                        fontFamily: "HelveticaMedium",
                      }}
                    >
                      Sélectionner la taille{" "}
                    </Text>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                  </>
                ) : (
                  <>
                    <Text
                      className="text-lg text-center "
                      style={{
                        fontFamily: "HelveticaMedium",
                      }}
                    >
                      {`Taille ${size?.name}`}
                    </Text>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                  </>
                )}
              </TouchableOpacity>
            )}

            {/* the select size modal */}

            <Modal
              visible={isModalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <SafeAreaView className="flex-1 overflow-hidden bg-white">
                <View className="flex-row items-center justify-between px-5 py-8 border-b border-neutral-300">
                  <Text
                    className="text-neutral-400 "
                    style={{
                      fontFamily: "HelveticaMedium",
                    }}
                  >
                    Tailles
                  </Text>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <Text
                      className="text-neutral-400"
                      style={{
                        fontFamily: "HelveticaMedium",
                      }}
                    >
                      Annuler
                    </Text>
                  </Pressable>
                </View>

                <FlatList
                  data={getSizes(
                    params?.category as string,
                    params?.sub_category as string
                  )}
                  renderItem={renderSizeItem}
                  showsVerticalScrollIndicator={false}
                />
              </SafeAreaView>
            </Modal>
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
                className="flex-1 justify-center border border-neutral-300 rounded-full h-[65px]"
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
            className="text-[16px] leading-6 text-center text-neutral-400 p-14"
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
