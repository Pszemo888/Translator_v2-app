import React, { useState } from "react";
import api from "../services/api";  // Import instancji axios

const AddLanguage: React.FC = () => {
  const [languageCode, setLanguageCode] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [nativeName, setNativeName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset błędu
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
    } catch (err: any) {
      console.error("Błąd w trakcie dodawania języka:", err);
      setError(err.response?.data?.message || "Wystąpił błąd.");
    }
  };

  return (
    <div>
      <h2>Dodaj język</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kod języka:</label>
          <input
            type="text"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nazwa języka:</label>
          <input
            type="text"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            required
          />
        </div>
        <div>
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

      {success && <p style={{ color: "green" }}>Język dodany pomyślnie!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddLanguage;
