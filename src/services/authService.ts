import api from "./api";
import {
  User,
  UserRegistrationRequest,
  UserRegistrationResponse,
  UserLoginRequest,
  UserLoginResponse,
} from "../models/user.models";

const USER_API = "/users";

export async function registerUser(
  userData: UserRegistrationRequest
): Promise<UserRegistrationResponse> {
  const response = await api.post<UserRegistrationResponse>(`${USER_API}/register`, userData);
  return response.data;
}

export async function loginUser(
  credentials: UserLoginRequest
): Promise<UserLoginResponse> {
  const response = await api.post<UserLoginResponse>(`${USER_API}/login`, credentials);
  return response.data;
}

/**
 * Pomocnicze metody do obsługi localStorage
 */
export function saveToken(token: string) {
  localStorage.setItem("authToken", token);
}

export function saveCurrentUser(user: User) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) as User : null;
}

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
}
