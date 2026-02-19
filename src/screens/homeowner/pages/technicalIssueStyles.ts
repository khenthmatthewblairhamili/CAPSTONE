import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../../config/theme";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.lg,
    marginTop: 8,
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  technicalContainer: {
    padding: spacing.xl,
  },
  technicalCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  updateLabel: {
    backgroundColor: colors.accent,
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
  },
  updateLabelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 1,
  },
  updateText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  technicianInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  technicianAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  technicianDetails: {
    flex: 1,
  },
  technicianName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  technicianDate: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  notesSection: {
    backgroundColor: "#f9fafb",
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  notesText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  doneButton: {
    marginTop: spacing.md,
  },
});

export default styles;
