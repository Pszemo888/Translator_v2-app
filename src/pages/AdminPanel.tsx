// src/pages/AdminPanel.tsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"; // dodaj import na górze pliku
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
} from "../store/adminReducer";

import "../styles/AdminPanel.css";

const AdminPanel: React.FC = () => {
  const { user, isLoggedIn } = useAuth();

  const dispatch = useDispatch();

  // Pobieramy stan z Redux
  const languages = useSelector((state: any) => state.admin.languages) as Language[];
  const translations = useSelector((state: any) => state.admin.translations) as Translation[];
  const editingTranslation = useSelector((state: any) => state.admin.editingTranslation) as Translation | null;

  // Lokalne przechowywanie edytowanej translacji
  const [updatedTranslation, setUpdatedTranslation] = React.useState<Partial<Translation>>({});

  useEffect(() => {
    fetchLanguages();
    fetchTranslations();
  }, []);

  // Funkcja pobiera języki z API -> zapisuje w Redux
  const fetchLanguages = async () => {
    try {
      const data = await getLanguages();
      dispatch(setLanguages(data));
    } catch (error) {
      console.error("Błąd podczas pobierania języków:", error);
    }
  };

  // Funkcja pobiera tłumaczenia z API -> zapisuje w Redux
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

  // CALLBACK: gdy dziecko AddLanguage doda język -> odśwież listę
  const handleLanguageAdded = () => {
    fetchLanguages(); // Po dodaniu języka ponownie pobieramy listę języków
  };

  // CALLBACK: gdy dziecko AddTranslation doda tłumaczenie -> odśwież listę
  const handleTranslationAdded = () => {
    fetchTranslations();
  };

  if (!isLoggedIn || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-container">
      <h1>Admin Panel (Redux)</h1>

      {/* Dodawanie języka */}
      <div className="admin-section">
        {/* PRZEKAZUJEMY CALLBACK handleLanguageAdded */}
        <AddLanguage onLanguageAdded={handleLanguageAdded} />
      </div>

      {/* Dodawanie tłumaczenia */}
      <div className="admin-section">
        {/* PRZEKAZUJEMY CALLBACK handleTranslationAdded */}
        <AddTranslation onTranslationAdded={handleTranslationAdded} />
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
                  <div className="action-buttons">
                  <button onClick={() => handleEditTranslation(translation)}>Edytuj</button>
                  <button onClick={() => handleDeleteTranslation(translation._id)}>Usuń</button>
                  <Link to={`/translation/${translation._id}`}>
                  <button>Szczegóły</button>
                 </Link>
                  </div>

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
