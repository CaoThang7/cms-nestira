export interface TranslatedField {
  [lang: string]: string;
}

export interface Promotion {
  title: TranslatedField;
  content: TranslatedField;
  thumbnail: string;
}
