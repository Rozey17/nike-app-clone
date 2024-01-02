import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  StatusBar,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { View } from "../components/Themed";
import { NativeBaseProvider } from "native-base";
import CartIcon from "../components/CartIcon";
import { useApollo } from "../lib/graphql.server";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

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
  const client = new ApolloClient({
    uri: "https://5spod2i4.api.sanity.io/v1/graphql/production/default",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <StatusBar barStyle={"dark-content"} />
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
              headerShown: false,

              headerRight: () => {
                return (
                  <View className="flex-row items-center">
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
            name="menClothes"
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
            name="menShoes"
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
            name="menShoesList"
            options={{
              title: "Toutes les chaussures",
              headerRight: () => {
                return (
                  <View className="flex-row items-center">
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
            name="menAccessories"
            options={{
              title: "Accessoires",
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
            name="menAccessoriesList"
            options={{
              title: "Tous les accessoires",
              headerRight: () => {
                return (
                  <View className="flex-row items-center">
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
            name="menClothesList"
            options={{
              title: "Tous les vêtements",
              headerRight: () => {
                return (
                  <View className="flex-row items-center ">
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
            name="womenClothes"
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
            name="womenShoes"
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
            name="womenShoesList"
            options={{
              title: "Toutes les chaussures",
              headerRight: () => {
                return (
                  <View className="flex-row items-center">
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
            name="womenClothesList"
            options={{
              title: "Tous les vêtements",
              headerRight: () => {
                return (
                  <View className="flex-row items-center ">
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
                  <View className="flex-row items-center ">
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
    </ApolloProvider>

    // <Drawer detachInactiveScreens={false} screenOptions={
    //   {}
    // }>
    //   <Drawer.Screen
    //     name="index" // This is the name of the page and must match the url from root
    //     options={{
    //       drawerLabel: "Home",
    //       title: "overview",

    //     }}
    //   />
    // </Drawer>
  );
}
