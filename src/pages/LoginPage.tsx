// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveToken, saveCurrentUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "axios";


export  function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await loginUser({ email, password });
      // response: { message, token, user }
      // Zapis tokena do localStorage
      saveToken(response.token);
      // Zapis usera do localStorage
      saveCurrentUser(response.user);
      // Ustaw kontekst
      setUser(response.user);

      // Sprawdź rolę
      if (response.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/translator");
      }
    }catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            setErrorMessage("Invalid email or password.");
          } else if (error.response?.status === 500) {
            setErrorMessage("Server error. Please try again later.");
          } else {
            setErrorMessage("Something went wrong. Please try again.");
          }
        } else {
          console.error("Unexpected error:", error);
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
  };

  return (
    <div className="card">
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Hasło</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}
