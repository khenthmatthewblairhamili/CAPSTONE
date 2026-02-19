import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { notificationService } from "../../../services/notificationService";
import styles from "./notificationsStyles";

interface NotificationsPageProps {
  onBack: () => void;
  onNavigateToSubmitRequest: () => void;
  onRefresh?: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onBack,
  onNavigateToSubmitRequest,
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
    <>
      {/* Header */}
      <View style={styles.notificationHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.notificationTitle}>Notification</Text>
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

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {loading ? (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>Loading...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>No notifications</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <TouchableOpacity
                style={styles.notificationItem}
                onPress={() => handleMarkAsRead(notification.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.notificationText,
                      !notification.is_read && { fontWeight: "bold" },
                    ]}
                  >
                    {notification.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {notification.message}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.notificationTime}>
                    {formatTime(notification.created_at)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(notification.id)}
                    style={{ marginTop: 8 }}
                  >
                    <Text style={{ color: "#ef4444", fontSize: 12 }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="notifications"
        onTabPress={(tab) => {
          if (tab === "home") onBack();
          if (tab === "request-detail") onNavigateToSubmitRequest();
        }}
      />
    </>
  );
};
