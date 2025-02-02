export interface Language {
    _id: string;
    code: string;
    name: string;
    nativeName: string;
  }
  
  export interface Translation {
    _id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
  }
  
  interface AdminState {
    languages: Language[];
    translations: Translation[];
    editingTranslation: Translation | null;
  }
  
  const initialState: AdminState = {
    languages: [],
    translations: [],
    editingTranslation: null,
  };
  
  const SET_LANGUAGES = "admin/SET_LANGUAGES";
  const SET_TRANSLATIONS = "admin/SET_TRANSLATIONS";
  const SET_EDITING_TRANSLATION = "admin/SET_EDITING_TRANSLATION";
  
  export const setLanguages = (languages: Language[]) => ({
    type: SET_LANGUAGES,
    payload: languages,
  });
  export const setTranslations = (translations: Translation[]) => ({
    type: SET_TRANSLATIONS,
    payload: translations,
  });
  export const setEditingTranslation = (translation: Translation | null) => ({
    type: SET_EDITING_TRANSLATION,
    payload: translation,
  });
  
  export const adminReducer = (state = initialState, action: any): AdminState => {
    switch (action.type) {
      case SET_LANGUAGES:
        return { ...state, languages: action.payload };
      case SET_TRANSLATIONS:
        return { ...state, translations: action.payload };
      case SET_EDITING_TRANSLATION:
        return { ...state, editingTranslation: action.payload };
      default:
        return state;
    }
  };
  