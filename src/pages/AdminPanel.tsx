// src/pages/AdminPanel.tsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Serwisy do fetch/CRUD
import {
  getLanguages,
  getTranslations,
  deleteLanguage,
  deleteTranslation,
  updateTranslation,
} from "../services/adminService";

// Komponenty
import AddLanguage from "../components/AddLanguage";
import AddTranslation from "../components/AddTranslation";

// Redux - używamy useDispatch, useSelector
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguages,
  setTranslations,
  setEditingTranslation,
  Language,
  Translation,
} from "../store/adminReducer"; // nasz plik z action creators i typami

import "../styles/AdminPanel.css";

const AdminPanel: React.FC = () => {
  const { user, isLoggedIn } = useAuth();

  // Wyciągamy dispatch
  const dispatch = useDispatch();

  // Wyciągamy stan z store
  const languages = useSelector((state: any) => state.admin.languages) as Language[];
  const translations = useSelector((state: any) => state.admin.translations) as Translation[];
  const editingTranslation = useSelector((state: any) => state.admin.editingTranslation) as Translation | null;

  // Wersja stanu do edycji
  // (Można by też trzymać w Redux, ale zrobimy sobie lokalny stan, bo to tylko tymczasowe)
  const [updatedTranslation, setUpdatedTranslation] = React.useState<Partial<Translation>>({});

  // Załaduj dane przy starcie
  useEffect(() => {
    fetchLanguages();
    fetchTranslations();
  }, []);

  const fetchLanguages = async () => {
    try {
      const data = await getLanguages();
      dispatch(setLanguages(data));
    } catch (error) {
      console.error("Błąd podczas pobierania języków:", error);
    }
  };

  const fetchTranslations = async () => {
    try {
      const data = await getTranslations();
      dispatch(setTranslations(data));
    } catch (error) {
      console.error("Błąd podczas pobierania tłumaczeń:", error);
    }
  };

  // Usuwanie języka
  const handleDeleteLanguage = async (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten język?")) {
      try {
        await deleteLanguage(id);
        fetchLanguages(); 
      } catch (error) {
        console.error("Błąd podczas usuwania języka:", error);
      }
    }
  };

  // Usuwanie tłumaczenia
  const handleDeleteTranslation = async (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć to tłumaczenie?")) {
      try {
        await deleteTranslation(id);
        fetchTranslations();
      } catch (error) {
        console.error("Błąd podczas usuwania tłumaczenia:", error);
      }
    }
  };

  // Rozpoczęcie edycji
  const handleEditTranslation = (translation: Translation) => {
    dispatch(setEditingTranslation(translation));
    setUpdatedTranslation(translation);
  };

  // Anulowanie edycji
  const handleCancelEdit = () => {
    dispatch(setEditingTranslation(null));
    setUpdatedTranslation({});
  };

  // Zatwierdzenie edycji
  const handleUpdateTranslation = async () => {
    if (editingTranslation) {
      try {
        await updateTranslation(editingTranslation._id, updatedTranslation);
        dispatch(setEditingTranslation(null));
        fetchTranslations();
      } catch (error) {
        console.error("Błąd podczas aktualizacji tłumaczenia:", error);
      }
    }
  };

  if (!isLoggedIn || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-container">
      <h1>Admin Panel (Redux)</h1>

      {/* Dodawanie języka */}
      <div className="admin-section">
        <h2>Dodaj język</h2>
        <AddLanguage />
      </div>

      {/* Dodawanie tłumaczenia */}
      <div className="admin-section">
        <h2>Dodaj tłumaczenie</h2>
        <AddTranslation />
      </div>

      {/* Lista języków */}
      <div className="admin-section">
        <h2>Lista języków</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Kod</th>
              <th>Nazwa</th>
              <th>Natywna nazwa</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr key={lang._id}>
                <td>{lang.code}</td>
                <td>{lang.name}</td>
                <td>{lang.nativeName}</td>
                <td>
                  <button onClick={() => handleDeleteLanguage(lang._id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista tłumaczeń */}
      <div className="admin-section">
        <h2>Lista tłumaczeń</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tekst źródłowy</th>
              <th>Tłumaczenie</th>
              <th>Język źródłowy</th>
              <th>Język docelowy</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {translations.map((translation) => (
              <tr key={translation._id}>
                <td>{translation.sourceText}</td>
                <td>{translation.translatedText}</td>
                <td>{translation.sourceLanguage}</td>
                <td>{translation.targetLanguage}</td>
                <td>
                  <button onClick={() => handleEditTranslation(translation)}>Edytuj</button>
                  <button onClick={() => handleDeleteTranslation(translation._id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formularz edycji */}
        {editingTranslation && (
          <div className="admin-edit-form">
            <h3>Edytuj tłumaczenie</h3>
            <input
              type="text"
              value={updatedTranslation.sourceText || ""}
              onChange={(e) =>
                setUpdatedTranslation({ ...updatedTranslation, sourceText: e.target.value })
              }
              placeholder="Tekst źródłowy"
            />
            <input
              type="text"
              value={updatedTranslation.translatedText || ""}
              onChange={(e) =>
                setUpdatedTranslation({ ...updatedTranslation, translatedText: e.target.value })
              }
              placeholder="Tłumaczenie"
            />
            <button onClick={handleUpdateTranslation}>Zapisz</button>
            <button onClick={handleCancelEdit}>Anuluj</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
