import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { View } from "../components/Themed";
import { NativeBaseProvider, Box } from "native-base";
import useCartStore from "../store/cartStore";
import CartIcon from "../components/CartIcon";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { addProduct, removeProduct, products, items } = useCartStore();

  return (
    <NativeBaseProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          animation: "slide_from_right",
          headerTitleStyle: { fontSize: 16 },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Boutique",

            headerRight: () => {
              return (
                <View className="flex-row items-center gap-x-4">
                  <TouchableOpacity onPress={() => router.push("/search")}>
                    <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => router.push("/cart")}>
                    <SimpleLineIcons name="bag" size={24} color="black" />
                  </TouchableOpacity> */}
                  <CartIcon />
                </View>
              );
            },
          }}
        />
        <Stack.Screen name="news" options={{}} />
        <Stack.Screen
          name="clothes"
          options={{
            title: "Vêtements",
            headerRight: () => {
              return (
                <View className="">
                  <TouchableOpacity onPress={() => router.push("/search")}>
                    <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="shoes"
          options={{
            title: "Chaussures",
            headerRight: () => {
              return (
                <View className="">
                  <TouchableOpacity onPress={() => router.push("/search")}>
                    <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="shoesList"
          options={{
            title: "Toutes les chaussures",
            headerRight: () => {
              return (
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity onPress={() => router.push("/search")}>
                    <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                  <CartIcon />
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="clothesList"
          options={{
            title: "Tous les vêtements",
            headerRight: () => {
              return (
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity onPress={() => router.push("/search")}>
                    <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                  <CartIcon />
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="product"
          options={{
            headerRight: () => {
              return (
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity onPress={() => router.push("/search")}>
                    <AntDesign name="search1" size={24} color="black" />
                  </TouchableOpacity>
                  <CartIcon />
                </View>
              );
            },
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="addedToCartModal"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: "",

            headerRight: () => {
              return (
                <TextInput
                  className="w-[85%] border-0 text-[16px]"
                  placeholder="Rechercher un produit"
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Panier",
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
