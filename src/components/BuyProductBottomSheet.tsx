import { View, Text, Image } from "react-native";
import React, { forwardRef, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "./BackdropComponent";
import BottomSheetFooter from "./BottomSheetFooter";
import moment from "moment";
import { Product } from "./ApolloComponents";

interface BottomSheetprops {
  item: Product;
}
moment.locale("fr");
const date = moment();

const BuyProductBottomSheet = forwardRef<BottomSheetModal, BottomSheetprops>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["25%", "75%"], []);
    let total = props.item?.price?.toString().replace(".", ",");
console.log(props.item?.color);

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
            <Text
              className="text-lg font-semibold text-center"
              style={{ fontFamily: "HelveticaMedium" }}
            >
              {props.item?.name}
            </Text>
            <Text
              style={{ fontFamily: "HelveticaRegular" }}
              className="text-center text-neutral-400"
            >
              {props.item?.color}
            </Text>
          </View>
          <View className="flex-row justify-between p-5">
            <Text
              className="text-center "
              style={{ fontFamily: "HelveticaBold" }}
            >
              Livraison
            </Text>
            <View className="items-end space-y-1">
              <Text
                style={{ fontFamily: "HelveticaRegular" }}
                className="text-neutral-400 "
              >
                Livraison gratuite
              </Text>
              <Text
                style={{ fontFamily: "HelveticaRegular" }}
                className="text-neutral-400"
              >
                Intitulé de la rue
              </Text>
              <Text
                style={{ fontFamily: "HelveticaRegular" }}
                className="text-neutral-400"
              >
                Livraison d'ici le {date.format("ll")}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between p-5">
            <Text
              className="font-semibold text-center"
              style={{ fontFamily: "HelveticaBold" }}
            >
              Paiement
            </Text>
            <View className="flex-row items-center gap-x-3">
              <Text
                style={{ fontFamily: "HelveticaRegular" }}
                className="text-center text-neutral-400"
              >
                XXXX
              </Text>
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/020/975/572/original/visa-logo-visa-icon-transparent-free-png.png",
                }}
                className="w-7 h-7"
              />
            </View>
          </View>
          <View className="flex-row justify-between p-5">
            <Text
              style={{ fontFamily: "HelveticaBold" }}
              className="font-semibold text-center"
            >
              Résumé de l'achat
            </Text>
            <Text
              style={{ fontFamily: "HelveticaRegular" }}
              className="text-center text-neutral-400"
            >
              {total} €
            </Text>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  </BottomSheetModalProvider>
);
  }
);

export default BuyProductBottomSheet;
