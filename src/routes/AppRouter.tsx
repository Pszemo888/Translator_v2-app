// src/routes/AppRouter.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import {LoginPage} from "../pages/LoginPage";
import {RegisterPage} from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import TranslatorPage from "../pages/TranslatorPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* /translator chronione - wymaga zalogowania */}
      <Route
        path="/translator"
        element={
          <PrivateRoute>
            <TranslatorPage />
          </PrivateRoute>
        }
      />

      {/* Domyślnie np. przekieruj na /login */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
