import React from "react";
import { SafeAreaView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import BookDetails from "../components/book/BookDetails";

export default function Details({ route }) {
  const { book } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar title={book.title} />
      <BookDetails book={book} />
    </SafeAreaView>
  );
}
