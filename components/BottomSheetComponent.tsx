import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React, { forwardRef, useMemo, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/backdropComponent";
import { router } from "expo-router";
import BottomSheetFooter from "./BottomSheetFooter";

interface BottomSheetprops {
  items: number;
  total: number;
}

// forwardRef is because we are not allowed to pass refs to a component
const BottomSheetComponent = forwardRef<BottomSheetModal, BottomSheetprops>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["25%", "67%"], []);

    return (
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            index={1}
            backdropComponent={CustomBackdrop}
            footerComponent={BottomSheetFooter}
          >
            <View className="divide-y divide-gray-100">
              <View className="p-5 space-y-1">
                <Text className="text-lg font-semibold text-center">
                  Paiement
                </Text>
                <Text className="text-center text-gray-400">
                  {props.items} article(s)
                </Text>
              </View>
              <View className="flex-row justify-between p-5">
                <Text className="font-semibold text-center">Livraison</Text>
                <View className="space-y-1 ">
                  <Text className="text-gray-400">Livraison gratuite</Text>
                  <Text className="text-gray-400">Intitulé de la rue</Text>
                  <Text className="text-gray-400">Livraison d'ici le </Text>
                </View>
              </View>
              <View className="flex-row justify-between p-5">
                <Text className="font-semibold text-center">Paiement</Text>
                <View className="flex-row items-center gap-x-3">
                  <Text className="text-center text-gray-400">XXXX</Text>
                  <Image
                    source={{
                      uri: "https://static.vecteezy.com/system/resources/previews/020/975/572/original/visa-logo-visa-icon-transparent-free-png.png",
                    }}
                    className="w-7 h-7"
                  />
                </View>
              </View>
              <View className="flex-row justify-between p-5">
                <Text className="font-semibold text-center">
                  Résumé de l'achat
                </Text>
                <Text className="text-center text-gray-400">
                  {props.total} €
                </Text>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    );
  }
);

export default BottomSheetComponent;
