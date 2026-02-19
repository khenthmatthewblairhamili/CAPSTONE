import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./modalStyles";

interface ImageOptionsModalProps {
  visible: boolean;
  profileImage: string | null;
  onClose: () => void;
  onTakePhoto: () => void;
  onUploadImage: () => void;
  onRemovePhoto: () => void;
}

export const ImageOptionsModal: React.FC<ImageOptionsModalProps> = ({
  visible,
  profileImage,
  onClose,
  onTakePhoto,
  onUploadImage,
  onRemovePhoto,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.imageOptionsModal}>
          <Text style={styles.modalTitle}>Change Profile Photo</Text>

          <TouchableOpacity style={styles.optionButton} onPress={onTakePhoto}>
            <Text style={styles.optionButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={onUploadImage}>
            <Text style={styles.optionButtonText}>Choose from Library</Text>
          </TouchableOpacity>

          {profileImage && (
            <TouchableOpacity
              style={[styles.optionButton, styles.removeButton]}
              onPress={onRemovePhoto}
            >
              <Text style={styles.removeButtonText}>Remove Current Photo</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.optionButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
