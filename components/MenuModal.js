import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "./colors";
import { useAuth } from "../contexts/AuthContext";

export default function MenuModal({ visible, onClose }) {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  const handleNavigate = (route) => {
    navigation.navigate(route);
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: colors.surface,
                padding: 16,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: colors.text,
                  marginBottom: 6,
                }}
              >
                Cuenta
              </Text>
              <Text style={{ color: colors.textMuted, marginBottom: 12 }}>
                {user?.email}
              </Text>

              {user?.role === "admin" && (
                <>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: colors.textMuted,
                      marginTop: 8,
                      marginBottom: 8,
                    }}
                  >
                    Administración
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleNavigate("AdminBooks")}
                    style={{ paddingVertical: 12 }}
                  >
                    <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 15 }}>
                      Gestión de Libros
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNavigate("AdminLoans")}
                    style={{ paddingVertical: 12 }}
                  >
                    <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 15 }}>
                      Gestión de Préstamos
                    </Text>
                  </TouchableOpacity>
                  <View style={{ height: 8 }} />
                </>
              )}

              <TouchableOpacity
                onPress={() => {
                  signOut();
                  onClose && onClose();
                }}
                style={{ paddingVertical: 12 }}
              >
                <Text
                  style={{
                    color: colors.error,
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  Cerrar sesión
                </Text>
              </TouchableOpacity>

              <View style={{ height: 8 }} />

              <TouchableOpacity
                onPress={onClose}
                style={{ paddingVertical: 12 }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
