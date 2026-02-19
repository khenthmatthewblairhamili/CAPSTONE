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

interface AssignTechnicianModalProps {
  visible: boolean;
  onClose: () => void;
  technicianName: string;
  onTechnicianNameChange: (name: string) => void;
  technicianNotes: string;
  onTechnicianNotesChange: (notes: string) => void;
  onAssign: () => void;
}

export const AssignTechnicianModal: React.FC<AssignTechnicianModalProps> = ({
  visible,
  onClose,
  technicianName,
  onTechnicianNameChange,
  technicianNotes,
  onTechnicianNotesChange,
  onAssign,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.assignModal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Assign Technician</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.assignContent}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.assignLabel}>Technician Name *</Text>
          <TextInput
            style={styles.textInput}
            value={technicianName}
            onChangeText={onTechnicianNameChange}
            placeholder="Enter technician name"
          />

          <Text style={styles.assignLabel}>Technician Notes</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={technicianNotes}
            onChangeText={onTechnicianNotesChange}
            placeholder="Enter any notes for the technician"
            multiline
            numberOfLines={4}
          />

          <View style={styles.assignButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelActionButton]}
              onPress={onClose}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.confirmButton]}
              onPress={onAssign}
            >
              <Text style={styles.actionButtonText}>Assign & Start Work</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>
);
