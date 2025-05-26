export interface TranslatedField {
  [lang: string]: string;
}

export interface CategoryPayload {
  name: TranslatedField;
  description: TranslatedField;
}
