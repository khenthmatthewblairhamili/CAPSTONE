import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../config/theme";

const styles = StyleSheet.create({
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    paddingHorizontal: 20,
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginTop: 8,
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  notificationsList: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  notificationCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  notificationText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  notificationTime: {
    fontSize: 13,
    color: "#999",
  },
});

export default styles;
