import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Translation {
  _id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string; // Dodano pole createdAt
}

const TranslationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const response = await api.get(`/translations/${id}`);
        setTranslation(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania tłumaczenia:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTranslation();
    }
  }, [id]);

  if (loading) return <p>Ładowanie...</p>;
  if (!translation) return <p>Nie znaleziono tłumaczenia.</p>;

  return (
    <div>
      <h1>Szczegóły tłumaczenia</h1>
      <p><strong>Tekst źródłowy:</strong> {translation.sourceText}</p>
      <p><strong>Tłumaczenie:</strong> {translation.translatedText}</p>
      <p><strong>Język źródłowy:</strong> {translation.sourceLanguage}</p>
      <p><strong>Język docelowy:</strong> {translation.targetLanguage}</p>
      <p><strong>Data dodania:</strong> {new Date(translation.createdAt).toLocaleDateString()}</p> {/* Dodano wyświetlanie daty */}
    </div>
  );
};

export default TranslationDetails;
