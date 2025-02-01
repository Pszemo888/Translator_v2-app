// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar"; // import NavBar
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          {/* 1) Umieszczamy NavBar TU (zawsze będzie widoczny) */}
          <NavBar />
          
          {/* 2) Następnie wczytujemy nasz router z resztą stron */}
          <AppRouter />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
