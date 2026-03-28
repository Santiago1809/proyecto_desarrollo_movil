import React from "react";
import { SafeAreaView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import BookForm from "../components/book/book-form";
import useBooks from "../hooks/useBooks";

export default function AddBook({ navigation }) {
  const { addBook } = useBooks();

  const handleAdd = async (data, imageBase64) => {
    await addBook(data, imageBase64);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar title="Agregar libro" />
      <BookForm onAdd={handleAdd} />
    </SafeAreaView>
  );
}
