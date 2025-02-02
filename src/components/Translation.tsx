import api from "../services/api";

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

export async function translateText(
  request: TranslationRequest
): Promise<TranslationResponse> {
  try {
    const response = await api.post<TranslationResponse>(
      "/translations/translate",
      request
    );
    return response.data;
  } catch (error: any) {
    console.error("Błąd podczas tłumaczenia:", error.response?.data || error);
    throw error;
  }
}
