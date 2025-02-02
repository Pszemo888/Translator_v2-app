// src/components/AddTranslation.tsx
import React, { useReducer, useState, FormEvent } from "react";
// Zamiast api importujemy funkcję z serwisu:
import { addTranslation } from "../services/adminService";
import "../styles/AddForm.css";

interface AddTranslationProps {
  onTranslationAdded?: () => void; 
}

interface FormState {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

type Action =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

const initialState: FormState = {
  sourceText: "",
  translatedText: "",
  sourceLanguage: "",
  targetLanguage: "",
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const AddTranslation: React.FC<AddTranslationProps> = ({ onTranslationAdded }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sourceText, translatedText, sourceLanguage, targetLanguage } = formState;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Zamiast api.post wywołujemy funkcję z serwisu:
      const response = await addTranslation({
        sourceText,
        translatedText,
        sourceLanguage,
        targetLanguage,
      });

      console.log("Dodano tłumaczenie:", response);
      setSuccess(true);

      // Resetujemy formularz:
      dispatch({ type: "RESET" });

      // Informujemy rodzica (np. AdminPanel), że dodano tłumaczenie:
      if (onTranslationAdded) {
        onTranslationAdded();
      }
    } catch (err: any) {
      console.error("Błąd w trakcie dodawania tłumaczenia:", err);
      setError(err.response?.data?.message || "Wystąpił błąd podczas dodawania tłumaczenia.");
    }
  };

  return (
    <div className="add-form-container">
      <h2>Dodaj tłumaczenie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tekst źródłowy:</label>
          <input
            type="text"
            value={sourceText}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "sourceText", value: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Tłumaczenie:</label>
          <input
            type="text"
            value={translatedText}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "translatedText",
                value: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Język źródłowy:</label>
          <input
            type="text"
            value={sourceLanguage}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "sourceLanguage",
                value: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Język docelowy:</label>
          <input
            type="text"
            value={targetLanguage}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "targetLanguage",
                value: e.target.value,
              })
            }
            required
          />
        </div>

        <button type="submit">Dodaj tłumaczenie</button>
      </form>

      {success && <p className="success-message">Tłumaczenie dodane pomyślnie!</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddTranslation;
