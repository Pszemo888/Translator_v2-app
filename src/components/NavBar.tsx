// src/components/NavBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Poprawny import AuthContext

const NavBar: React.FC = () => {
  // Poprawne pobranie danych z AuthContext
  const { isLoggedIn, user, handleLogout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", background: "#eee", padding: "10px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>Home</Link>
      <Link to="/translator" style={{ textDecoration: "none", color: "blue" }}>Translate</Link>

      {isLoggedIn && (
        <>
          <Link to="/profile" style={{ textDecoration: "none", color: "blue" }}>Profile</Link>
          {/* TUTAJ - warunkowo dodajesz link do admin panelu */}
          {user?.role === "admin" && (
            <Link to="/admin" style={{ textDecoration: "none", color: "blue" }}>
              Admin Panel
            </Link>
          )}
          <button onClick={handleLogoutClick} style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}>
            Wyloguj
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>Login</Link>
          <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
