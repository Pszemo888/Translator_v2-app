// src/pages/TranslatorPage.tsx
import React, { useEffect, useState } from "react";
import {
  getLanguages,
  translateText,
  LanguageResponse,
  TranslationResponse,
} from "../services/translationService";

export default function TranslatorPage() {
  const [languages, setLanguages] = useState<LanguageResponse[]>([]);
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const langs = await getLanguages();
        setLanguages(langs);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
      }
    })();
  }, []);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTranslatedText("");

    if (!sourceText || !sourceLanguage || !targetLanguage) {
      setError("Wprowadź wszystkie wymagane dane.");
      return;
    }

    try {
      const response: TranslationResponse = await translateText({
        sourceText: sourceText.trim(),
        sourceLanguage,
        targetLanguage,
      });
      setTranslatedText(response.translatedText);
    } catch (err: any) {
      console.error("Translation error:", err);
      if (err.response?.status === 404) {
        setError("Tłumaczenie nie zostało znalezione.");
      } else {
        setError("Wystąpił błąd podczas tłumaczenia.");
      }
    }
  };

  return (
    <div className="translator-container">
      <h2>Panel tłumaczeń</h2>
      <form onSubmit={handleTranslate}>
        <div>
          <label>Język źródłowy</label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="">-- Wybierz język źródłowy --</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Język docelowy</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="">-- Wybierz język docelowy --</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tekst źródłowy</label>
          <textarea
            rows={4}
            cols={50}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
        </div>

        <button type="submit">Tłumacz</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {translatedText && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Przetłumaczony tekst:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
