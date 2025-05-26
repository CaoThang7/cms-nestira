import { z } from "zod";

export const createCategorySchema = z.object({
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
});

export const updateCategorySchema = z.object({
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
});

export type CategoryFormType = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormType = z.infer<typeof updateCategorySchema>;
