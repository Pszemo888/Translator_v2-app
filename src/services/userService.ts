// src/services/userService.ts
import api from "./api";

// Pobieranie profilu użytkownika
export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Aktualizacja hasła
export const updatePassword = async (newPassword: string) => {
  const response = await api.put("/users/profile", { password: newPassword });
  return response.data;
};
