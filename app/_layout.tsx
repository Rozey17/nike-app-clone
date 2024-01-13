import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/lib/graphql";
import CartIcon from "../src/components/CartIcon";

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
    HelveticaRegular: require("../assets/fonts/HelveticaNowDisplay-Regular.ttf"),
    HelveticaMedium: require("../assets/fonts/HelveticaNowDisplay-Medium.ttf"),
    HelveticaBold: require("../assets/fonts/HelveticaNowDisplay-Bold.ttf"),
    HelveticaHairline: require("../assets/fonts/HelveticaNowDisplay-Hairline.ttf"),
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
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <StatusBar backgroundColor="#020617" barStyle="light-content" />
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            animation: "slide_from_right",
            headerTitleStyle: { fontSize: 16, fontFamily: "HelveticaBold" },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
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
            name="men/menClothes"
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
            name="men/menShoes"
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
            name="men/menShoesList"
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
            name="men/menAccessories"
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
            name="men/menAccessoriesList"
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
            name="men/menClothesList"
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
            name="women/womenClothes"
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
            name="women/womenShoes"
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
            name="women/womenShoesList"
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
            name="women/womenClothesList"
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
            name="women/womenAccessories"
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
            name="women/womenAccessoriesList"
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
          <Stack.Screen name="favorites" options={{ title: "Favoris" }} />
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
              headerShown: false,
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
