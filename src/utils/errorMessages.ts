export const errorMessages: Record<string, { en: string; vi: string }> = {
  "Brand is required": {
    en: "Brand is required",
    vi: "Thương hiệu là bắt buộc",
  },
  "Product code is required": {
    en: "Product code is required",
    vi: "Mã sản phẩm là bắt buộc",
  },
  "Price is required": {
    en: "Price is required",
    vi: "Giá là bắt buộc",
  },
  "Price must be a positive number": {
    en: "Price must be a positive number",
    vi: "Giá phải là số dương lớn hơn 0",
  },
  "Total price is required": {
    en: "Total price is required",
    vi: "Giá tổng là bắt buộc",
  },
  "Total price must be a positive number": {
    en: "Total price must be a positive number",
    vi: "Giá tổng phải là số dương lớn hơn 0",
  },
  "Color is required": {
    en: "Color is required",
    vi: "Màu sắc là bắt buộc",
  },
  "Size is required": {
    en: "Size is required",
    vi: "Kích thước là bắt buộc",
  },
  Required: {
    en: "Category name is required",
    vi: "Tên loại sản phẩm là bắt buộc",
  },
  "Category name is required": {
    en: "Category name is required",
    vi: "Tên loại sản phẩm là bắt buộc",
  },
  "At least one image is required": {
    en: "At least one image is required",
    vi: "Cần có ít nhất một hình ảnh",
  },
};

export const getErrorMessage = (
  message?: string,
  lang: "en" | "vi" = "en",
): string | undefined => {
  if (!message) return undefined;
  const msg = errorMessages[message];
  return msg ? msg[lang] : message;
};
