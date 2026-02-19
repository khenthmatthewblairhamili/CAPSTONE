import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../../config/theme";

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = "home",
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onTabPress?.("home")}
      >
        <Text style={[styles.icon, activeTab === "home" && styles.activeIcon]}>
          🏠
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onTabPress?.("request-detail")}
      >
        <Text
          style={[styles.icon, activeTab === "requests" && styles.activeIcon]}
        >
          📄
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onTabPress?.("notifications")}
      >
        <Text
          style={[
            styles.icon,
            activeTab === "notifications" && styles.activeIcon,
          ]}
        >
          🔔
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    padding: spacing.sm,
  },
  icon: {
    fontSize: 24,
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
});
