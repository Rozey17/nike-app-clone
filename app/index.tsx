import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import CartIcon from "../components/CartIcon";
import { Drawer } from "react-native-drawer-layout";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const FirstRoute = () => (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <View className="p-5 py-8 space-y-5">
        <Text className="text-xl">Indispensable, meilleures ventes...</Text>
        <View className="flex-row items-center space-x-1">
          <TouchableOpacity
            onPress={() => router.push("/news")}
            className="space-y-3"
          >
            <Image
              source={{
                uri: "https://static.nike.com/a/images/w_300,c_limit/2e20a745-d9be-4d82-8cad-0c55d115fbb3/que-la-saison-des-cadeaux-commence-nike-com.png",
              }}
              className="w-40 h-40 rounded-md"
            />
            <Text>Cartes cadeaux</Text>
          </TouchableOpacity>
          <View className="space-y-3">
            <Image
              source={{
                uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/18c38ffb-48ec-418a-8e19-cc5bcea9f1fe/chaussure-de-foot-montante-a-crampons-pour-terrain-sec-mercurial-superfly-9-elite-tjbNFg.png",
              }}
              className="w-40 h-40 rounded-md"
            />
            <Text>Chaussures de foot</Text>
          </View>
        </View>
      </View>
      <View className="space-y-1">
        <TouchableOpacity
          onPress={() => router.push("/menShoes")}
          className="flex-row items-center justify-between px-5 bg-blue-800 h-28"
        >
          <Text className="text-xl text-white">Chaussures</Text>
          <Image
            source={{
              uri: "https://pngimg.com/d/running_shoes_PNG5816.png",
            }}
            className="w-28 h-28"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/menClothes")}
          className="flex-row items-center justify-between px-5 bg-blue-800 h-28"
        >
          <Text className="text-xl text-white">Vêtements</Text>
          <Image
            source={{
              uri: "https://www.addictmiami.com/cdn/shop/products/CU4489-016_1_1200x1200.png?v=1627482486",
            }}
            className="w-28 h-28"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/menAccessories")}
          className="flex-row items-center justify-between px-5 bg-blue-800 h-28"
        >
          <Text className="text-xl text-white">Accessoires et équipement</Text>
          <Image
            source={{
              uri: "https://www.pngkey.com/png/full/316-3169157_nike-hat.png",
            }}
            className="object-contain w-32 h-20"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between px-5 bg-blue-800 h-28">
          <Text className="text-xl text-white">Offres et réductions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  const SecondRoute = () => (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <View className="p-5 py-8 space-y-5">
        <Text className="text-xl">Indispensable, meilleures ventes...</Text>
        <View className="flex-row items-center space-x-1">
          <View className="space-y-3">
            <Image
              source={{
                uri: "https://static.nike.com/a/images/w_300,c_limit/2e20a745-d9be-4d82-8cad-0c55d115fbb3/que-la-saison-des-cadeaux-commence-nike-com.png",
              }}
              className="w-40 h-40 rounded-md"
            />
            <Text>Cartes cadeaux</Text>
          </View>
          <View className="space-y-3">
            <Image
              source={{
                uri: "https://media.gqmagazine.fr/photos/64551119ce0c708b2278c458/4:3/w_5120,h_3840,c_limit/chris-henry-tV8yaU09t7w-unsplash.jpg",
              }}
              className="w-40 h-40 rounded-md"
            />
            <Text>Chaussures de foot</Text>
          </View>
        </View>
      </View>
      <View className="space-y-1">
        <TouchableOpacity
          onPress={() => router.push("/womenShoes")}
          className="flex-row items-center justify-between px-5 bg-pink-500 h-28"
        >
          <Text className="text-xl text-white">Chaussures</Text>
        </TouchableOpacity>
        <LinearGradient
          // Button Linear Gradient
          colors={["#4c669f", "#f472b6", "#192f6a"]}
        >
          <TouchableOpacity
            onPress={() => router.push("/womenClothes")}
            className="flex-row items-center justify-between px-5 h-28"
          >
            <Text className="text-xl text-white">Vêtements</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          onPress={() => router.push("/womenAccessories")}
          className="flex-row items-center justify-between px-5 bg-pink-500 h-28"
        >
          <Text className="text-xl text-white">Accessoires et équipement</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between px-5 bg-pink-500 h-28">
          <Text className="text-xl text-white">Offres et réductions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Homme" },
    { key: "second", title: "Femme" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={"black"}
      inactiveColor={"#6b7280"}
      indicatorStyle={{
        backgroundColor: "black",
        width: 97,
        borderBottomWidth: 3,
      }}
      style={{
        backgroundColor: "white",
        // marginLeft: 20,
        // shadowColor: "transparent",
      }}
      tabStyle={{ width: 97, paddingBottom: 15, paddingLeft: 20 }}
      labelStyle={{ textTransform: "capitalize", fontSize: 16 }}
      pressColor="white"
    />
  );

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      // hideStatusBarOnOpen={true}

      renderDrawerContent={() => {
        return (
          <SafeAreaView className="">
            <View className="px-6 py-10 space-y-4 border-b border-gray-200">
              <View className="w-16 h-16 bg-gray-200 rounded-full"></View>
              <Text className="font-medium">Username</Text>
            </View>
            <View className="px-6 py-4 space-y-4">
              <TouchableOpacity className="flex-row space-x-3">
                <MaterialCommunityIcons
                  name="shopping-search"
                  size={24}
                  color="black"
                />
                <Text className="text-[16px] font-medium">Boutique</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/favorites")}
                className="flex-row space-x-3"
              >
                <MaterialIcons
                  name="favorite-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-[16px] font-medium">Favoris</Text>
              </TouchableOpacity>
              <View className="flex-row gap-4"></View>
            </View>
          </SafeAreaView>
        );
      }}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between p-5">
          <View className="flex-row items-center space-x-5">
            <TouchableOpacity onPress={() => setOpen((prevOpen) => !prevOpen)}>
              <Ionicons name="menu-sharp" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-[16px] text-medium">Boutique</Text>
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.push("/search")}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
            <CartIcon />
          </View>
        </View>

        <TabView
          collapsable={false}
          swipeEnabled={false}
          style={{ backgroundColor: "white" }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          animationEnabled={false}
        />
      </SafeAreaView>
    </Drawer>
    // <TabView
    //   swipeEnabled={false}
    //   style={{ backgroundColor: "white" }}
    //   navigationState={{ index, routes }}
    //   renderScene={renderScene}
    //   renderTabBar={renderTabBar}
    //   onIndexChange={setIndex}
    //   initialLayout={{ width: layout.width }}
    // />
  );
}
