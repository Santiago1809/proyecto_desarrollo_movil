import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) return Alert.alert("Error", "Completa los campos");
    console.log({email, password});
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario logueado:", userCredential.user);
        navigation.replace("Home");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        Alert.alert("Error", error.message)
      });
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

      <Button title="Iniciar sesión" onPress={handleSignIn} />

      <View style={{ marginTop: 12 }}>
        <Button
          title="¿No tienes cuenta? Registrarse"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}
