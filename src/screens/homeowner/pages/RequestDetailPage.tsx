import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import styles from "./requestDetailStyles";

interface RequestDetailPageProps {
  request: any | null;
  onBack: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToChat: () => void;
}

export const RequestDetailPage: React.FC<RequestDetailPageProps> = ({
  request,
  onBack,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onNavigateToChat,
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#fbbf24", color: "#92400e" };
      case "in-progress":
        return { backgroundColor: "#93c5fd", color: "#1e3a8a" };
      case "completed":
        return { backgroundColor: "#86efac", color: "#14532d" };
      default:
        return { backgroundColor: "#d1d5db", color: "#374151" };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  if (!request) {
    return (
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>No Request Selected</Text>
      </View>
    );
  }
  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Request Detail</Text>
      </View>

      {/* Request Detail Card */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.detailContainer}>
          <View style={styles.detailCard}>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>
                {request.type || "Maintenance"}
              </Text>
              <Text style={styles.detailSubtext}>Request Submitted</Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Request ID</Text>
              <Text style={styles.detailValue}>{request.id || "N/A"}</Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Unit Number</Text>
              <Text style={styles.detailValue}>
                {request.unit || "Not specified"}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Description</Text>
              <Text style={styles.detailValue}>
                {request.description || "No description provided"}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Status</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: getStatusStyle(request.status)
                        .backgroundColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusStyle(request.status).color },
                  ]}
                >
                  {getStatusText(request.status)}
                </Text>
              </View>
            </View>

            {request.assigned_technician && (
              <>
                <View style={styles.detailDivider} />
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Assigned Technician</Text>
                  <Text style={styles.detailValue}>
                    {request.assigned_technician}
                  </Text>
                </View>
              </>
            )}

            {request.priority && (
              <>
                <View style={styles.detailDivider} />
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Priority</Text>
                  <Text style={styles.detailValue}>{request.priority}</Text>
                </View>
              </>
            )}

            <Button
              title="Chat"
              onPress={onNavigateToChat}
              variant="accent"
              style={styles.chatButton}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onBack();
          if (tab === "request-detail") onNavigateToSubmitRequest();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </>
  );
};
