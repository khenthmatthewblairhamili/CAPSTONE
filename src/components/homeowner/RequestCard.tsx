import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { borderRadius, colors, shadows, spacing } from "../../config/theme";
import { MaintenanceRequest } from "../../types";

interface RequestCardProps {
  request: MaintenanceRequest;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
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

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.id}>{request.id}</Text>
          <Text style={styles.title}>{request.title}</Text>
          <Text style={styles.description}>{request.description}</Text>
        </View>
        <View style={[styles.statusBadge, getStatusStyle()]}>
          <Text style={[styles.statusText, getStatusTextStyle()]}>
            {formatStatus(request.status)}
          </Text>
        </View>
      </View>
    </View>
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
    color: colors.text.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 18,
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
});
