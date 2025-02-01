// src/pages/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";
import { Navigate } from "react-router-dom";
// Import pliku CSS
import "../styles/UserProfile.css";

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
    <div className="container">
      <h1>Profil użytkownika</h1>

      {/* Informacje o użytkowniku */}
      {profile && (
        <div className="profile-section">
          <p>
            <strong>Użytkownik:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Rola:</strong> {profile.role}
          </p>
        </div>
      )}

      {/* Lista zapisanych tłumaczeń */}
      <div className="section">
        <h2>Twoje tłumaczenia</h2>
        {profile?.translations.length === 0 ? (
          <p>Brak zapisanych tłumaczeń.</p>
        ) : (
          <ul className="list">
            {profile?.translations.map((translation) => (
              <li key={translation._id} className="list-item">
                <strong>{translation.sourceText}</strong> → {translation.translatedText} (
                {translation.sourceLanguage} → {translation.targetLanguage})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Przycisk wylogowania */}
      <button onClick={handleLogout} className="logout-button">
        Wyloguj się
      </button>
    </div>
  );
};

export default UserProfile;
