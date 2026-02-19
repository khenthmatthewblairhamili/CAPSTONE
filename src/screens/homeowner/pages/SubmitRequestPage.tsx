import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { colors } from "../../../config/theme";
import styles from "./submitRequestStyles";

interface SubmitRequestPageProps {
  selectedRequestType: string;
  unitNumber: string;
  description: string;
  showTypeDropdown: boolean;
  maintenanceTypes: string[];
  onBack: () => void;
  onNavigateToNotifications: () => void;
  onTypeSelect: (type: string) => void;
  onShowTypeDropdown: () => void;
  onHideTypeDropdown: () => void;
  onUnitNumberChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
}

export const SubmitRequestPage: React.FC<SubmitRequestPageProps> = ({
  selectedRequestType,
  unitNumber,
  description,
  showTypeDropdown,
  maintenanceTypes,
  onBack,
  onNavigateToNotifications,
  onTypeSelect,
  onShowTypeDropdown,
  onHideTypeDropdown,
  onUnitNumberChange,
  onDescriptionChange,
  onSubmit,
}) => {
  return (
    <>
      {/* Type Dropdown Modal */}
      <Modal
        visible={showTypeDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={onHideTypeDropdown}
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={onHideTypeDropdown}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Select Request Type</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onHideTypeDropdown}
              >
                <Icon name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.dropdownList}>
              {maintenanceTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedRequestType === type && styles.selectedDropdownItem,
                  ]}
                  onPress={() => onTypeSelect(type)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedRequestType === type &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {type}
                  </Text>
                  {selectedRequestType === type && (
                    <Icon name="check" size={20} color={colors.accent} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Submit Request</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Type Input with Dropdown */}
          <View style={styles.typeInputContainer}>
            <TouchableOpacity
              style={styles.typeInput}
              onPress={onShowTypeDropdown}
            >
              <View
                style={[
                  styles.inputContainer,
                  selectedRequestType ? styles.filledInput : styles.emptyInput,
                ]}
              >
                <Text
                  style={[
                    styles.typeInputText,
                    selectedRequestType
                      ? styles.filledText
                      : styles.placeholderText,
                  ]}
                >
                  {selectedRequestType || "Select Type"}
                </Text>
                <Icon
                  name="keyboard-arrow-down"
                  size={24}
                  color={colors.text.secondary}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Input
            placeholder="Unit / House No."
            style={styles.input}
            value={unitNumber}
            onChangeText={onUnitNumberChange}
          />
          <Input
            placeholder="Short Description"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.textarea}
            value={description}
            onChangeText={onDescriptionChange}
          />
          <Button title="Submit Request" onPress={onSubmit} variant="accent" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="requests"
        onTabPress={(tab) => {
          if (tab === "home") onBack();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </>
  );
};
