import {
  View,
  Text,
  ListRenderItem,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";

const ProductImages = ({ pictures }: { pictures: string[] }) => {
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
    <View>
      <FlatList
        data={pictures}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        bounces={false}
        renderItem={renderImageItem}
      />
      {pictures?.length > 1 && (
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
      )}
    </View>
  );
};

export default ProductImages;
