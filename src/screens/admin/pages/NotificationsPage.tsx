import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { notificationService } from "../../../services/notificationService";
import styles from "./notificationsStyles";

interface NotificationsPageProps {
  onBack: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHome: () => void;
  onNavigateToNotifications: () => void;
  onRefresh?: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onBack,
  onNavigateToTasks,
  onNavigateToHome,
  onNavigateToNotifications,
  onRefresh,
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getAll();
      setNotifications(data);
      if (onRefresh) onRefresh();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      loadNotifications();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to mark as read");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await notificationService.delete(id);
      loadNotifications();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to delete notification");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 0) return "Just now"; // Handle future timestamps
    if (diff < 60) return "Just now";
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
    }
    if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
    // For older than a week, show the actual date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.adminNotificationHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.adminNotificationHeaderContent}>
          <Text style={styles.notificationTitle}>Notifications</Text>
          <Text style={styles.notificationDate}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.adminNotificationsList}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {loading ? (
          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              Loading notifications...
            </Text>
          </View>
        ) : notifications.length === 0 ? (
          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>No notifications</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.adminNotificationCard,
                !notification.is_read && { backgroundColor: "#E6F4FE" },
              ]}
              onPress={() => handleMarkAsRead(notification.id)}
              onLongPress={() => handleDelete(notification.id)}
            >
              <Text style={styles.adminNotificationText}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>
                {formatTime(notification.created_at)}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={onNavigateToHome}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onNavigateToTasks}>
          <Text style={styles.navIcon}>📄</Text>
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="notifications"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToHome();
          if (tab === "request-detail") onNavigateToTasks();
        }}
      />
    </SafeAreaView>
  );
};
