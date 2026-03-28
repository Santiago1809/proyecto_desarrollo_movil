import React, { useState } from "react";
import { ScrollView, View, TextInput, Alert } from "react-native";
import { Heading, Body, PrimaryButton } from ".";
import useAuthActions from "../hooks/useAuthActions";

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const { signUp } = useAuthActions();

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName || !birthDate) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return Alert.alert(
        "Error",
        "Nombre y apellido deben tener al menos 2 caracteres",
      );
    }

    // Validar fecha: debe ser YYYY-MM-DD y fecha razonable
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthDate)) {
      return Alert.alert(
        "Error",
        "Fecha de nacimiento debe tener formato YYYY-MM-DD",
      );
    }
    const date = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < date.getDate())
    ) {
      age--;
    }
    if (isNaN(date.getTime()) || age < 5 || age > 120) {
      return Alert.alert(
        "Error",
        "Fecha de nacimiento no válida o edad fuera de rango (5-120)",
      );
    }

    try {
      await signUp(email, password, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthDate,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      Alert.alert("Error", error.message || "Error al registrarse");
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#ffffff",
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Heading style={{ marginBottom: 6 }}>Correo electrónico</Heading>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderColor: "#dfeee0",
          borderRadius: 8,
        }}
      />

      <Heading style={{ marginBottom: 6 }}>Contraseña</Heading>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderColor: "#dfeee0",
          borderRadius: 8,
        }}
      />

      <Heading style={{ marginBottom: 6 }}>Nombre</Heading>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderColor: "#dfeee0",
          borderRadius: 8,
        }}
      />

      <Heading style={{ marginBottom: 6 }}>Apellido</Heading>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderColor: "#dfeee0",
          borderRadius: 8,
        }}
      />

      <Heading style={{ marginBottom: 6 }}>Fecha de nacimiento</Heading>
      <TextInput
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYY-MM-DD"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 18,
          borderColor: "#dfeee0",
          borderRadius: 8,
        }}
      />

      <PrimaryButton title="Registrarse" onPress={handleSignUp} />

      <View style={{ marginTop: 12 }}>
        <Body style={{ textAlign: "center" }} onPress={onSwitchToLogin}>
          ¿Ya tienes cuenta? Iniciar sesión
        </Body>
      </View>
    </ScrollView>
  );
}
