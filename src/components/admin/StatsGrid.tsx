import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { borderRadius, colors, spacing } from "../../config/theme";

interface StatsGridProps {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedRequests: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  totalRequests,
  pendingRequests,
  inProgressRequests,
  completedRequests,
}) => {
  const stats = [
    {
      id: 1,
      title: "Total Requests",
      value: totalRequests,
      icon: "📊",
      color: colors.category.plumbing,
    },
    {
      id: 2,
      title: "Pending",
      value: pendingRequests,
      icon: "⏳",
      color: colors.status.pending.bg,
    },
    {
      id: 3,
      title: "In Progress",
      value: inProgressRequests,
      icon: "🔧",
      color: colors.status.inProgress.bg,
    },
    {
      id: 4,
      title: "Completed",
      value: completedRequests,
      icon: "✅",
      color: colors.status.completed.bg,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <View
            key={stat.id}
            style={[styles.card, { backgroundColor: stat.color }]}
          >
            <Text style={styles.icon}>{stat.icon}</Text>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.title}>{stat.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
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
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  icon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
    textAlign: "center",
  },
});
