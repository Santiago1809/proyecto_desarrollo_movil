import React from "react";
import LoginForm from "../components/LoginForm";

export default function Login({ navigation }) {
  return (
    <LoginForm
      onSuccess={() => navigation.goBack()}
      onSwitchToRegister={() => navigation.navigate("Register")}
    />
  );
}
