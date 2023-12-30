import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";

export default function DrawerComponent() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <View className="flex-1 h-full"></View>;
      }}
    >
      <TouchableOpacity onPress={() => setOpen((prevOpen) => !prevOpen)}>
        <Ionicons name="menu-sharp" size={24} color="black" />
      </TouchableOpacity>
    </Drawer>
  );
}
