import React, { useState } from "react";
import { LoginForm } from "../src/components/auth/LoginForm";
import { SignUpForm } from "../src/components/auth/SignUpForm";
import { SplashScreen } from "../src/components/auth/SplashScreen";
import { AdminApp } from "../src/screens/admin/AdminScreen";
import { HomeownerApp } from "../src/screens/homeowner/HomeownerScreen";
import { UserRole } from "../src/types";

type PageType = "splash" | "login" | "signup" | "homeowner-app" | "admin-app";

export default function MaintenanceApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("splash");
  const [userRole, setUserRole] = useState<UserRole>("homeowner");

  // Handle login & redirect to correct app
  const handleLogin = (role: UserRole) => {
    setUserRole(role);

    if (role === "homeowner") {
      setCurrentPage("homeowner-app");
    } else {
      setCurrentPage("admin-app");
    }
  };

  // Splash Screen
  if (currentPage === "splash") {
    return <SplashScreen onGetStarted={() => setCurrentPage("login")} />;
  }

  // Login Screen
  if (currentPage === "login") {
    return (
      <LoginForm
        onLogin={handleLogin}
        onSignUpPress={() => setCurrentPage("signup")}
      />
    );
  }

  // Signup Screen
  if (currentPage === "signup") {
    return (
      <SignUpForm
        onSignUp={() => setCurrentPage("login")}
        onBackToLogin={() => setCurrentPage("login")}
      />
    );
  }

  // Homeowner App
  if (currentPage === "homeowner-app") {
    return <HomeownerApp onLogout={() => setCurrentPage("splash")} />;
  }

  // Admin App
  if (currentPage === "admin-app") {
    return <AdminApp onLogout={() => setCurrentPage("splash")} />;
  }

  return null;
}
