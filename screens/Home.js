import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { Card, Heading, Body, PrimaryButton, colors } from "../components/UI";
import useBooks from "../hooks/useBooks";

export default function Home({ navigation }) {
  const { books, loading, refresh } = useBooks();
  const { width } = useWindowDimensions();
  const { user, signOut } = useAuth();
  const email = user ? user.email : null;
  const insets = useSafeAreaInsets();

  const handleSignOut = () => signOut();

  const numColumns = 2;
  const itemSize = Math.floor((width - 32 - (numColumns - 1) * 12) / numColumns);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ width: itemSize, marginBottom: 12 }} onPress={() => navigation.navigate("Details", { book: item })}>
      <Card style={{ overflow: "hidden" }}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={{ width: itemSize, height: itemSize * 1.4 }} resizeMode="cover" />
        ) : (
          <View style={{ width: itemSize, height: itemSize * 1.4, alignItems: "center", justifyContent: "center" }}>
            <Text>Sin imagen</Text>
          </View>
        )}
        <View style={{ padding: 8 }}>
          <Heading style={{ fontSize: 14, color: colors.text }} numberOfLines={2}>{item.title}</Heading>
          <Body style={{ marginTop: 6 }}>{item.author}</Body>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 16 + insets.top, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: "#ffffff" }}>
      <Body style={{ marginBottom: 12, color: colors.muted }}>{email ? `Hola, ${email.split("@")[0]}` : ""}</Body>

      <FlatList
        data={books}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 24 + insets.bottom + 8 }}
        ListEmptyComponent={!loading ? <Text>No hay libros disponibles.</Text> : null}
      />

      <View style={{ height: 12 }} />
      <PrimaryButton title="Cerrar sesión" onPress={handleSignOut} style={{ marginBottom: insets.bottom }} />
    </View>
  );
}
