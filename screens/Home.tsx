import React from "react";
import { Button, View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// simple stack param list for navigation types
type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function Home({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pantalla de inicio</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
