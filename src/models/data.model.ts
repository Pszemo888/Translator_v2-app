export interface Translation {
    _id: string;
    sourceText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    createdAt: string;
  }
  
  export interface Language{
    _id: string;
    code: string;
    name: string;
    nativeName: string;
  }  
    