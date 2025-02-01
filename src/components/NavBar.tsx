// src/components/NavBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const NavBar: React.FC = () => {
  const { isLoggedIn, handleLogout} = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate("/"); // Po wylogowaniu przekieruj np. na "/" lub "/login"
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo lub nazwa aplikacji */}
      <div style={styles.logo}>Translator App</div>

      {/* Linki widoczne dla każdego */}
      <Link to="/" style={styles.link}>
        Home
      </Link>
      {/* {isLoggedIn && user?.role === "admin" && ( */}
      {isLoggedIn &&(
        <Link to="/admin" style={styles.link}>Admin Panel</Link>
      )}
      {/* Jeśli użytkownik nie jest zalogowany, pokaż link do logowania i rejestracji */}
      {!isLoggedIn && (
        <>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </>
      )}

      {/* Jeśli użytkownik jest zalogowany, pokaż linki do translatora i przycisk wylogowania */}
      {isLoggedIn && (
        <>
          <Link to="/translator" style={styles.link}>
            Translator
          </Link>
          <Link to="/translator/add-language" style={styles.link}>
            Add Language
          </Link>
          <Link to="/translator/add-translation" style={styles.link}>
            Add Translation
          </Link>

          <button onClick={handleLogoutClick} style={styles.button}>
            Logout
          </button>

        </>
      )}
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.5rem 1rem",
    background: "#EEE",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginRight: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "blue",
    marginRight: "0.5rem",
  },
  button: {
    marginLeft: "0.5rem",
  },
};

export default NavBar;
