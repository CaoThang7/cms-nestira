import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one name field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường tên (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  brand: z.string().min(1, "Brand is required"),
  productCode: z.string().min(1, "Product code is required"),
  price: z.number().positive("Price must be a positive number"),
  totalPrice: z.number().positive("Total price must be a positive number"),
  color: z.string().min(1, "Color is required"),
  origin: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one origin field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường nguồn gốc (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  material: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one material field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường chất liệu (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  size: z.string().min(1, "Size is required"),
  description: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one description field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường mô tả (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  specifications: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one specifications field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường thông số kỹ thuật (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  categoryId: z.number().positive("Category name is required"),
  imageUrls: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

export const updateProductSchema = z.object({
  name: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one name field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường tên (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  brand: z.string().min(1, "Brand is required"),
  productCode: z.string().min(1, "Product code is required"),
  price: z.number().positive("Price must be a positive number"),
  totalPrice: z.number().positive("Total price must be a positive number"),
  color: z.string().min(1, "Color is required"),
  origin: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one origin field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường nguồn gốc (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  material: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one material field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường chất liệu (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  size: z.string().min(1, "Size is required"),
  description: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one description field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường mô tả (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  specifications: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one specifications field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường thông số kỹ thuật (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  categoryId: z.number().positive("Category name is required"),
  imageUrls: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

export type CreateProductFormType = z.infer<typeof createProductSchema>;
export type UpdateProductFormType = z.infer<typeof updateProductSchema>;