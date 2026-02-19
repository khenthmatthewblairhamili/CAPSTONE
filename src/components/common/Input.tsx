import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { borderRadius, colors, spacing } from "../../config/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  rightIcon,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor={colors.text.tertiary}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginBottom: 6,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    fontSize: 14,
    backgroundColor: colors.white,
  },
  inputWithIcon: {
    paddingRight: 45,
  },
  rightIcon: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
  },
});
