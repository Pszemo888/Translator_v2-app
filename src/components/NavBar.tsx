import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/NavBar.css"; 

const NavBar: React.FC = () => {
  const { isLoggedIn, user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/translator" className="navbar-link">
        Translate
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="navbar-link">
              Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogoutClick}
            className="navbar-button"
          >
            Wyloguj
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
