import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./maintenanceRequestsStyles";

interface MaintenanceRequestsPageProps {
  allRequests: any[];
  pendingRequests: any[];
  completedRequests: any[];
  inProgressRequests: any[];
  onBack: () => void;
  onShowPendingModal: () => void;
  onShowInProgressModal: () => void;
  onShowCompletedModal: () => void;
  onRequestClick: (request: any) => void;
  getStatusStyle: (status: string) => any;
  getStatusText: (status: string) => string;
  getPriorityStyle: (priority: string) => any;
  onNavigateToNotifications: () => void;
}

export const MaintenanceRequestsPage: React.FC<
  MaintenanceRequestsPageProps
> = ({
  allRequests,
  pendingRequests,
  completedRequests,
  inProgressRequests,
  onBack,
  onShowPendingModal,
  onShowInProgressModal,
  onShowCompletedModal,
  onRequestClick,
  getStatusStyle,
  getStatusText,
  getPriorityStyle,
  onNavigateToNotifications,
}) => {
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.adminHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.adminHeaderText}>
          <Text style={styles.adminName}>Maintenance Requests</Text>
          <Text style={styles.dateText}>All maintenance tasks</Text>
        </View>
      </View>

      <ScrollView
        style={styles.adminContent}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Stats Overview */}
        <View style={styles.statsOverview}>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: "#fbbf24" }]}
            onPress={onShowPendingModal}
          >
            <Text style={styles.statNumber}>{pendingRequests.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: "#93c5fd" }]}
            onPress={onShowInProgressModal}
          >
            <Text style={styles.statNumber}>{inProgressRequests.length}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: "#86efac" }]}
            onPress={onShowCompletedModal}
          >
            <Text style={styles.statNumber}>{completedRequests.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </TouchableOpacity>
        </View>

        {/* Requests Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Request ID</Text>
            <Text style={styles.tableHeaderCellType}>Type</Text>
            <Text style={styles.tableHeaderCell}>Address</Text>
            <Text style={styles.tableHeaderCellStatus}>Status</Text>
            <Text style={styles.tableHeaderCellPriority}>Priority</Text>
          </View>

          <ScrollView style={styles.tableBody}>
            {allRequests.map((request, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tableRow}
                onPress={() => onRequestClick(request)}
              >
                <View style={styles.tableCellReq}>
                  <Text style={styles.requestIdText}>{request.id}</Text>
                  <Text style={styles.unitText}>{request.unit}</Text>
                </View>
                <View style={styles.tableCellType}>
                  <Text style={styles.typeText}>{request.type}</Text>
                </View>
                <View style={styles.tableCellAdd}>
                  <Text style={styles.addressText}>{request.address}</Text>
                </View>
                <View style={styles.tableCellStatus}>
                  <Text
                    style={[
                      styles.statusBadge2,
                      getStatusStyle(request.status),
                    ]}
                  >
                    {getStatusText(request.status)}
                  </Text>
                </View>
                <View style={styles.tableCellPriority}>
                  <Text
                    style={[
                      styles.statusBadge2,
                      getPriorityStyle(request.priority),
                    ]}
                  >
                    {request.priority}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="request-detail"
        onTabPress={(tab) => {
          if (tab === "home") onBack();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </SafeAreaView>
  );
};
