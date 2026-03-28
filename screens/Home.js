import React from "react";
import { SafeAreaView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import HomeContent from "../components/home/HomeContent";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar title="Biblioteca" />
      <HomeContent navigation={navigation} />
    </SafeAreaView>
  );
}
