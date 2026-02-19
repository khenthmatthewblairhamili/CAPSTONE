import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../config/theme";
import styles from "./chatModalStyles";

interface Message {
  id: number;
  sender: string;
  text: string;
  avatar: string;
  isAdmin: boolean;
  timestamp?: string;
}

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
  request: any;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onRefresh?: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  visible,
  onClose,
  request,
  messages,
  onSendMessage,
  onRefresh,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const scrollViewRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    if (visible && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [visible, messages]);

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

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput("");
    }
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
        <View style={styles.chatModal}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Icon name="arrow-back" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <View>
                <Text style={styles.modalTitle}>
                  Chat - Request #{request.id}
                </Text>
                <Text style={styles.requestType}>{request.type}</Text>
              </View>
            </View>
            {onRefresh && (
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={onRefresh}
              >
                <Icon name="refresh" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.length === 0 ? (
              <View style={styles.emptyMessages}>
                <Icon
                  name="chat-bubble-outline"
                  size={48}
                  color={colors.text.tertiary}
                />
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
                        message.isAdmin && styles.messageHeaderRight,
                      ]}
                    >
                      {!message.isAdmin ? (
                        <>
                          <Image
                            source={{ uri: message.avatar }}
                            style={styles.messageAvatar}
                          />
                          <Text style={styles.messageSender}>
                            {message.sender}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.messageSender}>
                            {message.sender}
                          </Text>
                          <Image
                            source={{ uri: message.avatar }}
                            style={styles.messageAvatar}
                          />
                        </>
                      )}
                    </View>
                    <View
                      style={
                        !message.isAdmin
                          ? styles.messageLeft
                          : styles.messageRight
                      }
                    >
                      <View
                        style={
                          !message.isAdmin
                            ? styles.messageBubbleLeft
                            : styles.messageBubbleRight
                        }
                      >
                        <Text
                          style={
                            !message.isAdmin
                              ? styles.messageTextLeft
                              : styles.messageTextRight
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

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              value={messageInput}
              onChangeText={setMessageInput}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !messageInput.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!messageInput.trim()}
            >
              <Icon
                name="send"
                size={24}
                color={
                  messageInput.trim() ? colors.white : colors.text.tertiary
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
