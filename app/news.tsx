import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/backdropComponent";
import useCartStore from "../store/cartStore";

const news = () => {
  const modalSheetBottomref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "67%"], []);
  function handlePresentModal() {
    modalSheetBottomref.current?.present();
  }
  const { items } = useCartStore();

  return (
    <BottomSheetModalProvider>
      <View>
        <Button onPress={handlePresentModal} title="open" />
        <BottomSheetModal
          ref={modalSheetBottomref}
          snapPoints={snapPoints}
          index={1}
          backdropComponent={CustomBackdrop}
        >
          <View className="divide-y divide-gray-100">
            <View className="p-5 space-y-1">
              <Text className="text-lg font-semibold text-center">
                Paiement
              </Text>
              <Text className="text-center text-gray-400">
                {items} article(s)
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
                {items} article(s)
              </Text>
            </View>
            <View className="p-5 space-y-5">
              <Text className="text-xs text-gray-400">{`En cliquant sur 'Soumettre le paiement', j'accepte les Conditions de vente et la Politique de confidentialité `}</Text>
              <TouchableOpacity className="p-5 bg-black rounded-full">
                <Text className="text-lg font-semibold text-center text-white">
                  Soumettre le paiement
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default news;
