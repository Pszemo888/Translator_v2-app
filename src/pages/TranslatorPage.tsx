import React, { useEffect, useState } from "react";
import "../styles/TranslatorPage.css";
import { getLanguages, translateText, LanguageResponse, TranslationResponse } from "../services/translationService";

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
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response: TranslationResponse = await translateText({
        sourceText: sourceText.trim(),
        sourceLanguage,
        targetLanguage,
      });
      setTranslatedText(response.translatedText);
    } catch (err: unknown) {
      console.error("Translation error:", err);
      setError("An error occurred while translating.");
    }
  };

  return (
    <div className="translator-page">
      <div className="translator-container">
        <h2 className="translator-header">Translate text</h2>
        <form onSubmit={handleTranslate} className="translator-form">
          <div className="language-selector">
            <div className="language-group">
              <label className="form-label">Source Language</label>
              <select
                className="form-select"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                <option value="">Language</option>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <textarea
                className="form-textarea"
                rows={6}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Type text to translate"
              />
            </div>
            <div className="swap-button-container">
              <button
                type="button"
                className="swap-button"
                onClick={() => {
                  setSourceLanguage(targetLanguage);
                  setTargetLanguage(sourceLanguage);
                  setSourceText(translatedText);
                  setTranslatedText("");
                }}
              >
                &#x21c6;
              </button>
            </div>
            <div className="language-group">
              <label className="form-label">Target Language</label>
              <select
                className="form-select"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="">Language</option>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <textarea
                className="form-textarea"
                rows={6}
                value={translatedText}
                readOnly
                placeholder="Translation will appear here"
              />
            </div>
          </div>
          <button className="form-button" type="submit">
            Translate
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
