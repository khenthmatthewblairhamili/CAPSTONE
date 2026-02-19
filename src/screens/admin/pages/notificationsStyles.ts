import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  adminNotificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 8,
  },
  adminNotificationHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "bold",
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  notificationDate: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  adminNotificationsList: {
    flex: 1,
    padding: 16,
  },
  adminNotificationCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  adminNotificationText: {
    fontSize: 14,
    color: "#1f2937",
    marginBottom: 6,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeNavButton: {
    backgroundColor: "#eff6ff",
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
  },
});

export default styles;
