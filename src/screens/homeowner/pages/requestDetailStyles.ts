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
  detailContainer: {
    padding: spacing.xl,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailSection: {
    marginBottom: spacing.lg,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  detailSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  detailTitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.status.pending.bg,
  },
  statusText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "600",
  },
  chatButton: {
    marginTop: spacing.xl,
  },
});

export default styles;
