import React from "react";
import { Button, View, Text, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home({ navigation }) {
  const email = auth.currentUser ? auth.currentUser.email : null;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((err) => Alert.alert("Error", err.message));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        {email ? `Bienvenido, ${email}` : "Pantalla de inicio"}
      </Text>
      <Button title="Detalles" onPress={() => navigation.navigate("Details")} />
      <View style={{ height: 12 }} />
      <Button title="Cerrar sesión" onPress={handleSignOut} />
    </View>
  );
}
