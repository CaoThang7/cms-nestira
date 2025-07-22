import { z } from "zod";

export const createPromotionSchema = z.object({
  title: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one title field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường tiêu đề (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  content: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one content field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường nội dung (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  thumbnail: z.string().min(1, "Thumbnail is required"),
});

export const updatePromotionSchema = z.object({
  title: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one title field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường tiêu đề (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  content: z
    .object({
      en: z.string().optional(),
      vi: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (!val.en?.trim() && !val.vi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one content field (en or vi) is required.",
          path: ["en"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cần có ít nhất một trường nội dung (en hoặc vi).",
          path: ["vi"],
        });
      }
    }),
  thumbnail: z.string().min(1, "Thumbnail is required"),
});

export type CreatePromotionFormType = z.infer<typeof createPromotionSchema>;
export type UpdatePromotionFormType = z.infer<typeof updatePromotionSchema>;
