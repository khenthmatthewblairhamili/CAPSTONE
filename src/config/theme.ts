// Theme configuration for the app

export const colors = {
  primary: "#4a7c4e",
  secondary: "#2d5c2f",
  accent: "#f59e0b",
  background: "#f5f5f5",
  white: "#ffffff",
  black: "#000000",

  text: {
    primary: "#333333",
    secondary: "#666666",
    tertiary: "#999999",
    accent: "#f59e0b",
  },

  status: {
    ongoing: {
      bg: "#fcd34d",
      text: "#92400e",
    },
    inProgress: {
      bg: "#93c5fd",
      text: "#1e40af",
    },
    completed: {
      bg: "#86efac",
      text: "#166534",
    },
    pending: {
      bg: "#e5e7eb",
      text: "#4b5563",
    },
  },

  category: {
    plumbing: "#93c5fd",
    electrical: "#fcd34d",
    security: "#86efac",
    general: "#e5e7eb",
    accent: "#f59e0b",
  },

  border: "#e5e5e5",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.4)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 24,
    huge: 32,
    massive: 36,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "bold" as const,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 24,
  circle: 50,
};

export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 8,
  },
};
