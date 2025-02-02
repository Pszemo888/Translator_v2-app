import api from "./api";

export interface LanguageResponse {
  code: string;
  name: string;
  nativeName: string;
}

export interface TranslationRequest {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

// Pobranie listy języków
export async function getLanguages(): Promise<LanguageResponse[]> {
  const response = await api.get<LanguageResponse[]>("/languages");
  return response.data;
}

// Tłumaczenie
export async function translateText(
  request: TranslationRequest
): Promise<TranslationResponse> {
  const response = await api.post<TranslationResponse>(
    "/translations/translate",
    request
  );
  return response.data;
}
