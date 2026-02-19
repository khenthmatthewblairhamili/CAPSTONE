import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { User } from "../../../services/authService";
import styles from "./profileStyles";

interface ProfilePageProps {
  user: User | null;
  onBack: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onEditAvatar: () => void;
  onUpdateProfile: (updates: Partial<User>) => Promise<void>;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onBack,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onEditAvatar,
  onUpdateProfile,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await onUpdateProfile({ name, phone, address });
      setIsEditing(false);
    } catch (error) {
      // Error is handled in parent component
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
    setIsEditing(false);
  };

  const getProfileImageSource = () => {
    if (user?.profile_image) {
      return { uri: user.profile_image };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=User" };
  };

  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Profile</Text>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Content */}
      <ScrollView
        style={styles.profileContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Profile Avatar Section with Edit Button */}
        <View style={styles.profileAvatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onEditAvatar}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileAvatarLarge}
            />
            <View style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileRole}>Homeowner</Text>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Name :</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
              />
            ) : (
              <View style={styles.profileFieldValueContainer}>
                <Text style={styles.profileFieldValue}>{name}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Email :</Text>
            <View style={styles.profileFieldValueContainer}>
              <Text style={styles.profileFieldValue}>{email}</Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Address :</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
              />
            ) : (
              <View style={styles.profileFieldValueContainer}>
                <Text style={styles.profileFieldValue}>{address}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Phone:</Text>
            {isEditing ? (
              <TextInput
                style={styles.profileFieldInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone"
                keyboardType="phone-pad"
              />
            ) : (
              <View style={styles.profileFieldValueContainer}>
                <Text style={styles.profileFieldValue}>{phone}</Text>
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
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
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
