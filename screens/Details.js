import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Card, Heading, Body } from "../components";

export default function Details({ route }) {
  const { book } = route.params || {};

  if (!book) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Body>No hay detalles para este libro.</Body>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Card style={{ overflow: "hidden" }}>
        {book.image ? (
          <Image
            source={{ uri: book.image }}
            style={{ width: "100%", height: 380 }}
            resizeMode="cover"
          />
        ) : null}
        <View style={{ padding: 12 }}>
          <Heading>{book.title}</Heading>
          <Body style={{ marginTop: 8 }}>{book.author}</Body>
          <Body style={{ marginTop: 12 }}>{book.description}</Body>
        </View>
      </Card>
    </ScrollView>
  );
}
