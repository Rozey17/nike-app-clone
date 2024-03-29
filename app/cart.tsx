import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "native-base";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useCartStore from "../src/store/cartStore";
import CartItem from "../src/components/CartItem";
import BottomSheetComponent from "../src/components/BottomSheetComponent";
import { Product } from "../src/components/ApolloComponents";

const Cart = () => {
  const router = useRouter();
  const { products, addProduct, removeProduct, items } = useCartStore();
  const [cartState, setCartState] = useState<Product[]>([]);
  const cart = useCartStore((state) => state.products);
  const total = cartState.reduce(
    (acc, product) => acc + product.price! * (product.quantity as number),
    0
  );
  const modalSheetBottomref = useRef<BottomSheetModal>(null);
  function handlePresentModal() {
    modalSheetBottomref.current?.present();
  }

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  let stringTotal = total.toFixed(2).toString().replace(".", ",");

  return (
    <>
      {products.length === 0 ? (
        <View className="justify-between h-full px-5 py-2 bg-white">
          <View></View>
          <View className="items-center space-y-2 ">
            <View className="items-center p-3 mb-3 border rounded-full h-14 w-14">
              <SimpleLineIcons name="bag" size={24} color="black" />
            </View>
            <Text
              className="text-center"
              style={{ fontFamily: "HelveticaRegular" }}
            >
              Ton panier est vide.
            </Text>
            <Text
              className="text-center"
              style={{ fontFamily: "HelveticaRegular" }}
            >
              Les produits ajoutés apparaîtront ici.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="p-5 bg-black rounded-full"
          >
            <Text
              style={{ fontFamily: "HelveticaMedium" }}
              className="text-lg text-center text-white"
            >
              Acheter
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            className="relative px-5 bg-white"
          >
            {cartState.map((item) => (
              <CartItem
                key={item._id}
                item={{
                  ...item,
                  images: item.images?.toString().split(",") as any[],
                }}
                addProduct={addProduct}
                removeProduct={removeProduct}
              />
            ))}

            <View className="flex-row items-center justify-between py-10">
              <Text
                className="text-[16px]"
                style={{ fontFamily: "HelveticaBold" }}
              >
                Total estimé
              </Text>
              <Text
                className="text-[16px]"
                style={{ fontFamily: "HelveticaBold" }}
              >
                {stringTotal} €
              </Text>
            </View>
          </ScrollView>
          <View className="fixed bottom-0 p-5 bg-white border-t border-gray-200 -">
            <TouchableOpacity
              onPress={handlePresentModal}
              className="p-5 bg-black rounded-full"
            >
              <Text
                className="text-lg text-center text-white"
                style={{ fontFamily: "HelveticaMedium" }}
              >
                Paiement
              </Text>
            </TouchableOpacity>
          </View>
          <BottomSheetComponent
            item={cartState[0]}
            items={items}
            total={total}
            ref={modalSheetBottomref}
          />
        </View>
      )}
    </>
  );
};

export default Cart;

// import React from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from "react-native";
// const { width } = Dimensions.get("window");

// import SelectDropdown from "react-native-select-dropdown";

// const Demo1 = () => {
//   const countries = [
//     "Egypt",
//     "Canada",
//     "Australia",
//     "Ireland",
//     "Brazil",
//     "England",
//     "Dubai",
//     "France",
//     "Germany",
//     "Saudi Arabia",
//     "Argentina",
//     "India",
//   ];
//   const countriesWithFlags = [
//     { title: "Egypt", image: require("../assets/images/Egypt.png") },
//     { title: "Canada", image: require("../assets/images/Canada.png") },
//     { title: "Australia", image: require("../assets/images/Australia.png") },
//     { title: "Ireland", image: require("../assets/images/Ireland.png") },
//     { title: "Brazil", image: require("../assets/images/Brazil.jpg") },
//     { title: "England", image: require("../assets/images/England.png") },
//     { title: "Dubai", image: require("../assets/images/Dubai.png") },
//   ];

//   const renderHeader = () => {
//     return (
//       <View style={[styles.header, styles.shadow]}>
//         <Text style={styles.headerTitle}>{"Demo 1"}</Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.saveAreaViewContainer}>
//       <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
//       <View style={styles.viewContainer}>
//         {renderHeader()}
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           alwaysBounceVertical={false}
//           contentContainerStyle={styles.scrollViewContainer}
//         >
//           <SelectDropdown
//             data={countries}
//             // defaultValueByIndex={1} // use default value by index or default value
//             // defaultValue={'Canada'} // use default value by index or default value
//             onSelect={(selectedItem, index) => {
//               console.log(selectedItem, index);
//             }}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}
//           />

//           <SelectDropdown
//             data={countries}
//             // defaultValueByIndex={1}
//             // defaultValue={'Egypt'}
//             onSelect={(selectedItem, index) => {
//               console.log(selectedItem, index);
//             }}
//             defaultButtonText={"Select country"}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}
//             buttonStyle={styles.dropdown1BtnStyle}
//             buttonTextStyle={styles.dropdown1BtnTxtStyle}
//             renderDropdownIcon={(isOpened) => {
//               return (
//                 <FontAwesome
//                   name={isOpened ? "chevron-up" : "chevron-down"}
//                   color={"#444"}
//                   size={18}
//                 />
//               );
//             }}
//             dropdownIconPosition={"right"}
//             dropdownStyle={styles.dropdown1DropdownStyle}
//             rowStyle={styles.dropdown1RowStyle}
//             rowTextStyle={styles.dropdown1RowTxtStyle}
//           />

//           <SelectDropdown
//             data={countries}
//             // defaultValueByIndex={1}
//             // defaultValue={'England'}
//             onSelect={(selectedItem, index) => {
//               console.log(selectedItem, index);
//             }}
//             defaultButtonText={"Select country"}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}
//             buttonStyle={styles.dropdown2BtnStyle}
//             buttonTextStyle={styles.dropdown2BtnTxtStyle}
//             renderDropdownIcon={(isOpened) => {
//               return (
//                 <FontAwesome
//                   name={isOpened ? "chevron-up" : "chevron-down"}
//                   color={"#FFF"}
//                   size={18}
//                 />
//               );
//             }}
//             dropdownIconPosition={"right"}
//             dropdownStyle={styles.dropdown2DropdownStyle}
//             rowStyle={styles.dropdown2RowStyle}
//             rowTextStyle={styles.dropdown2RowTxtStyle}
//           />

//           <SelectDropdown
//             data={countriesWithFlags}
//             // defaultValueByIndex={1}
//             // defaultValue={{
//             //   title: 'England',
//             //   image: require('./Images/England.jpg'),
//             // }}
//             onSelect={(selectedItem, index) => {
//               console.log(selectedItem, index);
//             }}
//             buttonStyle={styles.dropdown3BtnStyle}
//             renderCustomizedButtonChild={(selectedItem, index) => {
//               return (
//                 <View style={styles.dropdown3BtnChildStyle}>
//                   {selectedItem ? (
//                     <Image
//                       source={selectedItem.image}
//                       style={styles.dropdown3BtnImage}
//                     />
//                   ) : (
//                     <Ionicons name="md-earth-sharp" color={"#444"} size={32} />
//                   )}
//                   <Text style={styles.dropdown3BtnTxt}>
//                     {selectedItem ? selectedItem.title : "Select country"}
//                   </Text>
//                   <FontAwesome name="chevron-down" color={"#444"} size={18} />
//                 </View>
//               );
//             }}
//             dropdownStyle={styles.dropdown3DropdownStyle}
//             rowStyle={styles.dropdown3RowStyle}
//             renderCustomizedRowChild={(item, index) => {
//               return (
//                 <View style={styles.dropdown3RowChildStyle}>
//                   <Image source={item.image} style={styles.dropdownRowImage} />
//                   <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
//                 </View>
//               );
//             }}
//           />

//           <SelectDropdown
//             data={countriesWithFlags}
//             // defaultValueByIndex={1}
//             // defaultValue={'India'}
//             onSelect={(selectedItem, index) => {
//               console.log(selectedItem, index);
//             }}
//             defaultButtonText={"Select country"}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem.title;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item.title;
//             }}
//             buttonStyle={styles.dropdown4BtnStyle}
//             buttonTextStyle={styles.dropdown4BtnTxtStyle}
//             renderDropdownIcon={(isOpened) => {
//               return (
//                 <FontAwesome
//                   name={isOpened ? "chevron-up" : "chevron-down"}
//                   color={"#444"}
//                   size={18}
//                 />
//               );
//             }}
//             dropdownIconPosition={"left"}
//             dropdownStyle={styles.dropdown4DropdownStyle}
//             rowStyle={styles.dropdown4RowStyle}
//             rowTextStyle={styles.dropdown4RowTxtStyle}
//           />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };
// export default Demo1;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   header: {
//     flexDirection: "row",
//     width,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F6F6F6",
//   },
//   headerTitle: { color: "#000", fontWeight: "bold", fontSize: 16 },
//   saveAreaViewContainer: { flex: 1, backgroundColor: "#FFF" },
//   viewContainer: { flex: 1, width, backgroundColor: "#FFF" },
//   scrollViewContainer: {
//     flexGrow: 1,
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: "10%",
//     paddingBottom: "20%",
//   },

//   dropdown1BtnStyle: {
//     width: "80%",
//     height: 50,
//     backgroundColor: "#FFF",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#444",
//   },
//   dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
//   dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
//   dropdown1RowStyle: {
//     backgroundColor: "#EFEFEF",
//     borderBottomColor: "#C5C5C5",
//   },
//   dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

//   dropdown2BtnStyle: {
//     width: "80%",
//     height: 50,
//     backgroundColor: "#444",
//     borderRadius: 8,
//   },
//   dropdown2BtnTxtStyle: {
//     color: "#FFF",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   dropdown2DropdownStyle: {
//     backgroundColor: "#444",
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
//   dropdown2RowTxtStyle: {
//     color: "#FFF",
//     textAlign: "center",
//     fontWeight: "bold",
//   },

//   dropdown3BtnStyle: {
//     width: "80%",
//     height: 50,
//     backgroundColor: "#FFF",
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#444",
//   },
//   dropdown3BtnChildStyle: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 18,
//   },
//   dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
//   dropdown3BtnTxt: {
//     color: "#444",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 24,
//     marginHorizontal: 12,
//   },
//   dropdown3DropdownStyle: { backgroundColor: "slategray" },
//   dropdown3RowStyle: {
//     backgroundColor: "slategray",
//     borderBottomColor: "#444",
//     height: 50,
//   },
//   dropdown3RowChildStyle: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingHorizontal: 18,
//   },
//   dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
//   dropdown3RowTxt: {
//     color: "#F1F1F1",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 24,
//     marginHorizontal: 12,
//   },

//   dropdown4BtnStyle: {
//     width: "50%",
//     height: 50,
//     backgroundColor: "#FFF",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#444",
//   },
//   dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
//   dropdown4DropdownStyle: { backgroundColor: "#EFEFEF" },
//   dropdown4RowStyle: {
//     backgroundColor: "#EFEFEF",
//     borderBottomColor: "#C5C5C5",
//   },
//   dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
// });
