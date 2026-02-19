import React, { useEffect, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { colors } from "../../../config/theme";
import styles from "./chatStyles";

interface Message {
  id: number;
  sender: string;
  text: string;
  avatar: string;
  isHomeowner: boolean;
  timestamp?: string;
}

interface ChatPageProps {
  messages: Message[];
  messageInput: string;
  onBack: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToTechnicalIssue: () => void;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  messageInput,
  onBack,
  onNavigateToDashboard,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onNavigateToTechnicalIssue,
  onMessageInputChange,
  onSendMessage,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 0) return "Just now";
    if (diff < 60) return "Just now";
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
    }
    // For older messages, show date and time
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Chat</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <View style={styles.emptyMessagesContainer}>
              <Text style={styles.emptyMessagesText}>
                No messages yet. Start the conversation!
              </Text>
            </View>
          ) : (
            <>
              {messages.map((message, index) => (
                <View
                  key={`${message.id}-${index}`}
                  style={styles.messageGroup}
                >
                  <View
                    style={[
                      styles.messageHeader,
                      message.isHomeowner && styles.messageHeaderRight,
                    ]}
                  >
                    {message.isHomeowner ? (
                      <>
                        <Text style={styles.messageSender}>
                          {message.sender}
                        </Text>
                        <Image
                          source={{ uri: message.avatar }}
                          style={styles.messageAvatar}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          source={{ uri: message.avatar }}
                          style={styles.messageAvatar}
                        />
                        <Text style={styles.messageSender}>
                          Admin {message.sender}
                        </Text>
                      </>
                    )}
                  </View>
                  <View
                    style={
                      message.isHomeowner
                        ? styles.messageRight
                        : styles.messageLeft
                    }
                  >
                    <View
                      style={
                        message.isHomeowner
                          ? styles.messageBubbleRight
                          : styles.messageBubbleLeft
                      }
                    >
                      <Text
                        style={
                          message.isHomeowner
                            ? styles.messageTextRight
                            : styles.messageTextLeft
                        }
                      >
                        {message.text}
                      </Text>
                    </View>
                    {message.timestamp && (
                      <Text style={styles.messageTimestamp}>
                        {formatTime(message.timestamp)}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.chatFooter}>
          <View style={styles.messageInputContainer}>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChangeText={onMessageInputChange}
              style={styles.messageInput}
              containerStyle={styles.inputContainer}
            />
            <TouchableOpacity
              onPress={onSendMessage}
              style={styles.sendIconButton}
              disabled={!messageInput.trim()}
            >
              <Icon name="send" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Button
            title="Continue"
            onPress={onNavigateToTechnicalIssue}
            variant="accent"
            style={styles.continueButton}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToDashboard();
          if (tab === "request-detail") onNavigateToSubmitRequest();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </>
  );
};
