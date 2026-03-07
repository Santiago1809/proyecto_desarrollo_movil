import React from "react";
import { Button, View, Text } from "react-native";

export default function Home({navigation}) {
 
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pantalla de inicio</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  )
}