// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getToken, logout } from "../services/authService";
import { User } from "../models/user.models"

/**
 * Typ kontekstu
 */
interface AuthContextType {
    user: User | null; // Zmienione z 'any'
    isLoggedIn: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    handleLogout: () => void;
  }

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Przy starcie spróbujmy pobrać usera z localStorage
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
