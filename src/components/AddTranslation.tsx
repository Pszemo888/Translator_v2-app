// src/components/AddTranslation.tsx
import React, { useState } from "react";
import api from "../services/api";  // Import instancji Axios

const AddTranslation: React.FC = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); 
    setSuccess(false);

    try {
      const response = await api.post("/translations", {
        sourceText,
        translatedText,
        sourceLanguage,
        targetLanguage,
      });

      console.log("Dodano tłumaczenie:", response.data);
      setSuccess(true);

      // Czyszczenie formularza po dodaniu tłumaczenia
      setSourceText("");
      setTranslatedText("");
      setSourceLanguage("");
      setTargetLanguage("");
    } catch (err: any) {
      console.error("Błąd w trakcie dodawania tłumaczenia:", err);
      setError(err.response?.data?.message || "Wystąpił błąd podczas dodawania tłumaczenia.");
    }
  };

  return (
    <div>
      <h2>Dodaj tłumaczenie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tekst źródłowy:</label>
          <input
            type="text"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tłumaczenie:</label>
          <input
            type="text"
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Język źródłowy:</label>
          <input
            type="text"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Język docelowy:</label>
          <input
            type="text"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            required
          />
        </div>

        <button type="submit">Dodaj tłumaczenie</button>
      </form>

      {success && <p style={{ color: "green" }}>Tłumaczenie dodane pomyślnie!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddTranslation;
