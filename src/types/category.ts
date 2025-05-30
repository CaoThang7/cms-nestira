export interface TranslatedField {
  [lang: string]: string;
}

export interface CategoryPayload {
  name: TranslatedField;
  description: TranslatedField;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
}
