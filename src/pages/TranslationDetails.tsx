import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTranslationById } from "../services/adminService";
interface Translation {
  _id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string;
}

const TranslationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [translation, setTranslation] = useState<Translation | null>(null);
  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const data = await getTranslationById(id!);
        setTranslation(data);
      } catch (error) {
        console.error("Błąd podczas pobierania tłumaczenia:", error);
      }
    };

    if (id) {
      fetchTranslation();
    }
  }, [id]);

  if (!translation) return <p>Nie znaleziono tłumaczenia.</p>;

  return (
    <div>
      <h1>Szczegóły tłumaczenia</h1>
      <p><strong>Tekst źródłowy:</strong> {translation.sourceText}</p>
      <p><strong>Tłumaczenie:</strong> {translation.translatedText}</p>
      <p><strong>Język źródłowy:</strong> {translation.sourceLanguage}</p>
      <p><strong>Język docelowy:</strong> {translation.targetLanguage}</p>
      <p><strong>Data dodania:</strong> {new Date(translation.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default TranslationDetails;
