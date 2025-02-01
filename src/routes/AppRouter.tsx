// src/routes/AppRouter.tsx

import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import TranslatorPage from "../pages/TranslatorPage";
import AdminPanel from "../components/AdminPanel";

// Importy komponentów lub stron
import AddLanguagePage from "../pages/AddLanguagePage";
import AddTranslationPage from "../pages/AddTranslationPage";

export default function AppRouter() {
  return (
    <Routes>
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

      {/* Domyślnie np. przekieruj na /login */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
