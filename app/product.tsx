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
import { Entypo, Feather } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Toast } from "native-base";
import useCartStore from "../src/store/cartStore";
import Favorite from "../src/components/Favorite";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BuyProductBottomSheet from "../src/components/BuyProductBottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  capSizes,
  clothSizes,
  getSizes,
  gloveSizes,
  shoeSizes,
  sleevesSizes,
  sockSizes,
} from "../src/utils/sizes";

const Product = () => {
  const { addProduct } = useCartStore();
  const params = useLocalSearchParams();
  const pictures = params.images?.toString().split(",");

  const handleSizeChange = (value: Size) => {
    setSize(value);
    setModalVisible(false);
  };

  const renderSizeItem = ({ item }: { item: Size }) => (
    <Pressable
      android_ripple={{ color: "#d4d4d4" }}
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
        {size?.name === item.name && (
          <Feather name="check" size={24} color="black" />
        )}
      </View>
    </Pressable>
  );

  const [size, setSize] = useState<Size>();

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

  const renderImageItem: ListRenderItem<string> = ({ item }) => (
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
          renderItem={renderImageItem}
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
              <View className="overflow-hidden rounded-full">
                <Pressable
                  android_ripple={{ color: "#d4d4d4", borderless: false }}
                  onPress={() => setModalVisible(true)}
                  className="justify-center flex-row items-center bg-white rounded-full h-[65px] border border-neutral-300 "
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
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="black"
                      />
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
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="black"
                      />
                    </>
                  )}
                </Pressable>
              </View>
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
                  keyExtractor={(item) => item.name}
                  renderItem={renderSizeItem}
                  showsVerticalScrollIndicator={false}
                />
              </SafeAreaView>
            </Modal>

            <View className="flex-1 overflow-hidden rounded-full">
              <Pressable
                android_ripple={{ color: "#4b5563", borderless: false }}
                onPress={() => {
                  if (
                    size?.value === undefined &&
                    params?.sub_category.includes("Sac") === false
                  ) {
                    setModalVisible(true);
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
              </Pressable>
            </View>

            <View className="flex-row items-center ">
              <View className="flex-1 overflow-hidden rounded-full">
                <Pressable
                  android_ripple={{ color: "#d4d4d4", borderless: false }}
                  onPress={() => {
                    if (
                      size?.value === undefined &&
                      params?.sub_category.includes("Sac") === false
                    ) {
                      setModalVisible(true);
                    } else handlePresentModal();
                  }}
                  className=" justify-center border border-neutral-300 rounded-full h-[65px] "
                >
                  <Text
                    className="text-lg text-center"
                    style={{
                      fontFamily: "HelveticaMedium",
                    }}
                  >
                    Acheter
                  </Text>
                </Pressable>
              </View>

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
