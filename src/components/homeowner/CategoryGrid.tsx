import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, spacing } from "../../config/theme";
import { RequestCategory } from "../../types";
import { CATEGORIES } from "../../utils/constants";

interface CategoryGridProps {
  onCategoryPress?: (category: RequestCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategoryPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Category</Text>
      <View style={styles.grid}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => onCategoryPress?.(category.type)}
          >
            <Text style={styles.icon}>{category.icon}</Text>
            <Text style={styles.text}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  card: {
    width: "48%",
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  icon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
    textAlign: "center",
  },
});
