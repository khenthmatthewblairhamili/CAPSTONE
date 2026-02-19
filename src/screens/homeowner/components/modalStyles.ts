import { StyleSheet } from "react-native";
import { colors } from "../../../config/theme";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.text.primary,
  },
  imageOptionsModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: "600",
  },
  removeButton: {
    borderBottomWidth: 0,
  },
  removeButtonText: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "600",
  },
});

export default styles;
