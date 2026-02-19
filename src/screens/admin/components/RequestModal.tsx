import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./modalStyles";

interface RequestModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  requests: any[];
  showStatus?: boolean;
  clickable?: boolean;
  onRequestClick?: (request: any) => void;
  getStatusStyle: (status: string) => any;
  getStatusText: (status: string) => string;
  getPriorityStyle: (priority: string) => any;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  visible,
  onClose,
  title,
  requests,
  showStatus = true,
  clickable = false,
  onRequestClick,
  getStatusStyle,
  getStatusText,
  getPriorityStyle,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.requestsModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.requestsList}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {requests.map((request, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.requestModalCard,
                  clickable && styles.clickableCard,
                ]}
                onPress={
                  clickable && onRequestClick
                    ? () => onRequestClick(request)
                    : undefined
                }
              >
                <View style={styles.requestModalHeader}>
                  <Text style={styles.requestModalId}>{request.id}</Text>
                  <View style={styles.requestModalBadges}>
                    {showStatus && (
                      <Text
                        style={[
                          styles.requestModalStatus,
                          getStatusStyle(request.status),
                        ]}
                      >
                        {getStatusText(request.status)}
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.requestModalPriority,
                        getPriorityStyle(request.priority),
                      ]}
                    >
                      {request.priority}
                    </Text>
                  </View>
                </View>

                <Text style={styles.requestModalType}>{request.type}</Text>
                <Text style={styles.requestModalDescription}>
                  {request.description}
                </Text>

                <View style={styles.requestModalFooter}>
                  <Text style={styles.requestModalUnit}>{request.unit}</Text>
                  <Text style={styles.requestModalDate}>
                    {formatDate(request.created_at)}
                  </Text>
                </View>

                {request.address && (
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressLabel}>📍 </Text>
                    <Text style={styles.addressText}>{request.address}</Text>
                  </View>
                )}

                {request.assigned_technician && (
                  <View style={styles.technicianInfo}>
                    <Text style={styles.technicianLabel}>Assigned to: </Text>
                    <Text style={styles.technicianName}>
                      {request.assigned_technician}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
