import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import useCartStore from "../src/store/cartStore";
import { ProductType } from "../src/store/interfaces";

export default function ModalScreen({
  id,
  name,
  price,
  description,
  gender,
  category,
  sub_category,
  image,
  size,
  quantity,
}: ProductType & { quantity: number }) {
  const router = useRouter();

  const { products, clearCart, addProduct, removeProduct } = useCartStore();
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() =>
            removeProduct({
              id,
              category,
              size,
              description,
              gender,
              image,
              name,
              price,
              sub_category,
            })
          }
          className="border border-gray-200 rounded-md"
        >
          <Text className="">-</Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity
          onPress={() =>
            addProduct({
              id,
              category,
              size,
              description,
              gender,
              image,
              name,
              price,
              sub_category,
            })
          }
          className="border border-gray-200 rounded-md"
        >
          <Text className="">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
