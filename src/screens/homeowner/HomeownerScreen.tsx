import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../config/theme";
import { authService, User } from "../../services/authService";
import { messageService } from "../../services/messageService";
import { notificationService } from "../../services/notificationService";
import { requestService } from "../../services/requestService";
import { ImageOptionsModal } from "./components/ImageOptionsModal";
import styles from "./homeownerStyles";
import { ChatPage } from "./pages/ChatPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RequestDetailPage } from "./pages/RequestDetailPage";
import { SubmitRequestPage } from "./pages/SubmitRequestPage";
import { TechnicalIssuePage } from "./pages/TechnicalIssuePage";

type HomeownerPageType =
  | "dashboard"
  | "submit-request"
  | "request-detail"
  | "chat"
  | "technical-issue"
  | "notifications"
  | "profile";

interface Message {
  id: number;
  sender: string;
  text: string;
  avatar: string;
  isHomeowner: boolean;
  timestamp?: string;
}

interface HomeownerAppProps {
  onLogout: () => void;
}

export const HomeownerApp: React.FC<HomeownerAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] =
    useState<HomeownerPageType>("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState<string>("");
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Available maintenance types
  const maintenanceTypes = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Appliances",
    "Structural",
    "Pest Control",
    "Landscaping",
    "Cleaning",
    "Other",
  ];

  // Load user and requests data
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

  // Reload messages when switching to chat page to get updated user profiles
  useEffect(() => {
    if (currentPage === "chat" && selectedRequest) {
      loadMessages(selectedRequest.id);
    }
  }, [currentPage]);

  // Reload data when viewing request detail to ensure latest status
  useEffect(() => {
    if (currentPage === "request-detail" && selectedRequest) {
      refreshSelectedRequest();
    }
  }, [currentPage]);

  const refreshSelectedRequest = async () => {
    if (!selectedRequest) return;
    try {
      // Reload all requests to ensure we have the latest data
      const allRequests = await requestService.getAll();
      setRequests(allRequests);

      // Find and update the selected request
      const updatedRequest = allRequests.find(
        (req) => req.id === selectedRequest.id
      );
      if (updatedRequest) {
        setSelectedRequest(updatedRequest);
      }
    } catch (error) {
      console.error("Failed to refresh request:", error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, requestsData] = await Promise.all([
        authService.getCurrentUser(),
        requestService.getAll(),
      ]);
      setUser(userData);
      setRequests(requestsData);
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

  // Get completed requests for history
  const requestHistory = requests.filter((req) => req.status === "completed");

  // Get active requests (pending or in-progress)
  const activeRequests = requests.filter(
    (req) => req.status === "pending" || req.status === "in-progress"
  );

  // Helper functions
  const getStatusStyle = (status: string) => {
    if (status === "pending")
      return { backgroundColor: "#fbbf24", color: "#92400e" };
    if (status === "in-progress")
      return { backgroundColor: "#93c5fd", color: "#1e40af" };
    if (status === "completed")
      return { backgroundColor: "#86efac", color: "#166534" };
    return {};
  };

  const getStatusText = (status: string) => {
    if (status === "pending") return "Pending";
    if (status === "in-progress") return "In progress";
    if (status === "completed") return "Completed";
    return status;
  };

  // Image handlers
  const handleImageUpload = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to upload images!"
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      try {
        await authService.updateProfile({ profile_image: newImageUri });
        const updatedUser = await authService.getCurrentUser();
        setUser(updatedUser);
        setShowImageOptions(false);
        Alert.alert("Success", "Profile image updated");
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to update profile image");
      }
    }
  };

  const handleTakePhoto = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to take photos!"
        );
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      try {
        await authService.updateProfile({ profile_image: newImageUri });
        const updatedUser = await authService.getCurrentUser();
        setUser(updatedUser);
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
      setUser(updatedUser);
      setShowImageOptions(false);
      Alert.alert("Success", "Profile image removed");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to remove profile image");
    }
  };

  // Navigation handlers
  const handleCategoryPress = (category: string) => {
    setSelectedRequestType(category);
    setCurrentPage("submit-request");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedRequestType(type);
    setShowTypeDropdown(false);
  };

  const handleSubmitRequest = async () => {
    if (!selectedRequestType || !unitNumber || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const newRequest = await requestService.create({
        type: selectedRequestType,
        description: description,
        unit: unitNumber,
        address: user?.address || "",
        priority: "Medium",
      });

      setRequests((prev) => [newRequest, ...prev]);
      setSelectedRequest(newRequest);
      setUnitNumber("");
      setDescription("");
      Alert.alert("Success", "Request submitted successfully");
      setCurrentPage("request-detail");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    setSelectedRequestType("");
    setUnitNumber("");
    setDescription("");
    setShowTypeDropdown(false);
    setCurrentPage("dashboard");
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedRequest) return;

    try {
      await messageService.create(selectedRequest.id, messageInput);

      setMessageInput("");

      // Reload messages from server to get updated data
      await loadMessages(selectedRequest.id);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send message");
    }
  };

  // Load messages for a request
  const loadMessages = async (requestId: number) => {
    try {
      const messagesData = await messageService.getByRequestId(requestId);
      const formattedMessages = messagesData.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender_name,
        text: msg.message,
        avatar:
          msg.sender_avatar ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
        isHomeowner: msg.sender_role === "homeowner",
        timestamp: msg.created_at,
      }));
      setMessages(formattedMessages);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load messages");
    }
  };

  // Render page based on current state
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <DashboardPage
            user={user}
            activeRequests={activeRequests}
            showHistoryModal={showHistoryModal}
            requestHistory={requestHistory}
            onNavigateToProfile={() => setCurrentPage("profile")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onCategoryPress={handleCategoryPress}
            onShowHistoryModal={() => setShowHistoryModal(true)}
            onHideHistoryModal={() => setShowHistoryModal(false)}
            onRequestPress={(request) => {
              setSelectedRequest(request);
              loadMessages(request.id);
              setCurrentPage("request-detail");
            }}
            getStatusStyle={getStatusStyle}
            getStatusText={getStatusText}
          />
        );

      case "submit-request":
        return (
          <SubmitRequestPage
            selectedRequestType={selectedRequestType}
            unitNumber={unitNumber}
            description={description}
            showTypeDropdown={showTypeDropdown}
            maintenanceTypes={maintenanceTypes}
            onBack={handleBackToDashboard}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onTypeSelect={handleTypeSelect}
            onShowTypeDropdown={() => setShowTypeDropdown(true)}
            onHideTypeDropdown={() => setShowTypeDropdown(false)}
            onUnitNumberChange={setUnitNumber}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmitRequest}
          />
        );

      case "request-detail":
        return (
          <RequestDetailPage
            request={selectedRequest}
            onBack={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onNavigateToChat={() => {
              if (selectedRequest) {
                loadMessages(selectedRequest.id);
              }
              setCurrentPage("chat");
            }}
          />
        );

      case "chat":
        return (
          <ChatPage
            messages={messages}
            messageInput={messageInput}
            onBack={() => setCurrentPage("request-detail")}
            onNavigateToDashboard={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onNavigateToTechnicalIssue={() => setCurrentPage("technical-issue")}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
          />
        );

      case "technical-issue":
        return (
          <TechnicalIssuePage
            request={selectedRequest}
            onBack={() => setCurrentPage("chat")}
            onNavigateToDashboard={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
          />
        );

      case "notifications":
        return (
          <NotificationsPage
            onBack={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onRefresh={loadUnreadNotifications}
          />
        );

      case "profile":
        return (
          <ProfilePage
            user={user}
            onBack={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onEditAvatar={() => setShowImageOptions(true)}
            onUpdateProfile={async (updates) => {
              try {
                await authService.updateProfile(updates);
                const updatedUser = await authService.getCurrentUser();
                setUser(updatedUser);
                Alert.alert("Success", "Profile updated successfully");
              } catch (error: any) {
                Alert.alert(
                  "Error",
                  error.message || "Failed to update profile"
                );
              }
            }}
            onLogout={onLogout}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {renderPage()}

      {/* Image Options Modal */}
      <ImageOptionsModal
        visible={showImageOptions}
        profileImage={user?.profile_image || null}
        onClose={() => setShowImageOptions(false)}
        onTakePhoto={handleTakePhoto}
        onUploadImage={handleImageUpload}
        onRemovePhoto={handleRemovePhoto}
      />
    </SafeAreaView>
  );
};
