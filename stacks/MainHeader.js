import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from "react-native";
import { colors } from "../components/colors";
import { useAuth } from "../contexts/AuthContext";
import MenuModal from "../components/MenuModal";

export default function MainHeader({ navigation, route, options }) {
  const { user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const getTitle = () => {
    return options?.title || route?.name || "";
  };

  return (
    <>
      <View style={styles.header}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{getTitle()}</Text>

        {user && (
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}
      </View>

      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: colors.text,
  },
});
