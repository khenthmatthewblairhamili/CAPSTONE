import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, shadows, spacing } from "../../config/theme";

interface AdminRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  homeowner: string;
  priority: string;
  date: string;
}

interface AdminRequestCardProps {
  request: AdminRequest;
  onPress?: () => void;
}

export const AdminRequestCard: React.FC<AdminRequestCardProps> = ({
  request,
  onPress,
}) => {
  const getStatusStyle = () => {
    switch (request.status) {
      case "ongoing":
        return styles.statusOngoing;
      case "in-progress":
        return styles.statusInProgress;
      case "completed":
        return styles.statusCompleted;
      default:
        return styles.statusPending;
    }
  };

  const getStatusTextStyle = () => {
    switch (request.status) {
      case "ongoing":
        return styles.statusOngoingText;
      case "in-progress":
        return styles.statusInProgressText;
      case "completed":
        return styles.statusCompletedText;
      default:
        return styles.statusPendingText;
    }
  };

  const getPriorityStyle = () => {
    switch (request.priority) {
      case "high":
        return styles.priorityHigh;
      case "medium":
        return styles.priorityMedium;
      default:
        return styles.priorityLow;
    }
  };

  const getPriorityTextStyle = () => {
    switch (request.priority) {
      case "high":
        return styles.priorityHighText;
      case "medium":
        return styles.priorityMediumText;
      default:
        return styles.priorityLowText;
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.id}>{request.id}</Text>
          <Text style={styles.title}>{request.title}</Text>
          <Text style={styles.description}>{request.description}</Text>
          <Text style={styles.homeowner}>👤 {request.homeowner}</Text>
          <Text style={styles.date}>📅 {request.date}</Text>
        </View>
        <View style={styles.badges}>
          <View style={[styles.statusBadge, getStatusStyle()]}>
            <Text style={[styles.statusText, getStatusTextStyle()]}>
              {formatStatus(request.status)}
            </Text>
          </View>
          <View style={[styles.priorityBadge, getPriorityStyle()]}>
            <Text style={[styles.priorityText, getPriorityTextStyle()]}>
              {request.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  info: {
    flex: 1,
    marginRight: spacing.sm,
  },
  id: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  homeowner: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  badges: {
    gap: spacing.xs,
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  priorityBadge: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  statusOngoing: {
    backgroundColor: colors.status.ongoing.bg,
  },
  statusOngoingText: {
    color: colors.status.ongoing.text,
  },
  statusInProgress: {
    backgroundColor: colors.status.inProgress.bg,
  },
  statusInProgressText: {
    color: colors.status.inProgress.text,
  },
  statusCompleted: {
    backgroundColor: colors.status.completed.bg,
  },
  statusCompletedText: {
    color: colors.status.completed.text,
  },
  statusPending: {
    backgroundColor: colors.status.pending.bg,
  },
  statusPendingText: {
    color: colors.status.pending.text,
  },
  priorityHigh: {
    backgroundColor: "#fee2e2",
  },
  priorityHighText: {
    color: "#991b1b",
  },
  priorityMedium: {
    backgroundColor: "#fef3c7",
  },
  priorityMediumText: {
    color: "#92400e",
  },
  priorityLow: {
    backgroundColor: "#dbeafe",
  },
  priorityLowText: {
    color: "#1e40af",
  },
});
