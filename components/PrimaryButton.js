import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./colors";

export function PrimaryButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "700",
    fontFamily: "Poppins_600SemiBold",
  },
});

export default PrimaryButton;
