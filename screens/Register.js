import React from "react";
import RegisterForm from "../components/RegisterForm";

export default function Register({ navigation }) {
  return (
    <RegisterForm
      onSuccess={() => navigation.goBack()}
      onSwitchToLogin={() => navigation.navigate("Login")}
    />
  );
}
