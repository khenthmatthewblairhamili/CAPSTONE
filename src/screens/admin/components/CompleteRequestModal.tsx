import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./modalStyles";

interface CompleteRequestModalProps {
  visible: boolean;
  onClose: () => void;
  completionNotes: string;
  onCompletionNotesChange: (notes: string) => void;
  onComplete: () => void;
}

export const CompleteRequestModal: React.FC<CompleteRequestModalProps> = ({
  visible,
  onClose,
  completionNotes,
  onCompletionNotesChange,
  onComplete,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.completeModal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Complete Request</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.completeContent}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.completeLabel}>Completion Notes *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={completionNotes}
            onChangeText={onCompletionNotesChange}
            placeholder="Describe the work completed and any final notes"
            multiline
            numberOfLines={6}
          />

          <View style={styles.completeButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelActionButton]}
              onPress={onClose}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.confirmCompleteButton]}
              onPress={onComplete}
            >
              <Text style={styles.actionButtonText}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>
);
