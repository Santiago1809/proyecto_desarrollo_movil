import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { auth } from "./firebase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.info("Usuario registrado:", userCredential.user);
      })
      .catch((error) => console.log("Error:", error.message));
  };
  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Contraseña:</Text>
      <TextInput
        secureTextEntry
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          marginBottom: 10,
        }}
      />
      <Button title="Registrarse" onPress={handleSignUp} />
    </View>
  );
}
