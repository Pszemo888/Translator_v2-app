// src/pages/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";
import { Navigate } from "react-router-dom";

interface Translation {
  _id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

interface UserProfileData {
  username: string;
  email: string;
  role: string;
  translations: Translation[];
}

const UserProfile: React.FC = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  // Pobieranie danych użytkownika po załadowaniu komponentu
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error("Błąd podczas pobierania profilu:", error);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={styles.container}>
      <h1>Profil użytkownika</h1>

      {/* Informacje o użytkowniku */}
      {profile && (
        <div style={styles.profileSection}>
          <p><strong>Użytkownik:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Rola:</strong> {profile.role}</p>
        </div>
      )}

      {/* Lista zapisanych tłumaczeń */}
      <div style={styles.section}>
        <h2>Twoje tłumaczenia</h2>
        {profile?.translations.length === 0 ? (
          <p>Brak zapisanych tłumaczeń.</p>
        ) : (
          <ul style={styles.list}>
            {profile?.translations.map((translation) => (
              <li key={translation._id} style={styles.listItem}>
                <strong>{translation.sourceText}</strong> → {translation.translatedText} 
                ({translation.sourceLanguage} → {translation.targetLanguage})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Przycisk wylogowania */}
      <button onClick={handleLogout} style={styles.logoutButton}>Wyloguj się</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  profileSection: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  section: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
};

export default UserProfile;
