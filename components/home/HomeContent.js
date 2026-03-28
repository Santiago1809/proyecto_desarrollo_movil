import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { Body, EmptyState } from "../index";
import BookItem from "../book/BookItem";
import BookSkeleton from "../book/BookSkeleton";
import { colors } from "../colors";
import useBooks from "../../hooks/useBooks";

export default function HomeContent({ navigation }) {
  const { books, loading, refresh } = useBooks();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const itemSize = Math.floor(
    (width - 32 - (numColumns - 1) * 12) / numColumns,
  );
  const columnWrapper =
    numColumns > 1 ? { justifyContent: "space-between" } : undefined;

  const renderBookItem = useCallback(
    ({ item }) => (
      <BookItem item={item} itemSize={itemSize} navigation={navigation} />
    ),
    [itemSize, navigation],
  );

  const renderSkeleton = useCallback(
    () => <BookSkeleton size={itemSize} />,
    [itemSize],
  );

  const renderFooter = useCallback(() => {
    if (loading && books.length > 0) return renderSkeleton();
    return <View style={{ height: 16 }} />;
  }, [loading, books, renderSkeleton]);

  const renderEmptyState = useCallback(() => {
    if (loading === true) return null;
    return (
      <EmptyState
        title="No hay libros"
        description="Agrega tu primer libro para comenzar tu biblioteca digital"
        action={
          <Text style={styles.emptySubtitle}>
            Comienza llenando el formulario arriba
          </Text>
        }
      />
    );
  }, [loading]);

  if (loading && books.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Body style={{ marginTop: 16, color: colors.textMuted }}>
          Cargando biblioteca...
        </Body>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={books}
        contentContainerStyle={{
          paddingBottom: 24 + insets.bottom,
          paddingTop: 8,
        }}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapper}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />

      {!loading && user?.role === "admin" && (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddBook")}
          style={[styles.fab, { bottom: 28 + insets.bottom }]}
          activeOpacity={0.85}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingBottom: 100,
  },
  emptySubtitle: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: {
    color: colors.surface,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "700",
  },
};
