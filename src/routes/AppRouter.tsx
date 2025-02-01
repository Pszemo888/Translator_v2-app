import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import TranslatorPage from "../pages/TranslatorPage";
import AdminPanel from "../pages/AdminPanel";
import UserProfile from "../pages/UserProfile";
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

      {/* Panel admina (chroniony + wymagana rola) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      {/* Domyślnie np. przekieruj na /login */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}