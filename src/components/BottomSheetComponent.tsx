import { View, Text, Image } from "react-native";
import React, { forwardRef, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheetFooter from "./BottomSheetFooter";
import moment from "moment";
import { Product } from "./ApolloComponents";
import CustomBackdrop from "./BackdropComponent";

interface BottomSheetprops {
  item: Product;
  items: number;
  total: number;
}
moment.locale("fr");
const date = moment();

// forwardRef is because we are not allowed to pass refs to a component
const BottomSheetComponent = forwardRef<BottomSheetModal, BottomSheetprops>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["25%", "70%"], []);

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
                {props.items === 1 ? (
                  <>
                    <Text className="text-lg font-semibold text-center">
                      {props.item?.name}
                    </Text>
                    <Text className="text-center text-neutral-400">
                      {props.item?.sub_category}{" "}
                      {props.item?.gender?.name === "male" && "pour homme"}
                      {props.item?.gender?.name === "female" && "pour femme"}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text className="text-lg font-semibold text-center">
                      Paiement
                    </Text>
                    <Text className="text-center text-neutral-400">
                      {props.items} article(s)
                    </Text>
                  </>
                )}
              </View>
              <View className="flex-row justify-between p-5">
                <Text className="font-semibold text-center">Livraison</Text>
                <View className="items-end space-y-1">
                  <Text className="text-neutral-400 ">Livraison gratuite</Text>
                  <Text className="text-neutral-400">Intitulé de la rue</Text>
                  <Text className="text-neutral-400">
                    Livraison d'ici le {date.format("ll")}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between p-5">
                <Text className="font-semibold text-center">Paiement</Text>
                <View className="flex-row items-center gap-x-3">
                  <Text className="text-center text-neutral-400">XXXX</Text>
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
                <Text className="text-center text-neutral-400">
                  {props.total.toFixed(2).toString().replace(".", ",")} €
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
