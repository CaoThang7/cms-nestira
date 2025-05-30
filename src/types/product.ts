export interface TranslatedField {
  [lang: string]: string;
}

export interface Product {
  name: TranslatedField;
  brand: string;
  productCode: string;
  price: number;
  totalPrice: number;
  color: string;
  origin: TranslatedField;
  material: TranslatedField;
  size: string;
  description: TranslatedField;
  specifications: TranslatedField;
  categoryId: number;
  imageUrls: string[];
}
