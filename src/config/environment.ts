import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Get the API base URL based on the environment
 * Automatically detects the correct network address for different environments
 */
const getApiUrl = (): string => {
  // For web platform
  if (Platform.OS === "web") {
    return "http://localhost:3000/api";
  }

  // Get the local network IP from Expo's manifest
  // This automatically uses the same IP as the Metro bundler
  const debuggerHost = Constants.expoConfig?.hostUri;

  if (debuggerHost) {
    // Extract IP address from debuggerHost (format: "192.168.1.100:8081")
    const host = debuggerHost.split(":")[0];
    return `http://${host}:3000/api`;
  }

  // Fallback to localhost (for simulators/emulators)
  // iOS Simulator uses localhost
  // Android Emulator uses 10.0.2.2 to access host machine
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000/api";
  }

  return "http://localhost:3000/api";
};

export const API_BASE_URL = getApiUrl();

// Log the API URL for debugging
console.log("API Base URL:", API_BASE_URL);
