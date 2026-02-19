import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../../config/theme";

const styles = StyleSheet.create({
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
  chatContainer: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  messageGroup: {
    marginBottom: spacing.xl,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  messageHeaderRight: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  messageLeft: {
    alignItems: "flex-start",
  },
  messageRight: {
    alignItems: "flex-end",
  },
  messageBubbleLeft: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageBubbleRight: {
    backgroundColor: "#86efac",
    borderRadius: borderRadius.md,
    padding: spacing.md,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageTextLeft: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  messageTextRight: {
    fontSize: 14,
    color: "#14532d",
    lineHeight: 20,
  },
  messageTimestamp: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  chatFooter: {
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 80,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 0,
  },
  messageInput: {
    minHeight: 40,
  },
  sendIconButton: {
    backgroundColor: colors.accent,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    marginTop: spacing.md,
  },
  emptyMessagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    minHeight: 200,
  },
  emptyMessagesText: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: "center",
  },
});

export default styles;
