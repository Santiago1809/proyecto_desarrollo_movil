import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "./colors";

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 8,
    // subtle shadow
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
});

export default Card;
