// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  UserRegistrationRequest,
  UserRegistrationResponse,
} from "../models/user.models";

export function RegisterPage() {
  const navigate = useNavigate();

  // Stan formularza
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Komunikaty
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const payload: UserRegistrationRequest = {
      username,
      email,
      password,
    };

    try {
      // Wywołanie API
      const response: UserRegistrationResponse = await registerUser(payload);
      // W Angularze dostawałeś { id, username, email }
      console.log("Response from server:", response);

      setSuccessMessage("Registration successful!");
      // Opcjonalnie przekieruj na login po 2s (jak w Angularze):
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // ewentualnie walidacje
            required
          />
        </div>

        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
