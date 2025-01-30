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

  // Ładujemy listę języków przy starcie
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
    if (!sourceText || !sourceLanguage || !targetLanguage) {
      alert("Please select languages and enter some text to translate.");
      return;
    }

    try {
      const response: TranslationResponse = await translateText({
        sourceText,
        sourceLanguage,
        targetLanguage,
      });
      setTranslatedText(response.translatedText);
    } catch (err) {
      console.error("Translation error:", err);
      alert("Translation failed. Please try again.");
    }
  };

  return (
    <div className="translator-container">
      <h2>Translation Panel</h2>
      <form onSubmit={handleTranslate}>
        <div>
          <label>Source Language</label>
          <br />
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="">-- Select Source --</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Target Language</label>
          <br />
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="">-- Select Target --</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Source Text</label>
          <br />
          <textarea
            rows={4}
            cols={50}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
        </div>

        <button type="submit">Translate</button>
      </form>

      {translatedText && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
