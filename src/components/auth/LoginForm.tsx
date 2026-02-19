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

interface LoginFormProps {
  onLogin: (role: UserRole) => void;
  onSignUpPress: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSignUpPress,
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>("homeowner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);

      // Verify role matches selected tab
      if (response.user.role !== activeTab) {
        Alert.alert(
          "Error",
          `This account is registered as ${response.user.role}, not ${activeTab}`
        );
        await authService.logout();
        return;
      }

      onLogin(response.user.role);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/camella.jpeg")}
      style={styles.loginBackground}
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
          <View style={styles.loginHeader}>
            <Text style={styles.headerTitle}>PRIMA CAMELLA</Text>
            <Text style={styles.headerSubtitle}>BUTUAN</Text>
          </View>

          <View style={styles.loginCard}>
            <View style={styles.welcomeBox}>
              <Text
                style={[
                  styles.welcomeText,
                  activeTab === "admin" && styles.welcomeTextAdmin,
                ]}
              >
                Welcome Back!
              </Text>
              <Text style={styles.welcomeSubtext}>Login to continue</Text>
            </View>

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

            <View style={styles.form}>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                }
              />

              <View style={styles.forgotPassword}>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.forgotLink,
                      activeTab === "admin" && styles.forgotLinkAdmin,
                    ]}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                title={loading ? "Logging in..." : "Log In"}
                onPress={handleLogin}
                variant={activeTab === "admin" ? "primary" : "accent"}
                style={styles.loginButton}
                disabled={loading}
              />

              <View style={styles.signupTextContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={onSignUpPress}>
                  <Text
                    style={[
                      styles.signupLink,
                      activeTab === "admin" && styles.signupLinkAdmin,
                    ]}
                  >
                    Sign Up
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
const styles = StyleSheet.create({
  loginBackground: {
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
  loginHeader: {
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
  loginCard: {
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
    paddingHorizontal: spacing.xl,
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
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: spacing.xl,
  },
  forgotLink: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: "500",
  },
  forgotLinkAdmin: {
    color: colors.primary,
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  signupTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  signupLink: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: "600",
  },
  signupLinkAdmin: {
    color: colors.primary,
  },
  eyeIcon: {
    fontSize: 20,
  },
});
