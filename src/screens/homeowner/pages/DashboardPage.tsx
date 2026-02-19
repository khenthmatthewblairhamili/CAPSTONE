import React from "react";
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import { CategoryGrid } from "../../../components/homeowner/CategoryGrid";
import { RequestCard } from "../../../components/homeowner/RequestCard";
import { colors } from "../../../config/theme";
import { User } from "../../../services/authService";
import styles from "./dashboardStyles";

interface DashboardPageProps {
  user: User | null;
  activeRequests: any[];
  showHistoryModal: boolean;
  requestHistory: any[];
  onNavigateToProfile: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onCategoryPress: (category: string) => void;
  onShowHistoryModal: () => void;
  onHideHistoryModal: () => void;
  onRequestPress: (request: any) => void;
  getStatusStyle: (status: string) => any;
  getStatusText: (status: string) => string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  activeRequests,
  showHistoryModal,
  requestHistory,
  onNavigateToProfile,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onCategoryPress,
  onShowHistoryModal,
  onHideHistoryModal,
  onRequestPress,
  getStatusStyle,
  getStatusText,
}) => {
  const getProfileImageSource = () => {
    if (user?.profile_image) {
      return { uri: user.profile_image };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=User" };
  };

  const getUserName = () => {
    return user?.name || "User";
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeBack}>Welcome back,</Text>
            <Text style={styles.userName}>{getUserName()}!</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={onNavigateToProfile}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <ImageBackground
          source={require("../../../assets/images/camella.jpeg")}
          style={styles.heroBanner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>COMMUNITY CARE & ASSISTANCE</Text>
            <Text style={styles.bannerSubtitle}>Need Help?</Text>
            <Text style={styles.bannerQuick}>QUICK SERVICE</Text>
            <Text style={styles.bannerTextIssue}>Report an Issue</Text>
            <Button
              title="Submit Request"
              onPress={onNavigateToSubmitRequest}
              variant="accent"
              style={styles.submitButton}
            />
          </View>
        </ImageBackground>

        {/* Active Requests Section */}
        <View style={styles.activeRequestsHeader}>
          <View style={styles.activeRequestsTitle}>
            <Text style={styles.checkIcon}>📋</Text>
            <Text style={styles.activeText}>
              Active Request ({activeRequests.length})
            </Text>
          </View>
          <TouchableOpacity onPress={onShowHistoryModal}>
            <Text style={styles.viewHistory}>View History</Text>
          </TouchableOpacity>
        </View>

        {/* Request Cards */}
        <View style={styles.requestsContainer}>
          {activeRequests.length > 0 ? (
            activeRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                onPress={() => onRequestPress(request)}
              >
                <RequestCard request={request} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noRequestsText}>No active requests</Text>
          )}
        </View>

        {/* Report Category */}
        <CategoryGrid onCategoryPress={onCategoryPress} />
      </ScrollView>

      {/* View History Modal */}
      <Modal
        visible={showHistoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={onHideHistoryModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.historyModal}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Request History</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onHideHistoryModal}
              >
                <Icon name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.historyList}>
              {requestHistory.map((request, index) => (
                <View key={index} style={styles.historyCard}>
                  <View style={styles.historyCardHeader}>
                    <Text style={styles.historyRequestId}>{request.id}</Text>
                    <Text
                      style={[
                        styles.historyStatusBadge,
                        getStatusStyle(request.status),
                      ]}
                    >
                      {getStatusText(request.status)}
                    </Text>
                  </View>

                  <Text style={styles.historyType}>{request.type}</Text>
                  <Text style={styles.historyDescription}>
                    {request.description}
                  </Text>

                  <View style={styles.historyCardFooter}>
                    <Text style={styles.historyUnit}>{request.unit}</Text>
                    <Text style={styles.historyDate}>{request.date}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "notifications") onNavigateToNotifications();
          if (tab === "request-detail") onNavigateToSubmitRequest();
        }}
      />
    </>
  );
};
