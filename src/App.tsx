// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
