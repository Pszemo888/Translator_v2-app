import api from "./api";

// Pobieranie wszystkich języków
export const getLanguages = async () => {
  const response = await api.get("/languages");
  return response.data;
};

// Dodanie języka
export const addLanguage = async (language: { code: string; name: string; nativeName: string }) => {
  const response = await api.post("/languages", language);
  return response.data;
};

// Usuwanie języka
export const deleteLanguage = async (id: string) => {
  const response = await api.delete(`/languages/${id}`);
  return response.data;
};

// Pobieranie wszystkich tłumaczeń
export const getTranslations = async () => {
  const response = await api.get("/translations");
  return response.data;
};

// Dodanie tłumaczenia
export const addTranslation = async (translation: {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}) => {
  const response = await api.post("/translations", translation);
  return response.data;
};

// Usuwanie tłumaczenia
export const deleteTranslation = async (id: string) => {
  const response = await api.delete(`/translations/${id}`);
  return response.data;
};

// Edycja tłumaczenia
export const updateTranslation = async (id: string, updatedData: Partial<any>) => {
  const response = await api.put(`/translations/${id}`, updatedData);
  return response.data;
};
