import { useRouter } from "expo-router";
import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

export default function TabViewExample() {
  const router = useRouter();

  const FirstRoute = () => (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={5}
      alwaysBounceVertical={false}
    >
      <View className="px-5 py-8 space-y-5">
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
          onPress={() => router.push("/shoes")}
          className="flex-row items-center justify-between px-5 bg-blue-800 h-28"
        >
          <Text className="text-xl text-white">Chaussures</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/clothes")}
          className="flex-row items-center justify-between px-5 bg-blue-800 h-28"
        >
          <Text className="text-xl text-white">Vêtements</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between px-5 bg-blue-800 h-28">
          <Text className="text-xl text-white">Accessoires et équipement</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between px-5 bg-blue-800 h-28">
          <Text className="text-xl text-white">Offres et réductions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  const SecondRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "white", paddingLeft: 20 }}>
      <Text>Tab Two</Text>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "white", paddingLeft: 20 }}>
      <Text>Tab 3</Text>
    </ScrollView>
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Homme" },
    { key: "second", title: "Femme" },
    { key: "third", title: "Enfant" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={"black"}
      inactiveColor={"#6b7280"}
      indicatorStyle={{
        backgroundColor: "black",
        width: 90,
        borderBottomWidth: 3,
      }}
      style={{
        backgroundColor: "white",
        marginLeft: 20,
        shadowColor: "transparent",
      }}
      tabStyle={{ width: 90, paddingBottom: 15 }}
      labelStyle={{ textTransform: "capitalize", fontSize: 16 }}
      pressColor="white"
      // indicatorContainerStyle={{
      //   width: Dimensions.get("screen").width,
      // }}
      // contentContainerStyle={{
      //   justifyContent: "center",
      // }}
    />
  );

  return (
    <>
      <View className="p-5 bg-white">
        <Image
          source={{ uri: "https://stickair.com/20615-large_default/nike.jpg" }}
          className="w-10 h-10"
        />
      </View>

      <TabView
        style={{ backgroundColor: "white" }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}
