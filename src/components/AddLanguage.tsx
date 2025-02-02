import React, { useState } from "react";
import api from "../services/api";  
import "../styles/AddForm.css"
// Definiujemy typ props z callbackiem
interface AddLanguageProps {
  onLanguageAdded?: () => void;
}

const AddLanguage: React.FC<AddLanguageProps> = ({ onLanguageAdded }) => {
  const [languageCode, setLanguageCode] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [nativeName, setNativeName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/languages", {
        code: languageCode,
        name: languageName,
        nativeName: nativeName,
      });

      console.log("Dodano język:", response.data);
      setSuccess(true);
      setLanguageCode("");
      setLanguageName("");
      setNativeName("");

      // Gdy się uda, informujemy Rodzica (AdminPanel)
      if (onLanguageAdded) {
        onLanguageAdded();
      }
    } catch (err: any) {
      console.error("Błąd w trakcie dodawania języka:", err);
      setError(err.response?.data?.message || "Wystąpił błąd.");
    }
  };

  return (
    <div className="add-form-container">
      <h2>Dodaj język</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Kod języka:</label>
          <input
            type="text"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nazwa języka:</label>
          <input
            type="text"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Natywna nazwa:</label>
          <input
            type="text"
            value={nativeName}
            onChange={(e) => setNativeName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Dodaj język</button>
      </form>

      {success && <p className="success-message">Język dodany pomyślnie!</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddLanguage;