import { StyleSheet } from "react-native";
import { colors } from "../../../config/theme";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  chatModal: {
    width: "90%",
    maxWidth: 500,
    height: "80%",
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
  },
  requestType: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  emptyMessages: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyMessagesText: {
    fontSize: 16,
    color: colors.text.tertiary,
    marginTop: 16,
    textAlign: "center",
  },
  messageGroup: {
    marginBottom: 16,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  messageHeaderRight: {
    flexDirection: "row-reverse",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  messageSender: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.primary,
    marginHorizontal: 8,
  },
  messageLeft: {
    alignItems: "flex-start",
  },
  messageRight: {
    alignItems: "flex-end",
  },
  messageBubbleLeft: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 12,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageBubbleRight: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderTopRightRadius: 4,
    padding: 12,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageTextLeft: {
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 20,
  },
  messageTextRight: {
    fontSize: 15,
    color: colors.white,
    lineHeight: 20,
  },
  messageTimestamp: {
    fontSize: 11,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.background,
  },
});
