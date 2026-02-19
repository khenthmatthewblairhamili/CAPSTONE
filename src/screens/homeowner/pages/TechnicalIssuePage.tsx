import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import styles from "./technicalIssueStyles";

interface TechnicalIssuePageProps {
  request: any | null;
  onBack: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
}

export const TechnicalIssuePage: React.FC<TechnicalIssuePageProps> = ({
  request,
  onBack,
  onNavigateToDashboard,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
}) => {
  const getStatusMessage = () => {
    if (!request) return "No request information available.";

    switch (request.status) {
      case "completed":
        return `The ${
          request.type?.toLowerCase() || "maintenance"
        } issue has been resolved.`;
      case "in-progress":
        return `Your ${
          request.type?.toLowerCase() || "maintenance"
        } request is currently being handled.`;
      case "pending":
        return `Your ${
          request.type?.toLowerCase() || "maintenance"
        } request has been received and is awaiting assignment.`;
      default:
        return "Request status update.";
    }
  };

  const getUpdateLabel = () => {
    if (!request) return "UPDATE";

    switch (request.status) {
      case "completed":
        return "COMPLETED";
      case "in-progress":
        return "IN PROGRESS";
      case "pending":
        return "PENDING";
      default:
        return "UPDATE";
    }
  };

  const getUpdateLabelStyle = () => {
    if (!request) return styles.updateLabel;

    switch (request.status) {
      case "completed":
        return [styles.updateLabel, { backgroundColor: "#86efac" }];
      case "in-progress":
        return [styles.updateLabel, { backgroundColor: "#93c5fd" }];
      case "pending":
        return [styles.updateLabel, { backgroundColor: "#fbbf24" }];
      default:
        return styles.updateLabel;
    }
  };
  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Technical Issue</Text>
      </View>

      {/* Update Card */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.technicalContainer}>
          <View style={styles.technicalCard}>
            <View style={getUpdateLabelStyle()}>
              <Text style={styles.updateLabelText}>{getUpdateLabel()}</Text>
            </View>
            <Text style={styles.updateText}>{getStatusMessage()}</Text>

            {request?.assigned_technician && (
              <View style={styles.technicianInfo}>
                <Image
                  source={{
                    uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.assigned_technician}`,
                  }}
                  style={styles.technicianAvatar}
                />
                <View style={styles.technicianDetails}>
                  <Text style={styles.technicianName}>
                    {request.assigned_technician}
                  </Text>
                  <Text style={styles.technicianDate}>
                    {request.updated_at
                      ? new Date(request.updated_at).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric" }
                        )
                      : "Recently"}
                  </Text>
                </View>
              </View>
            )}

            {request?.technician_notes && (
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>Technician Notes:</Text>
                <Text style={styles.notesText}>{request.technician_notes}</Text>
              </View>
            )}

            {request?.completion_notes && request.status === "completed" && (
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>Completion Notes:</Text>
                <Text style={styles.notesText}>{request.completion_notes}</Text>
              </View>
            )}

            <Button
              title="Done"
              onPress={onNavigateToDashboard}
              variant="accent"
              style={styles.doneButton}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToDashboard();
          if (tab === "request-detail") onNavigateToSubmitRequest();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </>
  );
};
