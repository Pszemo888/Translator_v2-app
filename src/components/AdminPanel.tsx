// src/pages/AdminPanel.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddLanguage from "../components/AddLanguage";
import AddTranslation from "../components/AddTranslation";
import { Navigate } from "react-router-dom";
import {
  getLanguages,
  getTranslations,
  deleteLanguage,
  deleteTranslation,
  updateTranslation,
} from "../services/adminService";

interface Language {
  _id: string;
  code: string;
  name: string;
  nativeName: string;
}

interface Translation {
  _id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const AdminPanel: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [updatedTranslation, setUpdatedTranslation] = useState<Partial<Translation>>({});

  useEffect(() => {
    fetchLanguages();
    fetchTranslations();
  }, []);

  const fetchLanguages = async () => {
    try {
      const data = await getLanguages();
      setLanguages(data);
    } catch (error) {
      console.error("Błąd podczas pobierania języków:", error);
    }
  };

  const fetchTranslations = async () => {
    try {
      const data = await getTranslations();
      setTranslations(data);
    } catch (error) {
      console.error("Błąd podczas pobierania tłumaczeń:", error);
    }
  };

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

  const handleEditTranslation = (translation: Translation) => {
    setEditingTranslation(translation);
    setUpdatedTranslation(translation);
  };

  const handleUpdateTranslation = async () => {
    if (editingTranslation) {
      try {
        await updateTranslation(editingTranslation._id, updatedTranslation);
        setEditingTranslation(null);
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
    <div style={styles.container}>
      <h1>Admin Panel</h1>

      <div style={styles.section}>
        <h2>Dodaj język</h2>
        <AddLanguage />
      </div>

      <div style={styles.section}>
        <h2>Dodaj tłumaczenie</h2>
        <AddTranslation />
      </div>

      <div style={styles.section}>
        <h2>Lista języków</h2>
        <table style={styles.table}>
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

      <div style={styles.section}>
        <h2>Lista tłumaczeń</h2>
        <table style={styles.table}>
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

        {editingTranslation && (
          <div style={styles.editForm}>
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
            <button onClick={() => setEditingTranslation(null)}>Anuluj</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  editForm: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

export default AdminPanel;
