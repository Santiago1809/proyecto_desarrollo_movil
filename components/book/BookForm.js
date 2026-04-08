import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { colors } from "../colors";

export default function BookForm({ onAdd }) {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const maxDescriptionLength = 200;

  async function pickImage() {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
      if (res.canceled || !res.assets || res.assets.length === 0) return;
      const uri = res.assets[0].uri;
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });
      setImage({ uri, base64 });
    } catch (err) {
      console.error("pickImage", err);
    }
  }

  async function handleSubmit() {
    if (!title.trim() || !author.trim()) {
      Alert.alert("Faltan campos", "Completa el título y el autor.");
      return;
    }
    setSubmitting(true);
    try {
      await onAdd(
        { title, author, description, category, available },
        image ? image.base64 : null,
      );
      setTitle("");
      setAuthor("");
      setDescription("");
      setCategory("");
      setAvailable(true);
      setImage(null);
      Alert.alert("Éxito", "Libro agregado correctamente.");
    } catch (err) {
      Alert.alert("Error", "No se pudo agregar el libro.");
    } finally {
      setSubmitting(false);
    }
  }

  const remainingChars = maxDescriptionLength - description.length;

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: 24 + insets.bottom + 8 },
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.headerIcon}>
          <Ionicons name="book-add" size={24} color={colors.primary} />
        </View>
        <Text style={styles.headerTitle}>Agregar libro</Text>
        <Text style={styles.headerSubtitle}>
          Completa los datos del libro para añadirlo a la biblioteca
        </Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        {/* Title */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Ionicons name="text" size={16} color={colors.primary} />
            <Text style={styles.label}>Título *</Text>
          </View>
          <TextInput
            placeholder="Título del libro"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Author */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Ionicons name="person" size={16} color={colors.primary} />
            <Text style={styles.label}>Autor *</Text>
          </View>
          <TextInput
            placeholder="Autor del libro"
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Ionicons name="pricetag" size={16} color={colors.primary} />
            <Text style={styles.label}>Categoría</Text>
          </View>
          <TextInput
            placeholder="Ej: Ficción, Ciencia, Novela"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Ionicons name="document-text" size={16} color={colors.primary} />
            <Text style={styles.label}>Descripción</Text>
          </View>
          <TextInput
            placeholder="Describe el libro..."
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
            maxLength={maxDescriptionLength}
            placeholderTextColor={colors.textMuted}
          />
          <Text
            style={[
              styles.charCount,
              { color: remainingChars < 20 ? colors.warning : colors.textMuted },
            ]}
          >
            {remainingChars} caracteres restantes
          </Text>
        </View>

        {/* Availability Toggle */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleInfo}>
            <View style={styles.toggleIcon}>
              <Ionicons 
                name={available ? "checkmark-circle" : "close-circle"} 
                size={20} 
                color={available ? colors.success : colors.error} 
              />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Disponible</Text>
              <Text style={styles.toggleSubtitle}>
                {available ? "Los usuarios pueden solicitar este libro" : "El libro no está disponible actualmente"}
              </Text>
            </View>
          </View>
          <Switch
            value={available}
            onValueChange={setAvailable}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>

      {/* Image Section */}
      <View style={styles.imageCard}>
        <View style={styles.labelRow}>
          <Ionicons name="image" size={16} color={colors.primary} />
          <Text style={styles.label}>Imagen de portada</Text>
        </View>
        <View style={styles.imageContainer}>
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image.uri }} style={styles.imagePreview} />
              <TouchableOpacity
                onPress={() => setImage(null)}
                style={styles.removeImageBtn}
              >
                <Ionicons name="close" size={16} color={colors.surface} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              onPress={pickImage} 
              style={styles.imagePlaceholder}
            >
              <Ionicons name="camera-outline" size={40} color={colors.textMuted} />
              <Text style={styles.imagePlaceholderText}>Toca para agregar imagen</Text>
            </TouchableOpacity>
          )}
          {image && (
            <TouchableOpacity onPress={pickImage} style={styles.changeImageBtn}>
              <Ionicons name="refresh" size={16} color={colors.primary} />
              <Text style={styles.changeImageText}>Cambiar imagen</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
        activeOpacity={0.8}
      >
        {submitting ? (
          <ActivityIndicator color={colors.surface} size="small" />
        ) : (
          <>
            <Ionicons name="checkmark-circle" size={20} color={colors.surface} />
            <Text style={styles.submitButtonText}>Guardar libro</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 16,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textLight,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    textAlign: "right",
    marginTop: 4,
  },
  toggleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  toggleInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  toggleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  toggleSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  imageCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    marginTop: 4,
  },
  imagePreviewContainer: {
    position: "relative",
    marginBottom: 12,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  removeImageBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.border,
  },
  imagePlaceholderText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
  },
  changeImageBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    backgroundColor: colors.primary + "10",
    borderRadius: 10,
  },
  changeImageText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: 16,
  },
});
