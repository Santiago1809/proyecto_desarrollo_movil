import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password) return Alert.alert("Error", "Completa los campos");
    console.log({email, password})
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario registrado:", userCredential.user);
        navigation.replace("Home");
      })
      .catch((error) => Alert.alert("Error", error.message));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 6 }}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text style={{ marginBottom: 6 }}>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Button title="Registrarse" onPress={handleSignUp} />

      <View style={{ marginTop: 12 }}>
        <Button
          title="¿Ya tienes cuenta? Iniciar sesión"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
