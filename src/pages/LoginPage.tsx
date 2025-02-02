import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveToken, saveCurrentUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "axios";
import "../styles/authForm.css"

export  function LoginPage() {
  const navigate = useNavigate();
  const { setUser, isLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/translator");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await loginUser({ email, password });
      
      saveToken(response.token);
      saveCurrentUser(response.user);
      setUser(response.user);
      window.location.href = response.user.role === 'admin' ? '/admin' : '/translator';
      if (response.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/translator");
      }

    } catch (error: unknown) {
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
    <div className="auth-card">
      <h2>Logowanie</h2>
      <form className="auth-form" onSubmit={handleLogin}>
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
          <label htmlFor="password">Hasło</label>
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
