import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { authService, User } from "../../services/authService";
import { messageService } from "../../services/messageService";
import { notificationService } from "../../services/notificationService";
import {
  MaintenanceRequest,
  requestService,
} from "../../services/requestService";
import styles from "./adminStyles";
import { AssignTechnicianModal } from "./components/AssignTechnicianModal";
import { ChatModal } from "./components/ChatModal";
import { CompleteRequestModal } from "./components/CompleteRequestModal";
import { RequestDetailModal } from "./components/RequestDetailModal";
import { RequestModal } from "./components/RequestModal";
import { DashboardPage } from "./pages/DashboardPage";
import { MaintenanceRequestsPage } from "./pages/MaintenanceRequestsPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";

type AdminPageType =
  | "admin-dashboard"
  | "admin-profile"
  | "admin-notifications"
  | "maintenance-requests";

interface AdminAppProps {
  onLogout: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] =
    useState<AdminPageType>("admin-dashboard");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [showAssignTechnicianModal, setShowAssignTechnicianModal] =
    useState(false);
  const [technicianName, setTechnicianName] = useState("");
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [showCompleteRequestModal, setShowCompleteRequestModal] =
    useState(false);
  const [completionNotes, setCompletionNotes] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<number>(3); // Days

  // State for data from backend
  const [allRequests, setAllRequests] = useState<MaintenanceRequest[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Fetch user data and requests on mount
  useEffect(() => {
    loadData();
    loadUnreadNotifications();
  }, []);

  // Poll for new notifications and requests every 10 seconds to sync with database
  useEffect(() => {
    const interval = setInterval(() => {
      loadUnreadNotifications();
      loadData(); // Reload requests to sync with database
    }, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [user, requests] = await Promise.all([
        authService.getCurrentUser(),
        requestService.getAll(),
      ]);
      setCurrentUser(user);
      setProfileImage(user?.profile_image || null);
      setAllRequests(requests);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadNotifications = async () => {
    try {
      const { count } = await notificationService.getUnreadCount();
      setUnreadNotifications(count);
    } catch (error) {
      // Silently fail - don't show alert for background refresh
      console.error("Failed to load unread notifications:", error);
    }
  };

  // Computed states
  const pendingRequests = allRequests.filter((req) => req.status === "pending");
  const inProgressRequests = allRequests.filter(
    (req) => req.status === "in-progress"
  );
  const completedRequests = allRequests.filter(
    (req) => req.status === "completed"
  );

  // Calculate requests from selected date range
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - selectedDateRange);
  const recentRequests = allRequests.filter((req) => {
    const requestDate = new Date(req.created_at);
    return requestDate >= daysAgo;
  });

  // Calculate performance metrics
  const activeTechnicians =
    new Set(
      inProgressRequests
        .filter((req) => req.assigned_technician)
        .map((req) => req.assigned_technician)
    ).size || 0;

  const completedThisWeek =
    allRequests.filter((req) => {
      if (req.status !== "completed") return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(req.updated_at || req.created_at) >= weekAgo;
    }).length || 0;

  // Calculate average response time (time from created to in-progress)
  const responseTimes = allRequests
    .filter((req) => req.status === "in-progress" || req.status === "completed")
    .map((req) => {
      const created = new Date(req.created_at).getTime();
      const updated = new Date(req.updated_at || req.created_at).getTime();
      return (updated - created) / (1000 * 60 * 60); // Convert to hours
    })
    .filter((time) => !isNaN(time) && time > 0 && time < 168); // Filter valid times (< 1 week) and remove NaN

  const avgResponseTime =
    responseTimes.length > 0
      ? Math.round(
          responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        )
      : 0;

  // Calculate weekly chart data (current week: Monday to Sunday/Today)
  const getStartOfWeek = () => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const startOfWeek = getStartOfWeek();
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToShow = currentDay === 0 ? 7 : currentDay; // If Sunday, show all 7 days; otherwise show up to current day

  const weeklyChartData = Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const completed =
      allRequests.filter((req) => {
        if (req.status !== "completed" || !req.completed_date) return false;
        const completedDate = new Date(req.completed_date);
        return completedDate >= startOfDay && completedDate <= endOfDay;
      }).length || 0;

    const pending =
      allRequests.filter((req) => {
        if (req.status !== "pending") return false;
        const createdDate = new Date(req.created_at);
        return createdDate >= startOfDay && createdDate <= endOfDay;
      }).length || 0;

    return { day: dayName, completed, pending };
  });

  // Helper functions
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

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return { backgroundColor: "#fca5a5", color: "#7f1d1d" };
      case "medium":
        return { backgroundColor: "#fde047", color: "#713f12" };
      case "low":
        return { backgroundColor: "#d1d5db", color: "#374151" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#6b7280" };
    }
  };

  const getProfileImageSource = () => {
    const imageUri = currentUser?.profile_image || profileImage;
    if (imageUri) {
      return { uri: imageUri };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" };
  };

  // Image picker handlers
  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera permission is needed");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const newImageUri = result.assets[0].uri;
      try {
        await authService.updateProfile({ profile_image: newImageUri });
        const updatedUser = await authService.getCurrentUser();
        setCurrentUser(updatedUser);
        setProfileImage(newImageUri);
        setShowImageOptions(false);
        Alert.alert("Success", "Profile image updated");
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to update profile image");
      }
    }
  };

  const handleChoosePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Media library permission is needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const newImageUri = result.assets[0].uri;
      try {
        await authService.updateProfile({ profile_image: newImageUri });
        const updatedUser = await authService.getCurrentUser();
        setCurrentUser(updatedUser);
        setProfileImage(newImageUri);
        setShowImageOptions(false);
        Alert.alert("Success", "Profile image updated");
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to update profile image");
      }
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await authService.updateProfile({ profile_image: null });
      const updatedUser = await authService.getCurrentUser();
      setCurrentUser(updatedUser);
      setProfileImage(null);
      setShowImageOptions(false);
      Alert.alert("Success", "Profile image removed");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to remove profile image");
    }
  };

  // Request handlers
  const handleRequestClick = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setShowRequestDetailModal(true);
  };

  const handleAssignTechnician = async () => {
    if (!selectedRequest) return;

    if (!technicianName.trim()) {
      Alert.alert("Error", "Please enter technician name");
      return;
    }

    try {
      const updatedRequest = await requestService.update(selectedRequest.id, {
        status: "in-progress",
        assigned_technician: technicianName,
        technician_notes: technicianNotes,
      });

      setAllRequests(
        allRequests.map((req) =>
          req.id === selectedRequest.id ? updatedRequest : req
        )
      );

      setShowAssignTechnicianModal(false);
      setShowRequestDetailModal(false);
      setTechnicianName("");
      setTechnicianNotes("");
      setSelectedRequest(null);
      Alert.alert(
        "Success",
        "Technician assigned and status updated to In Progress"
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to assign technician");
    }
  };

  const handleCompleteRequest = async () => {
    if (!selectedRequest) return;

    if (!completionNotes.trim()) {
      Alert.alert("Error", "Please enter completion notes");
      return;
    }

    try {
      const updatedRequest = await requestService.update(selectedRequest.id, {
        status: "completed",
        completion_notes: completionNotes,
        completed_date: new Date().toISOString().split("T")[0],
      });

      setAllRequests(
        allRequests.map((req) =>
          req.id === selectedRequest.id ? updatedRequest : req
        )
      );

      setShowCompleteRequestModal(false);
      setShowRequestDetailModal(false);
      setCompletionNotes("");
      setSelectedRequest(null);
      Alert.alert("Success", "Request marked as completed");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to complete request");
    }
  };

  const handleSetPriority = async (priority: string) => {
    if (!selectedRequest) return;

    try {
      const updatedRequest = await requestService.update(selectedRequest.id, {
        priority: priority as "High" | "Medium" | "Low",
      });

      setAllRequests(
        allRequests.map((req) =>
          req.id === selectedRequest.id ? updatedRequest : req
        )
      );

      setSelectedRequest(updatedRequest);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update priority");
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedRequest || !message.trim()) return;

    try {
      await messageService.create(selectedRequest.id, message);

      // Reload messages
      await loadChatMessages(selectedRequest.id);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send message");
    }
  };

  const loadChatMessages = async (requestId: string) => {
    try {
      const messagesData = await messageService.getByRequestId(requestId);
      const formattedMessages = messagesData.map((msg: any) => ({
        id: msg.id,
        sender:
          msg.sender_name ||
          (msg.sender_role === "admin" ? "Admin" : "Homeowner"),
        text: msg.message,
        avatar:
          msg.sender_avatar ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
        isAdmin: msg.sender_role === "admin",
        timestamp: msg.created_at,
      }));
      setChatMessages(formattedMessages);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load messages");
    }
  };

  const handleOpenChat = async (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    await loadChatMessages(request.id);
    setShowChatModal(true);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to logout");
    }
  };

  // Render appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "maintenance-requests":
        return (
          <MaintenanceRequestsPage
            allRequests={allRequests}
            pendingRequests={pendingRequests}
            inProgressRequests={inProgressRequests}
            completedRequests={completedRequests}
            getStatusStyle={getStatusStyle}
            getStatusText={getStatusText}
            getPriorityStyle={getPriorityStyle}
            onRequestClick={handleRequestClick}
            onBack={() => setCurrentPage("admin-dashboard")}
            onShowPendingModal={() => setShowPendingModal(true)}
            onShowInProgressModal={() => setShowInProgressModal(true)}
            onShowCompletedModal={() => setShowCompletedModal(true)}
            onNavigateToNotifications={() =>
              setCurrentPage("admin-notifications")
            }
          />
        );

      case "admin-notifications":
        return (
          <NotificationsPage
            onBack={() => setCurrentPage("admin-dashboard")}
            onNavigateToTasks={() => setCurrentPage("maintenance-requests")}
            onNavigateToHome={() => setCurrentPage("admin-dashboard")}
            onNavigateToNotifications={() =>
              setCurrentPage("admin-notifications")
            }
            onRefresh={loadUnreadNotifications}
          />
        );

      case "admin-profile":
        return (
          <ProfilePage
            profileImage={profileImage}
            getProfileImageSource={getProfileImageSource}
            onImagePress={() => setShowImageOptions(true)}
            onBack={() => setCurrentPage("admin-dashboard")}
            onNavigateToTasks={() => setCurrentPage("maintenance-requests")}
            onNavigateToHome={() => setCurrentPage("admin-dashboard")}
            onNavigateToNotifications={() =>
              setCurrentPage("admin-notifications")
            }
            onLogout={handleLogout}
            onUpdateProfile={loadData}
            currentUser={currentUser}
          />
        );

      default:
        return (
          <DashboardPage
            allRequests={allRequests}
            recentRequests={recentRequests}
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDateRange}
            pendingRequests={pendingRequests}
            inProgressRequests={inProgressRequests}
            completedRequests={completedRequests}
            activeTechnicians={activeTechnicians}
            completedThisWeek={completedThisWeek}
            avgResponseTime={avgResponseTime}
            weeklyChartData={weeklyChartData}
            profileImage={profileImage}
            currentUser={currentUser}
            getProfileImageSource={getProfileImageSource}
            onProfilePress={() => setCurrentPage("admin-profile")}
            onShowAllRequests={() => setShowRequestsModal(true)}
            onShowPending={() => setShowPendingModal(true)}
            onShowCompleted={() => setShowCompletedModal(true)}
            onShowInProgress={() => setShowInProgressModal(true)}
            onNavigateToTasks={() => setCurrentPage("maintenance-requests")}
            onNavigateToHome={() => setCurrentPage("admin-dashboard")}
            onNavigateToNotifications={() =>
              setCurrentPage("admin-notifications")
            }
          />
        );
    }
  };

  // Main render
  return (
    <>
      {/* Render current page */}
      {renderPage()}

      {/* Shared Modals */}
      <RequestModal
        visible={showRequestsModal}
        onClose={() => setShowRequestsModal(false)}
        title={`All Requests (${allRequests.length})`}
        requests={allRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowRequestsModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestModal
        visible={showPendingModal}
        onClose={() => setShowPendingModal(false)}
        title={`Pending Requests (${pendingRequests.length})`}
        requests={pendingRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowPendingModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestModal
        visible={showInProgressModal}
        onClose={() => setShowInProgressModal(false)}
        title={`In Progress (${inProgressRequests.length})`}
        requests={inProgressRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowInProgressModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestModal
        visible={showCompletedModal}
        onClose={() => setShowCompletedModal(false)}
        title={`Completed Requests (${completedRequests.length})`}
        requests={completedRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowCompletedModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestDetailModal
        visible={showRequestDetailModal}
        onClose={() => setShowRequestDetailModal(false)}
        request={selectedRequest}
        onAssignTechnician={() => {
          setShowAssignTechnicianModal(true);
        }}
        onCompleteRequest={() => {
          setShowCompleteRequestModal(true);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
        onSetPriority={handleSetPriority}
        onSendMessage={handleSendMessage}
        onOpenChat={() => {
          setShowRequestDetailModal(false);
          handleOpenChat(selectedRequest!);
        }}
      />

      <ChatModal
        visible={showChatModal}
        onClose={() => setShowChatModal(false)}
        request={selectedRequest}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        onRefresh={() =>
          selectedRequest && loadChatMessages(selectedRequest.id)
        }
      />

      <AssignTechnicianModal
        visible={showAssignTechnicianModal}
        onClose={() => setShowAssignTechnicianModal(false)}
        technicianName={technicianName}
        technicianNotes={technicianNotes}
        onTechnicianNameChange={setTechnicianName}
        onTechnicianNotesChange={setTechnicianNotes}
        onAssign={handleAssignTechnician}
      />

      <CompleteRequestModal
        visible={showCompleteRequestModal}
        onClose={() => setShowCompleteRequestModal(false)}
        completionNotes={completionNotes}
        onCompletionNotesChange={setCompletionNotes}
        onComplete={handleCompleteRequest}
      />

      {/* Image Options Modal (for Profile Page) */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={styles.imageOptionsOverlay}>
          <View style={styles.imageOptionsContainer}>
            <Text style={styles.imageOptionsTitle}>Choose Profile Picture</Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.optionButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleChoosePhoto}
            >
              <Text style={styles.optionButtonText}>Choose from Library</Text>
            </TouchableOpacity>

            {(profileImage || currentUser?.profile_image) && (
              <TouchableOpacity
                style={[styles.optionButton, styles.removeButton]}
                onPress={handleRemovePhoto}
              >
                <Text style={styles.removeButtonText}>
                  Remove Current Photo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.optionButton, styles.cancelOptionButton]}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={styles.cancelOptionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AdminApp;
