import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/backdropComponent";
import useCartStore from "../store/cartStore";
import BottomSheetComponent from "../components/BottomSheetComponent";

const news = () => {
  const modalSheetBottomref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "67%"], []);
  function handlePresentModal() {
    modalSheetBottomref.current?.present();
  }
  const { items } = useCartStore();

  return (
    <View className="flex-1">
      <Button onPress={handlePresentModal} title="open" />
      <BottomSheetComponent items={10} ref={modalSheetBottomref} total={10} />
    </View>
  );
};

export default news;
