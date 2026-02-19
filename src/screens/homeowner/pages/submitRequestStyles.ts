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
  form: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  typeInputContainer: {
    marginBottom: spacing.xl,
  },
  typeInput: {
    marginBottom: 0,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filledInput: {
    borderColor: colors.accent,
    backgroundColor: "#f0f9ff",
  },
  emptyInput: {
    borderColor: colors.border,
  },
  typeInputText: {
    fontSize: 16,
    flex: 1,
  },
  filledText: {
    color: colors.text.primary,
    fontWeight: "600",
  },
  placeholderText: {
    color: colors.text.tertiary,
  },
  input: {
    marginBottom: spacing.xl,
  },
  textarea: {
    minHeight: 100,
    marginBottom: spacing.xl,
  },
  // Dropdown Modal styles
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: spacing.xl,
  },
  dropdownModal: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  dropdownList: {
    maxHeight: 400,
  },
  dropdownItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDropdownItem: {
    backgroundColor: "#f0f9ff",
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  selectedDropdownItemText: {
    color: colors.accent,
    fontWeight: "600",
  },
});

export default styles;
