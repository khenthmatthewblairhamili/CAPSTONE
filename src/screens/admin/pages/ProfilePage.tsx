import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { authService, User } from "../../../services/authService";
import styles from "./profileStyles";

interface ProfilePageProps {
  profileImage: string | null;
  currentUser: User | null;
  getProfileImageSource: () => any;
  onImagePress: () => void;
  onBack: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHome: () => void;
  onNavigateToNotifications: () => void;
  onLogout: () => void;
  onUpdateProfile: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profileImage,
  currentUser,
  getProfileImageSource,
  onImagePress,
  onBack,
  onNavigateToTasks,
  onNavigateToHome,
  onNavigateToNotifications,
  onLogout,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [community, setCommunity] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPosition(currentUser.position || "");
      setPhone(currentUser.phone || "");
      setCommunity(currentUser.community || "");
    }
  }, [currentUser]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await authService.updateProfile({
        name,
        phone,
        position,
        community,
      });
      setIsEditing(false);
      onUpdateProfile();
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPosition(currentUser.position || "");
      setPhone(currentUser.phone || "");
      setCommunity(currentUser.community || "");
    }
    setIsEditing(false);
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
          <Text style={styles.notificationTitle}>Profile</Text>
          <Text style={styles.notificationDate}>Admin Account</Text>
        </View>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.profileContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Profile Avatar Section */}
        <View style={styles.profileAvatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onImagePress}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileAvatarLarge}
            />
            <View style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileRole}>Administrator</Text>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
              />
            ) : (
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>{name}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Email</Text>
            <View style={styles.profileFieldValue}>
              <Text style={styles.profileFieldValueText}>{email}</Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Position</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={position}
                onChangeText={setPosition}
                placeholder="Enter position"
              />
            ) : (
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>{position}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone"
                keyboardType="phone-pad"
              />
            ) : (
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>{phone}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Community</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={community}
                onChangeText={setCommunity}
                placeholder="Enter community"
              />
            ) : (
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>{community}</Text>
              </View>
            )}
          </View>

          {isEditing && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.adminLogoutButton} onPress={onLogout}>
          <Text style={styles.adminLogoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToHome();
          if (tab === "request-detail") onNavigateToTasks();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </SafeAreaView>
  );
};
