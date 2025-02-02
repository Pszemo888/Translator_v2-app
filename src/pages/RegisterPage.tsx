import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  UserRegistrationRequest,
  UserRegistrationResponse,
} from "../models/user.models";
import "../styles/authForm.css"

export function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    const payload: UserRegistrationRequest = {
      username,
      email,
      password,
    };

    try {
      const response: UserRegistrationResponse = await registerUser(payload);
      console.log("Response from server:", response);

      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

 const validateForm = (): boolean => {

  if (username.trim().length < 3) {
    setErrorMessage("Username must have at least 3 characters.");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    setErrorMessage("Email musi zawierać znak @ i domenę (np. .pl, .com).");
    return false;
  }

  if (password.length < 6) {
    setErrorMessage("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};


  return (
    <div className="auth-card">
      <h2>Rejestracja</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}

        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
}