import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import TranslatorPage from "../pages/TranslatorPage";
import AdminPanel from "../pages/AdminPanel";
import UserProfile from "../components/UserProfile";
import AddLanguagePage from "../pages/AddLanguagePage";
import AddTranslationPage from "../pages/AddTranslationPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* 
        1) Gdy użytkownik wchodzi na "/", chcemy pokazać translator.
        2) Zakładam, że translator jest chroniony. 
           Jeśli ma być publiczny, usuń <PrivateRoute>.
      */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <TranslatorPage />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Główna ścieżka translatora (chroniona) */}
      <Route
        path="/translator"
        element={
          <PrivateRoute>
            <TranslatorPage />
          </PrivateRoute>
        }
      />

      {/* Ścieżka do dodawania języka (chroniona) */}
      <Route
        path="/translator/add-language"
        element={
          <PrivateRoute>
            <AddLanguagePage />
          </PrivateRoute>
        }
      />

      {/* Profil (chroniony) */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />

      {/* Ścieżka do dodawania tłumaczenia (chroniona) */}
      <Route
        path="/translator/add-translation"
        element={
          <PrivateRoute>
            <AddTranslationPage />
          </PrivateRoute>
        }
      />

      {/* Panel administratora (wymaga roli admin) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminPanel />
          </PrivateRoute>
        }
      />

      {/* Domyślnie np. przekieruj na "/" (zamiast na login) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
