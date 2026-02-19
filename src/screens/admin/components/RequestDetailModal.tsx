import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./modalStyles";

interface RequestDetailModalProps {
  visible: boolean;
  onClose: () => void;
  request: any;
  getStatusStyle: (status: string) => any;
  getStatusText: (status: string) => string;
  getPriorityStyle: (priority: string) => any;
  onAssignTechnician: () => void;
  onCompleteRequest: () => void;
  onSetPriority?: (priority: string) => void;
  onSendMessage?: (message: string) => void;
  onOpenChat?: () => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  visible,
  onClose,
  request,
  getStatusStyle,
  getStatusText,
  getPriorityStyle,
  onAssignTechnician,
  onCompleteRequest,
  onSetPriority,
  onSendMessage,
  onOpenChat,
}) => {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() && onSendMessage) {
      onSendMessage(messageInput);
      setMessageInput("");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!request) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.detailModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Request Details</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.detailContent}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Request ID</Text>
              <Text style={styles.detailValue}>{request.id}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{request.type}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Description</Text>
              <Text style={styles.detailValue}>{request.description}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Unit</Text>
              <Text style={styles.detailValue}>{request.unit}</Text>
            </View>

            {request.address && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>{request.address}</Text>
              </View>
            )}

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Date Submitted</Text>
              <Text style={styles.detailValue}>
                {formatDate(request.created_at)}
              </Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Priority</Text>
              {request.status === "pending" && onSetPriority ? (
                <View style={styles.prioritySelector}>
                  <TouchableOpacity
                    style={[
                      styles.priorityOption,
                      request.priority === "High" &&
                        styles.priorityOptionActive,
                      {
                        backgroundColor:
                          request.priority === "High" ? "#fca5a5" : "#fff",
                      },
                    ]}
                    onPress={() => onSetPriority("High")}
                  >
                    <Text
                      style={[
                        styles.priorityOptionText,
                        request.priority === "High" && { color: "#7f1d1d" },
                      ]}
                    >
                      High
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.priorityOption,
                      request.priority === "Medium" &&
                        styles.priorityOptionActive,
                      {
                        backgroundColor:
                          request.priority === "Medium" ? "#fde047" : "#fff",
                      },
                    ]}
                    onPress={() => onSetPriority("Medium")}
                  >
                    <Text
                      style={[
                        styles.priorityOptionText,
                        request.priority === "Medium" && { color: "#713f12" },
                      ]}
                    >
                      Medium
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.priorityOption,
                      request.priority === "Low" && styles.priorityOptionActive,
                      {
                        backgroundColor:
                          request.priority === "Low" ? "#d1d5db" : "#fff",
                      },
                    ]}
                    onPress={() => onSetPriority("Low")}
                  >
                    <Text
                      style={[
                        styles.priorityOptionText,
                        request.priority === "Low" && { color: "#374151" },
                      ]}
                    >
                      Low
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={[
                    styles.priorityBadge,
                    getPriorityStyle(request.priority),
                  ]}
                >
                  {request.priority}
                </Text>
              )}
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text
                style={[styles.statusBadge, getStatusStyle(request.status)]}
              >
                {getStatusText(request.status)}
              </Text>
            </View>

            {request.assigned_technician && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Assigned Technician</Text>
                <Text style={styles.detailValue}>
                  {request.assigned_technician}
                </Text>
              </View>
            )}

            {request.technician_notes && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Technician Notes</Text>
                <Text style={styles.detailValue}>
                  {request.technician_notes}
                </Text>
              </View>
            )}

            {request.completion_notes && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Completion Notes</Text>
                <Text style={styles.detailValue}>
                  {request.completion_notes}
                </Text>
              </View>
            )}

            {request.completed_date && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Completed Date</Text>
                <Text style={styles.detailValue}>
                  {formatDate(request.completed_date)}
                </Text>
              </View>
            )}

            {/* Chat Section for In-Progress Requests */}
            {request.status === "in-progress" && onOpenChat && (
              <View style={styles.chatSection}>
                <Text style={styles.chatSectionTitle}>Messages</Text>
                <TouchableOpacity
                  style={styles.openChatButton}
                  onPress={onOpenChat}
                >
                  <Text style={styles.openChatButtonText}>
                    Open Chat with Homeowner
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Action Buttons based on status */}
            <View style={styles.actionButtons}>
              {request.status === "pending" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.assignButton]}
                  onPress={onAssignTechnician}
                >
                  <Text style={styles.actionButtonText}>Assign Technician</Text>
                </TouchableOpacity>
              )}

              {request.status === "in-progress" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={onCompleteRequest}
                >
                  <Text style={styles.actionButtonText}>Mark as Completed</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.actionButton, styles.cancelActionButton]}
                onPress={onClose}
              >
                <Text style={styles.actionButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
