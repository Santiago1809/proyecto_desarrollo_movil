import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import MainHeader from "./MainHeader";

const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => null, // Sin header en auth
      }}
    >
      <AuthStack.Screen name="Login" component={require("../screens/Login").default} />
      <AuthStack.Screen name="Register" component={require("../screens/Register").default} />
    </AuthStack.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        header: (props) => <MainHeader {...props} />,
      }}
    >
      <MainStack.Screen
        name="Home"
        component={require("../screens/Home").default}
        options={{ title: "Biblioteca" }}
      />
      <MainStack.Screen
        name="AddBook"
        component={require("../screens/AddBook").default}
        options={{ title: "Agregar libro" }}
      />
      <MainStack.Screen
        name="Details"
        component={require("../screens/Details").default}
        options={({ route }) => ({ title: route.params?.book?.title ?? "Detalles" })}
      />
      {/* Pantallas adicionales se agregarán aquí */}
    </MainStack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <MainStackNavigator /> : <AuthStackNavigator />;
}
