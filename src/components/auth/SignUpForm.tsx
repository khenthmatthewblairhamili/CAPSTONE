import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { borderRadius, colors, shadows, spacing } from "../../config/theme";
import { authService } from "../../services/authService";
import { UserRole } from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface SignUpFormProps {
  onSignUp: () => void;
  onBackToLogin: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSignUp,
  onBackToLogin,
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>("homeowner");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Admin specific fields
  const [position, setPosition] = useState("");
  const [community, setCommunity] = useState("");

  const handleSignUp = async () => {
    // Validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (activeTab === "homeowner" && !address) {
      Alert.alert("Error", "Address is required for homeowners");
      return;
    }

    if (activeTab === "admin" && (!position || !community)) {
      Alert.alert("Error", "Position and community are required for admins");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email,
        password,
        name: fullName,
        role: activeTab,
        phone,
        address: activeTab === "homeowner" ? address : undefined,
        position: activeTab === "admin" ? position : undefined,
        community: activeTab === "admin" ? community : undefined,
      });

      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: onSignUp },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message || "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/camella.jpeg")}
      style={styles.signupBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.signupHeader}>
            <Text style={styles.headerTitle}>PRIMA CAMELLA</Text>
            <Text style={styles.headerSubtitle}>BUTUAN</Text>
          </View>

          <View style={styles.signupCard}>
            <View style={styles.welcomeBox}>
              <Text
                style={[
                  styles.welcomeText,
                  activeTab === "admin" && styles.welcomeTextAdmin,
                ]}
              >
                Create Account
              </Text>
              <Text style={styles.welcomeSubtext}>Sign up to get started</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "homeowner" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("homeowner")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "homeowner" && styles.tabTextActive,
                  ]}
                >
                  Homeowner
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "admin" && styles.tabActiveAdmin,
                ]}
                onPress={() => setActiveTab("admin")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "admin" && styles.tabTextActive,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />

              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {activeTab === "homeowner" ? (
                <Input
                  label="Address"
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                />
              ) : (
                <>
                  <Input
                    label="Position"
                    placeholder="Enter your position"
                    value={position}
                    onChangeText={setPosition}
                  />
                  <Input
                    label="Community"
                    placeholder="Enter your community"
                    value={community}
                    onChangeText={setCommunity}
                  />
                </>
              )}

              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {/* ★ FIXED CHECKBOX ★ */}
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    rememberMe &&
                      (activeTab === "admin"
                        ? styles.checkboxBoxActiveAdmin
                        : styles.checkboxBoxActive),
                  ]}
                />

                <Text
                  style={[
                    styles.rememberMeText,
                    rememberMe &&
                      (activeTab === "admin"
                        ? styles.rememberMeTextActiveAdmin
                        : styles.rememberMeTextActive),
                  ]}
                >
                  Remember Me
                </Text>
              </TouchableOpacity>

              <Button
                title={loading ? "Creating Account..." : "Sign Up"}
                onPress={handleSignUp}
                variant={activeTab === "admin" ? "primary" : "accent"}
                style={styles.signupButton}
                disabled={loading}
              />

              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={onBackToLogin}>
                  <Text
                    style={[
                      styles.loginLink,
                      activeTab === "admin" && styles.loginLinkAdmin,
                    ]}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

/* ------------------------ STYLES ------------------------ */

const styles = StyleSheet.create({
  signupBackground: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    backgroundColor: colors.secondary,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  signupHeader: {
    zIndex: 2,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 3,
  },
  signupCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    zIndex: 2,
    ...shadows.large,
  },
  welcomeBox: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 4,
  },
  welcomeTextAdmin: {
    color: colors.primary,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  tabContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tabActiveAdmin: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.white,
  },
  form: {
    width: "100%",
  },

  /* ---------- FIXED CHECKBOX ---------- */
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: spacing.md,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  checkboxBoxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxBoxActiveAdmin: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rememberMeText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  rememberMeTextActive: {
    color: colors.accent,
    fontWeight: "600",
  },
  rememberMeTextActiveAdmin: {
    color: colors.primary,
    fontWeight: "600",
  },

  signupButton: {
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  loginLink: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: "600",
  },
  loginLinkAdmin: {
    color: colors.primary,
  },
});
