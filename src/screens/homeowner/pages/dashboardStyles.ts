import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../../config/theme";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
    marginTop: 8,
  },
  welcomeBack: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.border,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroBanner: {
    minHeight: 350,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: colors.secondary,
    overflow: "hidden",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(27, 126, 7, 0.4)",
  },
  bannerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginBottom: 14,
  },
  bannerSubtitle: {
    fontStyle: "italic",
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  bannerQuick: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.category.accent,
    letterSpacing: 2,
    marginBottom: 7,
  },
  bannerTextIssue: {
    fontSize: 15,
    color: colors.category.accent,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  submitButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
  },
  activeRequestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
  },
  activeRequestsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  checkIcon: {
    fontSize: 20,
  },
  activeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  viewHistory: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  requestsContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  // History Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  historyModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  historyList: {
    padding: spacing.lg,
  },
  historyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  historyRequestId: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  historyStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
  },
  historyType: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  historyDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  historyCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyUnit: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  historyDate: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  noRequestsText: {
    fontSize: 14,
    color: colors.text.tertiary,
    textAlign: "center",
    padding: spacing.xl,
  },
});

export default styles;
